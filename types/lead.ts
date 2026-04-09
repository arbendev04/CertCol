export type LeadEstado =
  | 'nuevo'
  | 'contactado'
  | 'en_proceso'
  | 'aprobado'
  | 'rechazado'

export interface Lead {
  id: string
  created_at: string
  updated_at: string

  // Datos financieros
  valor_inversion: number
  valor_nominal: number // valor_inversion * 1.65

  // Expectativas de venta
  porcentaje_min: number
  porcentaje_max: number

  // Datos de validación
  nit: string
  razon_social: string
  anio_inversion: number
  nombre_proyecto: string

  // Estado del certificado
  certificado_emitido: boolean
  fecha_emision: string | null

  // Condiciones
  condicion_venta: 'contado' | 'credito'
  necesita_recursos: boolean

  // Contacto
  nombre_contacto: string
  email_contacto: string
  telefono_contacto: string | null

  // Legal
  habeas_data: boolean

  // Gestión interna
  estado: LeadEstado
  notas: string | null
}

export const ESTADO_LABELS: Record<LeadEstado, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  en_proceso: 'En proceso',
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
}

export const ESTADO_COLORS: Record<LeadEstado, string> = {
  nuevo: 'bg-blue-100 text-blue-800',
  contactado: 'bg-yellow-100 text-yellow-800',
  en_proceso: 'bg-purple-100 text-purple-800',
  aprobado: 'bg-green-100 text-green-800',
  rechazado: 'bg-red-100 text-red-800',
}
