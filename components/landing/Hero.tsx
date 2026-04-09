import Link from 'next/link'
import { ArrowRight, ShieldCheck, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center mesh-gradient overflow-hidden pt-20">
      {/* Esferas decorativas de fondo */}
      <div
        aria-hidden
        className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #0A4D8C, transparent)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 left-[5%] w-72 h-72 rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #00C896, transparent)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Contenido principal */}
        <div>
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A4D8C]/8 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-sm font-medium text-[#0A4D8C]">
              Plataforma certificada para CID en Colombia
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-[#003667] leading-tight mb-6">
            Compra y vende{' '}
            <span className="text-[#0A4D8C]">Certificados</span>{' '}
            de Inversión con confianza
          </h1>

          <p className="text-lg text-on-surface/60 leading-relaxed mb-10 max-w-xl">
            certCol conecta a inversionistas con compradores de Certificados de
            Inversión para el Desarrollo (CID) de forma transparente, segura y
            completamente digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              render={<Link href="#formulario" />}
              size="lg"
              className="bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-lg px-8 font-semibold text-base transition-all duration-200 hover:scale-[1.02] ambient-shadow"
            >
                Registrar mi CID <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              render={<Link href="#que-es" />}
              variant="outline"
              size="lg"
              className="rounded-lg px-8 font-semibold text-base border-[#C2C6D2]/40 hover:bg-surface-container transition-all duration-200"
            >
              Conocer más
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { icon: ShieldCheck, label: 'Datos protegidos por Ley 1581' },
              { icon: TrendingUp, label: 'Validación de NIT en tiempo real' },
              { icon: Clock, label: 'Respuesta en 24 horas' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-on-surface/50">
                <Icon size={16} className="text-[#00C896]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta flotante de stats */}
        <div className="hidden lg:block">
          <div className="glass rounded-2xl p-8 ambient-shadow-lg">
            <p className="text-sm font-medium text-on-surface/50 mb-6 uppercase tracking-widest">
              ¿Qué es un CID?
            </p>
            <h3 className="text-2xl font-bold text-[#003667] mb-4">
              Certificado de Inversión para el Desarrollo
            </h3>
            <p className="text-on-surface/60 text-sm leading-relaxed mb-6">
              Los CID son títulos valores emitidos por entidades que desarrollan
              proyectos de interés social. Su valor nominal es equivalente al
              <strong className="text-[#0A4D8C]"> 165%</strong> del valor de
              la inversión original.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '165%', label: 'Valor nominal vs inversión' },
                { value: '39%', label: 'Porcentaje máx. de venta' },
                { value: '100%', label: 'Digital y sin papelería' },
                { value: '24h', label: 'Tiempo de respuesta' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-surface-low rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#0A4D8C] mb-1">{value}</p>
                  <p className="text-xs text-on-surface/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
