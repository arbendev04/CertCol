'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Lead } from '@/types/lead'
import { ESTADO_LABELS } from '@/types/lead'

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

function escapeCsv(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function ExportButton({ leads }: { leads: Lead[] }) {
  const handleExport = () => {
    const headers = [
      'Fecha',
      'Razón social',
      'NIT',
      'Valor inversión',
      'Valor nominal',
      '% mínimo',
      '% máximo',
      'Año inversión',
      'Proyecto',
      'Certificado emitido',
      'Fecha emisión',
      'Condición venta',
      'Necesita recursos',
      'Nombre contacto',
      'Email contacto',
      'Teléfono contacto',
      'Estado',
      'Notas',
    ]

    const rows = leads.map((l) => [
      new Date(l.created_at).toLocaleDateString('es-CO'),
      l.razon_social,
      l.nit,
      formatCOP(l.valor_inversion),
      formatCOP(l.valor_nominal),
      `${l.porcentaje_min}%`,
      `${l.porcentaje_max}%`,
      l.anio_inversion,
      l.nombre_proyecto,
      l.certificado_emitido ? 'Sí' : 'No',
      l.fecha_emision ?? '',
      l.condicion_venta,
      l.necesita_recursos ? 'Sí' : 'No',
      l.nombre_contacto,
      l.email_contacto,
      l.telefono_contacto ?? '',
      ESTADO_LABELS[l.estado],
      l.notas ?? '',
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(','))
      .join('\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `certcol-leads-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      disabled={!leads || leads.length === 0}
      className="flex items-center gap-2 border-[#C2C6D2]/40 hover:bg-surface-container text-on-surface/70 font-medium"
    >
      <Download size={15} />
      Exportar CSV
    </Button>
  )
}
