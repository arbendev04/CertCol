import { CertForm } from '@/components/landing/CertForm'
import { FadeIn } from '@/components/ui/FadeIn'

export function Hero() {
  return (
    <section
      id="formulario"
      className="relative mesh-gradient overflow-hidden pt-20 pb-16"
    >
      {/* Esferas decorativas */}
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

      {/* Contenedor principal */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:max-w-4xl lg:px-6 pt-10 lg:pt-14">

        {/* Título */}
        <FadeIn className="text-center mb-10" delay={0.1}>
          <p className="text-xs font-semibold text-[#00C896] uppercase tracking-[0.15em] mb-3 font-[family-name:var(--font-mono)]">
            Plataforma CID · Colombia
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#003667] tracking-tight leading-[1.1] mb-4">
            Vende tu Certificado{' '}
            <span className="inline-block gradient-text">
              de Inversión
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#424750] max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Completa el formulario y te contactamos en menos de{' '}
            <strong className="text-[#003667]">24 horas</strong> con una oferta.
          </p>
        </FadeIn>

        {/* Formulario */}
        <FadeIn delay={0.25}>
          <CertForm />
        </FadeIn>
      </div>
    </section>
  )
}
