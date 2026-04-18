'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ExternalLink, X } from 'lucide-react'
import type { Lead } from '@/types/lead'
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
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

const ESTADOS = ['todos', 'nuevo', 'contactado', 'en_proceso', 'aprobado', 'rechazado'] as const

interface Filtros {
  estado: string
  fechaDesde: string
  fechaHasta: string
  valorMin: string
  valorMax: string
}

const FILTROS_INICIAL: Filtros = {
  estado: 'todos',
  fechaDesde: '',
  fechaHasta: '',
  valorMin: '',
  valorMax: '',
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIAL)

  const set = (key: keyof Filtros, value: string) =>
    setFiltros((prev) => ({ ...prev, [key]: value }))

  const limpiar = () => setFiltros(FILTROS_INICIAL)

  const hayFiltrosActivos =
    filtros.estado !== 'todos' ||
    filtros.fechaDesde !== '' ||
    filtros.fechaHasta !== '' ||
    filtros.valorMin !== '' ||
    filtros.valorMax !== ''

  const filtered = leads.filter((lead) => {
    if (filtros.estado !== 'todos' && lead.estado !== filtros.estado) return false

    const fechaLead = new Date(lead.created_at)
    if (filtros.fechaDesde) {
      const desde = new Date(filtros.fechaDesde)
      desde.setHours(0, 0, 0, 0)
      if (fechaLead < desde) return false
    }
    if (filtros.fechaHasta) {
      const hasta = new Date(filtros.fechaHasta)
      hasta.setHours(23, 59, 59, 999)
      if (fechaLead > hasta) return false
    }

    if (filtros.valorMin && lead.valor_inversion < Number(filtros.valorMin)) return false
    if (filtros.valorMax && lead.valor_inversion > Number(filtros.valorMax)) return false

    return true
  })

  return (
    <div className="bg-surface-bright rounded-2xl ambient-shadow overflow-hidden">
      {/* Filtros */}
      <div className="px-6 py-4 border-b border-surface-container space-y-4">

        {/* Fila 1 — Estado */}
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map((estado) => (
            <button
              key={estado}
              onClick={() => set('estado', estado)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filtros.estado === estado
                  ? 'bg-[#0A4D8C] text-white'
                  : 'bg-surface-container text-on-surface/60 hover:bg-surface-high'
              }`}
            >
              {estado === 'todos' ? 'Todos' : ESTADO_LABELS[estado as keyof typeof ESTADO_LABELS]}
              {estado === 'todos' && (
                <span className="ml-2 opacity-60">({leads.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Fila 2 — Fecha y precio */}
        <div className="flex flex-wrap gap-3 items-end">

          {/* Fecha desde */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface/40 uppercase tracking-widest">
              Desde
            </label>
            <input
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => set('fechaDesde', e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container text-sm text-on-surface focus:outline-none focus:border-[#0A4D8C] transition-colors"
            />
          </div>

          {/* Fecha hasta */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface/40 uppercase tracking-widest">
              Hasta
            </label>
            <input
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => set('fechaHasta', e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container text-sm text-on-surface focus:outline-none focus:border-[#0A4D8C] transition-colors"
            />
          </div>

          {/* Separador visual */}
          <div className="h-8 w-px bg-surface-container hidden sm:block" />

          {/* Valor mínimo */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface/40 uppercase tracking-widest">
              Valor mín. inversión
            </label>
            <input
              type="number"
              placeholder="$ 0"
              value={filtros.valorMin}
              onChange={(e) => set('valorMin', e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container text-sm text-on-surface focus:outline-none focus:border-[#0A4D8C] transition-colors w-40"
            />
          </div>

          {/* Valor máximo */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface/40 uppercase tracking-widest">
              Valor máx. inversión
            </label>
            <input
              type="number"
              placeholder="$ ∞"
              value={filtros.valorMax}
              onChange={(e) => set('valorMax', e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-surface-container bg-surface-container text-sm text-on-surface focus:outline-none focus:border-[#0A4D8C] transition-colors w-40"
            />
          </div>

          {/* Botón limpiar */}
          {hayFiltrosActivos && (
            <button
              onClick={limpiar}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-on-surface/60 hover:text-on-surface bg-surface-container hover:bg-surface-high transition-colors"
            >
              <X size={14} />
              Limpiar
            </button>
          )}

          {/* Contador de resultados */}
          <span className="text-sm text-on-surface/40 ml-auto self-end">
            {filtered.length} de {leads.length} solicitudes
          </span>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-container">
              {['Fecha', 'Razón social / NIT', 'Valor inversión', 'Valor nominal', 'Estado', ''].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-semibold text-on-surface/40 uppercase tracking-widest"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-on-surface/40">
                  No hay solicitudes con estos filtros
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-surface-container/50 hover:bg-surface-low transition-colors"
                >
                  <td className="px-6 py-4 text-on-surface/50 whitespace-nowrap">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#003667] truncate max-w-[200px]">
                      {lead.razon_social}
                    </p>
                    <p className="text-on-surface/40 text-xs">{lead.nit}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface whitespace-nowrap">
                    {formatCOP(lead.valor_inversion)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#0A4D8C] whitespace-nowrap">
                    {formatCOP(lead.valor_nominal)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        ESTADO_COLORS[lead.estado]
                      }`}
                    >
                      {ESTADO_LABELS[lead.estado]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="flex items-center gap-1.5 text-[#0A4D8C] hover:text-[#003667] font-medium text-xs transition-colors"
                    >
                      Ver detalle
                      <ExternalLink size={12} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
