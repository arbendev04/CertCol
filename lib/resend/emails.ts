import { Resend } from 'resend'
import { ConfirmacionLead } from './templates/ConfirmacionLead'
import { NotificacionAdmin } from './templates/NotificacionAdmin'

interface LeadEmailData {
  id: string
  nombre_contacto: string
  email_contacto: string
  telefono_contacto?: string
  razon_social: string
  valor_inversion: number
  valor_nominal: number
  porcentaje_min: number
  porcentaje_max: number
}

export async function sendConfirmacionLead(data: LeadEmailData) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no configurada')
  const resend = new Resend(apiKey)
  const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@certcol.co'
  const { error } = await resend.emails.send({
    from: `certCol <${FROM}>`,
    to: data.email_contacto,
    subject: 'Recibimos tu solicitud — certCol',
    react: ConfirmacionLead({ data }),
  })
  if (error) throw new Error(`Resend confirmación: ${error.message}`)
}

export async function sendNotificacionAdmin(data: LeadEmailData) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no configurada')
  const resend = new Resend(apiKey)
  const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@certcol.co'
  const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || 'ceo@certcol.co'
  const { error } = await resend.emails.send({
    from: `certCol <${FROM}>`,
    to: ADMIN_EMAIL,
    subject: `Nuevo lead: ${data.razon_social}`,
    react: NotificacionAdmin({ data }),
  })
  if (error) throw new Error(`Resend notificación admin: ${error.message}`)
}
