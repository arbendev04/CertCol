import { ClipboardList, Search, MessageSquare, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Registra tu CID',
    description:
      'Completa el formulario con los datos de tu certificado: NIT, razón social, valor de inversión y condiciones de venta. El proceso toma menos de 5 minutos.',
    color: '#0A4D8C',
  },
  {
    number: '02',
    icon: Search,
    title: 'Validamos tu solicitud',
    description:
      'Nuestro equipo verifica los datos del certificado, valida el NIT ante la DIAN y confirma la autenticidad del título en un plazo máximo de 24 horas.',
    color: '#1E90D4',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Te contactamos',
    description:
      'Una vez validada la solicitud, te contactamos para discutir los términos finales de la negociación y las condiciones de pago (contado o crédito).',
    color: '#00C896',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Cerramos el negocio',
    description:
      'Formalizamos la compra-venta del certificado con todos los documentos necesarios. El proceso es completamente legal, trazable y seguro.',
    color: '#0A4D8C',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-[#00C896] uppercase tracking-widest mb-4">
            Proceso simple
          </p>
          <h2 className="text-4xl font-bold text-[#003667] mb-6">
            Cómo funciona certCol
          </h2>
          <p className="text-on-surface/60 text-lg leading-relaxed">
            Un proceso de cuatro pasos, diseñado para ser claro, rápido y
            completamente transparente para el inversionista.
          </p>
        </div>

        {/* Pasos */}
        <div className="relative">
          {/* Línea conectora desktop */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-transparent via-[#C2C6D2]/40 to-transparent"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ number, icon: Icon, title, description, color }) => (
              <div key={number} className="relative">
                {/* Número de paso */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ambient-shadow"
                    style={{ backgroundColor: `${color}12` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <span
                    className="text-5xl font-bold opacity-10 select-none"
                    style={{ color }}
                  >
                    {number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#003667] mb-3">{title}</h3>
                <p className="text-on-surface/55 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
