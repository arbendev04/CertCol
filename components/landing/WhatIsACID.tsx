import { FileText, Building2, Users, TrendingUp } from 'lucide-react'

export function WhatIsACID() {
  return (
    <section id="que-es" className="bg-surface-container py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-[#00C896] uppercase tracking-widest mb-4">
            Educación financiera
          </p>
          <h2 className="text-4xl font-bold text-[#003667] mb-6">
            ¿Qué es un Certificado de Inversión para el Desarrollo?
          </h2>
          <p className="text-on-surface/60 text-lg leading-relaxed">
            Los CID son instrumentos financieros creados para financiar proyectos
            de desarrollo social e infraestructura en Colombia. Entender cómo
            funcionan es el primer paso para sacar el mejor provecho de tu inversión.
          </p>
        </div>

        {/* Grid de conceptos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: FileText,
              title: '¿Qué son?',
              description:
                'Son títulos valores emitidos a favor de inversionistas que aportaron capital a proyectos específicos. El certificado acredita el derecho sobre el valor nominal del aporte.',
              color: '#0A4D8C',
            },
            {
              icon: TrendingUp,
              title: '¿Cuánto valen?',
              description:
                'El valor nominal de un CID es el 165% del valor de la inversión original. Es decir, si invertiste $10.000.000, tu certificado vale $16.500.000.',
              color: '#00C896',
            },
            {
              icon: Building2,
              title: '¿Quién los emite?',
              description:
                'Los emiten entidades y empresas que desarrollan proyectos de interés colectivo, bajo la supervisión de las entidades reguladoras colombianas.',
              color: '#1E90D4',
            },
            {
              icon: Users,
              title: '¿Cómo se venden?',
              description:
                'El titular puede vender su CID con un descuento sobre el valor nominal. El porcentaje máximo de descuento permitido es del 39% del valor nominal.',
              color: '#0A4D8C',
            },
          ].map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-surface-bright rounded-2xl p-8 ambient-shadow group hover:ambient-shadow-lg transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${color}12` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-xl font-bold text-[#003667] mb-3">{title}</h3>
              <p className="text-on-surface/60 leading-relaxed text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* Cálculo visual */}
        <div className="bg-[#003667] rounded-2xl p-8 md:p-12 text-white">
          <p className="text-[#00C896] text-sm font-semibold uppercase tracking-widest mb-4">
            Ejemplo de cálculo
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            ¿Cuánto puedo recibir por mi CID?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Inversión original',
                value: '$10.000.000',
                sub: 'Lo que invertiste',
                accent: false,
              },
              {
                label: 'Valor nominal del CID',
                value: '$16.500.000',
                sub: '165% de la inversión',
                accent: true,
              },
              {
                label: 'Mínimo a recibir',
                value: '$10.065.000',
                sub: 'Vendiendo al 39% de descuento',
                accent: false,
              },
            ].map(({ label, value, sub, accent }) => (
              <div
                key={label}
                className={`rounded-xl p-6 ${
                  accent
                    ? 'bg-[#00C896]/20 border border-[#00C896]/30'
                    : 'bg-white/8'
                }`}
              >
                <p className="text-white/60 text-sm mb-2">{label}</p>
                <p
                  className={`text-3xl font-bold mb-1 ${
                    accent ? 'text-[#00C896]' : 'text-white'
                  }`}
                >
                  {value}
                </p>
                <p className="text-white/40 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
