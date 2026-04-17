import { Resend } from 'resend'
import { ConfirmacionLead } from './templates/ConfirmacionLead'
import { NotificacionAdmin } from './templates/NotificacionAdmin'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? 'admin@certcol.co'

interface LeadEmailData {
  id: string
  nombre_contacto: string
  email_contacto: string
  razon_social: string
  valor_inversion: number
  valor_nominal: number
  porcentaje_min: number
  porcentaje_max: number
}

export async function sendConfirmacionLead(data: LeadEmailData) {
  await resend.emails.send({
    from: `certCol <${FROM}>`,
    to: data.email_contacto,
    subject: 'Recibimos tu solicitud — certCol',
    react: ConfirmacionLead({ data }),
  })
}

export async function sendNotificacionAdmin(data: LeadEmailData) {
  await resend.emails.send({
    from: `certCol <${FROM}>`,
    to: ADMIN_EMAIL,
    subject: `Nuevo lead: ${data.razon_social}`,
    react: NotificacionAdmin({ data }),
  })
}
