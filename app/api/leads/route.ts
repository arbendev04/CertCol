import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { z } from 'zod'
import { leadServerSchema } from '@/lib/validations/lead.schema'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import {
  sendConfirmacionLead,
  sendNotificacionAdmin,
  type LeadEmailData,
} from '@/lib/resend/emails'

type LeadServerData = z.infer<typeof leadServerSchema>

let ratelimit: Ratelimit | null = null
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    analytics: true,
  })
}

// Fail-open: if Upstash is unreachable (e.g. archived free DB), allow the request
// instead of blocking lead capture.
async function isRateLimited(request: NextRequest): Promise<boolean> {
  if (!ratelimit) return false
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous'
  try {
    const { success } = await ratelimit.limit(ip)
    return !success
  } catch (err) {
    console.error('[leads/POST] Rate limiter unavailable, allowing request:', err)
    return false
  }
}

// ─── POST /api/leads — Crear un nuevo lead ───────────────
export async function POST(request: NextRequest) {
  try {
    if (await isRateLimited(request)) {
      return NextResponse.json(
        { message: 'Demasiados intentos. Por favor espera unos minutos e intenta de nuevo.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validación con Zod en el servidor
    const parsed = leadServerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: 'Datos inválidos',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const data = parsed.data

    // Calcular valor nominal en el servidor (no confiar en el cliente)
    const valor_nominal = Math.round(data.valor_inversion * 1.65)

    // ID generated here so the lead keeps the same identifier whether it lands
    // in the DB or only in the fallback admin email.
    const leadId = randomUUID()
    const savedToDb = await saveLead(leadId, data, valor_nominal)

    const emailData: LeadEmailData = {
      id: leadId,
      nombre_contacto: data.nombre_contacto,
      email_contacto: data.email_contacto,
      telefono_contacto: data.telefono_contacto ?? undefined,
      razon_social: data.razon_social,
      nit: data.nit,
      anio_inversion: data.anio_inversion,
      nombre_proyecto: data.nombre_proyecto,
      certificado_emitido: data.certificado_emitido,
      fecha_emision: data.fecha_emision ?? null,
      condicion_venta: data.condicion_venta,
      necesita_recursos: data.necesita_recursos,
      valor_inversion: data.valor_inversion,
      valor_nominal,
      porcentaje_min: data.porcentaje_min,
      porcentaje_max: data.porcentaje_max,
    }

    const [confirmacion, notificacion] = await Promise.allSettled([
      sendConfirmacionLead(emailData),
      sendNotificacionAdmin(emailData, savedToDb),
    ])
    if (confirmacion.status === 'rejected') {
      console.error('[leads/POST] Error enviando confirmación al lead:', confirmacion.reason)
    }
    if (notificacion.status === 'rejected') {
      console.error('[leads/POST] Error enviando notificación al admin:', notificacion.reason)
    }

    // Lead is only lost if neither the DB nor the admin email stored it.
    if (!savedToDb && notificacion.status === 'rejected') {
      return NextResponse.json(
        { message: 'Error al guardar la solicitud. Intente nuevamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ id: leadId }, { status: 201 })
  } catch (err) {
    console.error('[leads/POST] Unexpected error:', err)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Returns false instead of throwing so a paused/unreachable Supabase project
// never blocks lead capture.
async function saveLead(
  leadId: string,
  data: LeadServerData,
  valor_nominal: number
): Promise<boolean> {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('leads')
      .insert({
        id: leadId,
        valor_inversion: data.valor_inversion,
        valor_nominal,
        porcentaje_min: data.porcentaje_min,
        porcentaje_max: data.porcentaje_max,
        nit: data.nit,
        razon_social: data.razon_social,
        anio_inversion: data.anio_inversion,
        nombre_proyecto: data.nombre_proyecto,
        certificado_emitido: data.certificado_emitido,
        fecha_emision: data.fecha_emision ?? null,
        condicion_venta: data.condicion_venta,
        necesita_recursos: data.necesita_recursos,
        nombre_contacto: data.nombre_contacto,
        email_contacto: data.email_contacto,
        telefono_contacto: data.telefono_contacto ?? null,
        habeas_data: data.habeas_data,
        estado: 'nuevo',
      })

    if (error) {
      console.error('[leads/POST] Supabase error, falling back to admin email:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('[leads/POST] Supabase unreachable, falling back to admin email:', err)
    return false
  }
}

// ─── GET /api/leads — Listar leads (requiere autenticación) ──
export async function GET(request: NextRequest) {
  const supabase = await createClient()

  // Verificar sesión
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const estado = searchParams.get('estado')
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '20'), 100)
  const offset = (page - 1) * pageSize

  const admin = createAdminClient()

  let query = admin
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (estado) {
    query = query.eq('estado', estado)
  }

  const { data: leads, error, count } = await query

  if (error) {
    return NextResponse.json({ message: 'Error al obtener leads' }, { status: 500 })
  }

  return NextResponse.json({ leads, total: count, page, pageSize })
}
