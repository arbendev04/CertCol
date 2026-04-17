'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Calendar,
  Mail,
  Phone,
  FileText,
  TrendingUp,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Lead, LeadEstado } from '@/types/lead'
import { ESTADO_LABELS, ESTADO_COLORS } from '@/types/lead'

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-on-surface/40 uppercase tracking-widest">
        {label}
      </span>
      <span className="text-sm font-medium text-on-surface">{value}</span>
    </div>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-surface-bright rounded-2xl p-6 ambient-shadow">
      <div className="flex items-center gap-2 mb-5">
        <Icon size={16} className="text-[#0A4D8C]" />
        <h2 className="text-sm font-bold text-[#003667] uppercase tracking-widest">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>
    </div>
  )
}

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notas, setNotas] = useState('')
  const [estado, setEstado] = useState<LeadEstado>('nuevo')
  const [saved, setSaved] = useState(false)

  const fetchLead = useCallback(async () => {
    const res = await fetch(`/api/leads/${id}`)
    if (res.status === 401) { router.push('/admin/login'); return }
    if (!res.ok) { router.push('/admin'); return }
    const data: Lead = await res.json()
    setLead(data)
    setEstado(data.estado)
    setNotas(data.notas ?? '')
    setLoading(false)
  }, [id, router])

  useEffect(() => { fetchLead() }, [fetchLead])

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado, notas: notas || null }),
    })
    if (res.ok) {
      const updated: Lead = await res.json()
      setLead(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={24} className="animate-spin text-[#0A4D8C]" />
      </div>
    )
  }

  if (!lead) return null

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-on-surface/50 hover:text-[#0A4D8C] transition-colors mb-3"
          >
            <ArrowLeft size={14} />
            Volver al dashboard
          </Link>
          <h1 className="text-2xl font-bold text-[#003667]">{lead.razon_social}</h1>
          <p className="text-sm text-on-surface/40 mt-1">
            NIT: {lead.nit} · Recibido {formatDate(lead.created_at)}
          </p>
        </div>

        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${ESTADO_COLORS[lead.estado]}`}
        >
          {ESTADO_LABELS[lead.estado]}
        </span>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Datos financieros" icon={TrendingUp}>
            <InfoRow label="Valor de inversión" value={formatCOP(lead.valor_inversion)} />
            <InfoRow
              label="Valor nominal del CID"
              value={
                <span className="text-[#0A4D8C] font-bold text-base">
                  {formatCOP(lead.valor_nominal)}
                </span>
              }
            />
            <InfoRow label="Porcentaje mínimo" value={`${lead.porcentaje_min}%`} />
            <InfoRow label="Porcentaje máximo" value={`${lead.porcentaje_max}%`} />
          </Section>

          <Section title="Datos del certificado" icon={FileText}>
            <InfoRow label="Año de inversión" value={lead.anio_inversion} />
            <InfoRow label="Nombre del proyecto" value={lead.nombre_proyecto} />
            <InfoRow
              label="Certificado emitido"
              value={lead.certificado_emitido ? 'Sí' : 'No'}
            />
            {lead.fecha_emision && (
              <InfoRow label="Fecha estimada de emisión" value={lead.fecha_emision} />
            )}
            <InfoRow
              label="Condición de venta"
              value={lead.condicion_venta === 'contado' ? 'Contado' : 'Crédito'}
            />
            <InfoRow
              label="Necesita recursos"
              value={lead.necesita_recursos ? 'Sí' : 'No'}
            />
          </Section>

          <Section title="Datos de contacto" icon={Mail}>
            <InfoRow label="Nombre" value={lead.nombre_contacto} />
            <InfoRow
              label="Email"
              value={
                <a
                  href={`mailto:${lead.email_contacto}`}
                  className="text-[#0A4D8C] hover:underline"
                >
                  {lead.email_contacto}
                </a>
              }
            />
            {lead.telefono_contacto && (
              <InfoRow
                label="Teléfono / WhatsApp"
                value={
                  <a
                    href={`https://wa.me/${lead.telefono_contacto.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A4D8C] hover:underline"
                  >
                    {lead.telefono_contacto}
                  </a>
                }
              />
            )}
          </Section>
        </div>

        {/* Columna lateral — gestión */}
        <div className="space-y-6">
          <div className="bg-surface-bright rounded-2xl p-6 ambient-shadow">
            <div className="flex items-center gap-2 mb-5">
              <Building2 size={16} className="text-[#0A4D8C]" />
              <h2 className="text-sm font-bold text-[#003667] uppercase tracking-widest">
                Gestión interna
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-on-surface/40 uppercase tracking-widest block mb-2">
                  Estado
                </label>
                <Select value={estado} onValueChange={(v) => setEstado(v as LeadEstado)}>
                  <SelectTrigger className="bg-surface-low border-0 focus:ring-[#0A4D8C] h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(ESTADO_LABELS) as [LeadEstado, string][]).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-on-surface/40 uppercase tracking-widest block mb-2">
                  Notas internas
                </label>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={5}
                  placeholder="Agregar notas sobre este lead..."
                  className="w-full rounded-xl bg-surface-low border-0 text-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0A4D8C] placeholder:text-on-surface/30"
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-xl font-semibold transition-all duration-200"
              >
                {saving ? (
                  <>
                    <Loader2 size={15} className="mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle2 size={15} className="mr-2" />
                    Guardado
                  </>
                ) : (
                  'Guardar cambios'
                )}
              </Button>
            </div>
          </div>

          {/* Fechas */}
          <div className="bg-surface-bright rounded-2xl p-6 ambient-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-[#0A4D8C]" />
              <h2 className="text-sm font-bold text-[#003667] uppercase tracking-widest">
                Fechas
              </h2>
            </div>
            <div className="space-y-3">
              <InfoRow label="Recibido" value={formatDate(lead.created_at)} />
              {lead.updated_at && lead.updated_at !== lead.created_at && (
                <InfoRow label="Última actualización" value={formatDate(lead.updated_at)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
