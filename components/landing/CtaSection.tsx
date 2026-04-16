import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  'Proceso 100% digital, sin papelería',
  'Validación técnica del NIT y certificado',
  'Respuesta garantizada en menos de 24 horas',
  'Cumplimiento de la Ley 1581 de Habeas Data',
]

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28 mesh-gradient-dark">
      {/* Esferas de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #A5C8FF, transparent)', filter: 'blur(100px)', transform: 'translate(30%, -30%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #60FCC6, transparent)', filter: 'blur(80px)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <p className="text-xs font-semibold text-[#60FCC6] uppercase tracking-[0.15em] mb-4 font-[family-name:var(--font-mono)]">
              ¿Listo para vender su CID?
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Empiece hoy.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60FCC6 0%, #1E90D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Es gratis y sin compromiso.
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Registre su Certificado de Inversión para el Desarrollo y nuestro equipo
              especializado lo contactará para estructurar la mejor negociación posible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                render={<Link href="#formulario" />}
                size="lg"
                className="bg-[#00C896] text-[#003667] hover:text-white font-bold rounded-xl px-8 h-12 text-base transition-colors duration-200"
                style={{ boxShadow: '0 4px 30px rgba(0,200,150,0.35)' }}
              >
                Registrar mi CID ahora
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                render={<Link href="#como-funciona" />}
                variant="outline"
                size="lg"
                className="rounded-xl px-8 h-12 font-semibold text-base border-white/30 text-white hover:text-white !bg-transparent hover:!bg-white/10 transition-colors duration-200"
              >
                Ver cómo funciona
              </Button>
            </div>
          </div>

          {/* Lista de beneficios */}
          <div
            className="rounded-2xl p-8 bg-white/[0.065] backdrop-blur-[20px]"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-sm font-semibold text-white/50 uppercase tracking-[0.12em] mb-6 font-[family-name:var(--font-mono)]">
              Lo que incluye el proceso
            </p>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#60FCC6] shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-8 pt-6 grid grid-cols-3 gap-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { value: '165%', label: 'Valor nominal' },
                { value: '39%', label: 'Tope máx. venta' },
                { value: '24h', label: 'Tiempo respuesta' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="data-mono text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
