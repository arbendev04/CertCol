import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { WhatIsACID } from '@/components/landing/WhatIsACID'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Benefits } from '@/components/landing/Benefits'
import { CtaSection } from '@/components/landing/CtaSection'
import { Footer } from '@/components/landing/Footer'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un Certificado de Inversión para el Desarrollo (CID)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un CID es un título valor emitido a favor de inversionistas que aportaron capital a proyectos de desarrollo social e infraestructura en Colombia. El valor nominal es el 165% del valor de la inversión original.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo vendo mi CID con certCol?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El proceso tiene 4 pasos: registras tu CID en el formulario (menos de 5 minutos), validamos los datos ante la DIAN en 24 horas, te contactamos con una oferta y cerramos la negociación con documentación legal completa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto dinero puedo recibir por mi CID?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El porcentaje máximo de descuento permitido es del 57% sobre el valor nominal. Por ejemplo, si tu CID tiene un valor nominal de $16.500.000, puedes recibir mínimo $7.095.000.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda el proceso?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El registro toma menos de 5 minutos. Nuestro equipo valida y responde con una oferta en un plazo máximo de 24 horas hábiles.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <WhatIsACID />
        <HowItWorks />
        <Benefits />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
