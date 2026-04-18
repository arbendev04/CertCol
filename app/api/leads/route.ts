import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { leadServerSchema } from '@/lib/validations/lead.schema'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { sendConfirmacionLead, sendNotificacionAdmin } from '@/lib/resend/emails'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
})

// ─── POST /api/leads — Crear un nuevo lead ───────────────
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous'
    const { success } = await ratelimit.limit(ip)
    if (!success) {
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

    const supabase = createAdminClient()

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
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
      .select()
      .single()

    if (error) {
      console.error('[leads/POST] Supabase error:', error)
      return NextResponse.json(
        { message: 'Error al guardar la solicitud. Intente nuevamente.' },
        { status: 500 }
      )
    }

    // Enviar correos en paralelo (sin bloquear la respuesta si fallan)
    const emailData = {
      id: lead.id,
      nombre_contacto: data.nombre_contacto,
      email_contacto: data.email_contacto,
      telefono_contacto: data.telefono_contacto ?? undefined,
      razon_social: data.razon_social,
      valor_inversion: data.valor_inversion,
      valor_nominal,
      porcentaje_min: data.porcentaje_min,
      porcentaje_max: data.porcentaje_max,
    }

    Promise.all([
      sendConfirmacionLead(emailData),
      sendNotificacionAdmin(emailData),
    ]).catch((err) => console.error('[leads/POST] Error enviando correos:', err))

    return NextResponse.json({ id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('[leads/POST] Unexpected error:', err)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
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

  let query = supabase
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
