import { createClient } from '@/lib/supabase/server'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { ExportButton } from '@/components/admin/ExportButton'
import type { Lead } from '@/types/lead'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const { count: total } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  const { count: nuevos } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('estado', 'nuevo')

  const { count: aprobados } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('estado', 'aprobado')

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Error al cargar los datos. Recargue la página.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#003667]">Dashboard</h1>
          <p className="text-on-surface/50 text-sm mt-1">
            Gestión de solicitudes de compra-venta de CID
          </p>
        </div>
        <ExportButton leads={leads as Lead[]} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total solicitudes', value: total ?? 0, color: '#0A4D8C' },
          { label: 'Nuevas (sin revisar)', value: nuevos ?? 0, color: '#1E90D4' },
          { label: 'Aprobadas', value: aprobados ?? 0, color: '#00C896' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-surface-bright rounded-xl p-6 ambient-shadow">
            <p className="text-sm text-on-surface/50 mb-1">{label}</p>
            <p className="text-4xl font-bold" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabla de leads */}
      <LeadsTable leads={leads as Lead[]} />
    </div>
  )
}
