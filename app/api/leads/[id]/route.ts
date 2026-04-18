import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

// ─── GET /api/leads/[id] — Obtener un lead ───────────────
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !lead) {
    return NextResponse.json({ message: 'Lead no encontrado' }, { status: 404 })
  }

  return NextResponse.json(lead)
}

// ─── Esquema de actualización parcial ───────────────────
const updateSchema = z.object({
  estado: z
    .enum(['nuevo', 'contactado', 'en_proceso', 'aprobado', 'rechazado'])
    .optional(),
  notas: z.string().max(2000).nullable().optional()
    .transform(val => val ? val.replace(/<[^>]*>/g, '') : val),
})

// ─── PATCH /api/leads/[id] — Actualizar estado/notas ────
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  const body = await request.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Datos inválidos', errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { data: lead, error } = await supabase
    .from('leads')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error || !lead) {
    return NextResponse.json({ message: 'Error al actualizar' }, { status: 500 })
  }

  return NextResponse.json(lead)
}
