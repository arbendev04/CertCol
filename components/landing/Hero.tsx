import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '165%', label: 'Valor nominal vs inversión', icon: Zap },
  { value: '24h', label: 'Tiempo de respuesta', icon: ShieldCheck },
  { value: '100%', label: 'Digital — sin papelería', icon: Globe },
]

export function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center mesh-gradient overflow-hidden pt-20">
      {/* Esferas decorativas de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-[8%] w-[520px] h-[520px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #0A4D8C, transparent)', filter: 'blur(80px)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 left-[3%] w-80 h-80 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #00C896, transparent)', filter: 'blur(60px)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[60%] right-[25%] w-48 h-48 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #1E90D4, transparent)', filter: 'blur(50px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Contenido principal ── */}
          <div>
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A4D8C]/8 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
              <span className="text-sm font-medium text-[#0A4D8C] font-[family-name:var(--font-mono)]">
                Plataforma certificada para CID en Colombia
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-[#003667] leading-[1.05] tracking-tight mb-6">
              Compra y vende{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #0A4D8C 0%, #1E90D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Certificados
              </span>{' '}
              de Inversión con confianza
            </h1>

            <p className="text-lg text-[#424750] leading-relaxed mb-10 max-w-xl">
              certCol conecta a inversionistas con compradores de Certificados de
              Inversión para el Desarrollo (CID) de forma transparente, segura y
              completamente digital.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Button
                render={<Link href="#formulario" />}
                size="lg"
                className="bg-[#0A4D8C] hover:bg-[#003667] text-white rounded-xl px-8 font-semibold text-base transition-all duration-200 hover:scale-[1.02] ambient-shadow h-12"
              >
                Registrar mi CID <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                render={<Link href="#que-es" />}
                variant="outline"
                size="lg"
                className="rounded-xl px-8 font-semibold text-base border-[#C2C6D2]/40 hover:bg-surface-container transition-all duration-200 h-12"
              >
                Conocer más
              </Button>
            </div>

            {/* Stat badges — estilo Stitch */}
            <div className="flex flex-wrap gap-3">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm"
                  style={{ boxShadow: '0 2px 20px rgba(10, 77, 140, 0.06)', border: '1px solid rgba(194, 198, 210, 0.2)' }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0A4D8C]/8 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#0A4D8C]" />
                  </div>
                  <div>
                    <p className="data-mono text-lg font-semibold text-[#003667] leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-[#424750] mt-0.5 leading-none">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tarjeta flotante ── */}
          <div className="hidden lg:block">
            <div
              className="rounded-2xl p-8 bg-white/65 backdrop-blur-[24px]"
              style={{
                border: '1px solid rgba(194, 198, 210, 0.15)',
                boxShadow: '0 8px 60px rgba(10, 77, 140, 0.10)',
              }}
            >
              <p className="text-xs font-semibold text-[#424750] uppercase tracking-[0.12em] mb-6 font-[family-name:var(--font-mono)]">
                ¿Qué es un CID?
              </p>
              <h3 className="text-2xl font-bold text-[#003667] mb-3 leading-snug">
                Certificado de Inversión <br />para el Desarrollo
              </h3>
              <p className="text-[#424750] text-sm leading-relaxed mb-8">
                Títulos valores emitidos por entidades que desarrollan proyectos de interés
                social. Su valor nominal equivale al{' '}
                <strong className="text-[#0A4D8C]">165%</strong> del valor original.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { value: '$165M', sub: 'Valor nominal ejemplo', note: 'por cada $100M invertidos' },
                  { value: '39%', sub: 'Porcentaje máx. de venta', note: 'tope legal establecido' },
                ].map(({ value, sub, note }) => (
                  <div key={sub} className="rounded-xl p-4 bg-[#F6F3F2]">
                    <p className="data-mono text-2xl font-bold text-[#0A4D8C] mb-1">{value}</p>
                    <p className="text-xs font-medium text-[#003667]">{sub}</p>
                    <p className="text-[10px] text-[#424750]/60 mt-0.5">{note}</p>
                  </div>
                ))}
              </div>

              {/* Barra decorativa de proceso */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0A4D8C]/5">
                {['Registro', 'Validación', 'Contacto', 'Cierre'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{
                          background: i === 0 ? '#0A4D8C' : 'rgba(10,77,140,0.12)',
                          color: i === 0 ? '#fff' : '#0A4D8C',
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[9px] text-[#424750]/60 mt-1 font-[family-name:var(--font-mono)] whitespace-nowrap">
                        {step}
                      </span>
                    </div>
                    {i < 3 && <div className="h-px flex-1 bg-[#0A4D8C]/15 mb-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
