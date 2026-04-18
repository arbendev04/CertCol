import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft, Clock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Solicitud enviada',
  robots: { index: false, follow: false },
}

export default function GraciasPage() {
  return (
    <main className="min-h-dvh mesh-gradient flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">
        {/* Ícono de éxito */}
        <div className="w-20 h-20 rounded-2xl bg-[#00C896]/12 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} className="text-[#00C896]" />
        </div>

        <h1 className="text-4xl font-bold text-[#003667] mb-4">
          ¡Solicitud enviada!
        </h1>
        <p className="text-on-surface/60 text-lg leading-relaxed mb-8">
          Hemos recibido la información de su Certificado de Inversión. Nuestro
          equipo revisará su solicitud y se pondrá en contacto con usted.
        </p>

        {/* Info cards */}
        <div className="glass rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0A4D8C]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock size={16} className="text-[#0A4D8C]" />
            </div>
            <div>
              <p className="font-semibold text-[#003667] text-sm">Tiempo de respuesta</p>
              <p className="text-on-surface/55 text-sm">
                Nos comunicaremos con usted en un plazo máximo de{' '}
                <strong>24 horas hábiles</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00C896]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail size={16} className="text-[#00C896]" />
            </div>
            <div>
              <p className="font-semibold text-[#003667] text-sm">Confirmación por correo</p>
              <p className="text-on-surface/55 text-sm">
                Recibirá un correo de confirmación con un resumen de su solicitud.
              </p>
            </div>
          </div>
        </div>

        <Button
          render={<Link href="/" />}
          variant="outline"
          className="rounded-xl border-[#C2C6D2]/40 hover:bg-surface-container"
        >
            <ArrowLeft size={16} className="mr-2" />
            Volver al inicio
        </Button>
      </div>
    </main>
  )
}
