import { Zap, Lock, FileCheck, Headphones, Globe, Scale } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const benefits = [
  {
    icon: Zap,
    title: 'Proceso 100% digital',
    description:
      'Sin desplazamientos ni papelería física. Registra y gestiona todo desde tu dispositivo.',
  },
  {
    icon: Lock,
    title: 'Datos protegidos',
    description:
      'Cumplimos con la Ley 1581 de 2012 de Habeas Data. Tu información personal es tratada con total confidencialidad.',
  },
  {
    icon: FileCheck,
    title: 'Validación técnica real',
    description:
      'Verificamos el NIT ante la DIAN y validamos la autenticidad del certificado antes de cualquier negociación.',
  },
  {
    icon: Headphones,
    title: 'Acompañamiento personalizado',
    description:
      'Un asesor de certCol te acompaña en cada etapa del proceso para resolver tus dudas.',
  },
  {
    icon: Globe,
    title: 'Alcance nacional',
    description:
      'Operamos en todo el territorio colombiano. No importa en qué ciudad se emitió tu certificado.',
  },
  {
    icon: Scale,
    title: 'Marco legal sólido',
    description:
      'Todas las operaciones se realizan bajo el marco legal colombiano, con documentación formal y trazable.',
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 sm:py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <FadeIn className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-[#00C896] uppercase tracking-widest mb-4">
            Por qué elegirnos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003667] mb-6">
            Beneficios de usar certCol
          </h2>
          <p className="text-on-surface/60 text-base sm:text-lg leading-relaxed">
            Diseñamos cada aspecto del proceso para darte la mayor tranquilidad
            y eficiencia al momento de gestionar tu certificado.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
            <div
              className="bg-surface-bright rounded-2xl p-8 ambient-shadow card-lift hover:ambient-shadow-lg"
            >
              <div className="w-10 h-10 rounded-lg icon-bg-primary flex items-center justify-center mb-5">
                <Icon size={20} className="icon-primary" />
              </div>
              <h3 className="text-lg font-bold text-[#003667] mb-3">{title}</h3>
              <p className="text-on-surface/55 text-sm leading-relaxed">{description}</p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
