import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales',
  description:
    'Política de tratamiento de datos personales de certCol conforme a la Ley 1581 de 2012 de Colombia. Conozca cómo protegemos su información.',
  alternates: {
    canonical: '/politica-de-datos',
  },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-[#003667] dark:text-brand-primary mb-4">{title}</h2>
      <div className="space-y-3 text-on-surface/70 leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  )
}

export default function PoliticaDatosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface dark:bg-[#0f1117] min-h-dvh pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Volver */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-on-surface/50 hover:text-[#0A4D8C] dark:hover:text-brand-primary transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>

          {/* Encabezado */}
          <div className="mb-12">
            <span className="text-xs font-semibold text-[#0A4D8C] dark:text-brand-primary uppercase tracking-widest font-[family-name:var(--font-mono)]">
              Legal
            </span>
            <h1 className="text-4xl font-bold text-[#003667] dark:text-white mt-2 mb-4">
              Política de Tratamiento de Datos Personales
            </h1>
            <p className="text-on-surface/50 text-sm">
              Última actualización: abril de 2026 · Ley 1581 de 2012
            </p>
          </div>

          <div className="bg-surface-low dark:bg-white/5 rounded-2xl p-8 md:p-10">

            <Section title="1. Responsable del tratamiento">
              <p>
                <strong className="text-on-surface">certCol</strong> es la empresa responsable del
                tratamiento de los datos personales recolectados a través de esta plataforma.
                Para cualquier consulta relacionada con el tratamiento de sus datos, puede contactarnos en:
              </p>
              <p>
                Correo electrónico:{' '}
                <a href="mailto:datos@certcol.co" className="text-[#0A4D8C] dark:text-brand-primary hover:underline">
                  datos@certcol.co
                </a>
              </p>
            </Section>

            <Section title="2. Datos personales recolectados">
              <p>A través de nuestro formulario de registro, recolectamos los siguientes datos:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Nombre completo del representante o contacto</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono o WhatsApp (opcional)</li>
                <li>NIT y razón social de la empresa</li>
                <li>Información financiera del Certificado de Inversión para el Desarrollo (CID)</li>
              </ul>
            </Section>

            <Section title="3. Finalidad del tratamiento">
              <p>Los datos recolectados serán utilizados exclusivamente para:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Gestionar y procesar su solicitud de compra-venta de CID</li>
                <li>Contactarle para hacer seguimiento de su solicitud</li>
                <li>Enviar comunicaciones relacionadas con el proceso de negociación</li>
                <li>Cumplir con obligaciones legales y regulatorias aplicables</li>
              </ul>
              <p>
                Sus datos <strong className="text-on-surface">no serán vendidos, cedidos ni compartidos</strong> con
                terceros sin su consentimiento previo, salvo que sea requerido por autoridad competente.
              </p>
            </Section>

            <Section title="4. Base legal del tratamiento">
              <p>
                El tratamiento de sus datos personales se realiza con fundamento en su consentimiento
                explícito otorgado al marcar la casilla de aceptación en nuestro formulario, conforme
                a lo establecido en la <strong className="text-on-surface">Ley 1581 de 2012</strong> y
                el <strong className="text-on-surface">Decreto 1377 de 2013</strong>.
              </p>
            </Section>

            <Section title="5. Derechos del titular">
              <p>Como titular de sus datos personales, usted tiene derecho a:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong className="text-on-surface">Conocer</strong> los datos personales que tenemos sobre usted</li>
                <li><strong className="text-on-surface">Actualizar</strong> sus datos cuando sean inexactos o incompletos</li>
                <li><strong className="text-on-surface">Rectificar</strong> información errada</li>
                <li><strong className="text-on-surface">Suprimir</strong> sus datos cuando no sean necesarios para la finalidad declarada</li>
                <li><strong className="text-on-surface">Revocar</strong> el consentimiento otorgado</li>
                <li><strong className="text-on-surface">Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC)</li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, escríbanos a{' '}
                <a href="mailto:datos@certcol.co" className="text-[#0A4D8C] dark:text-brand-primary hover:underline">
                  datos@certcol.co
                </a>{' '}
                indicando su solicitud. Responderemos en un plazo máximo de <strong className="text-on-surface">10 días hábiles</strong>.
              </p>
            </Section>

            <Section title="6. Seguridad de los datos">
              <p>
                certCol implementa medidas técnicas y organizativas adecuadas para proteger sus datos
                personales contra acceso no autorizado, pérdida o alteración. La información se
                almacena en servidores seguros con cifrado en tránsito y en reposo.
              </p>
            </Section>

            <Section title="7. Conservación de los datos">
              <p>
                Sus datos serán conservados durante el tiempo necesario para cumplir con la finalidad
                del tratamiento y las obligaciones legales aplicables. Una vez cumplidas, procederemos
                a su eliminación segura.
              </p>
            </Section>

            <Section title="8. Modificaciones a esta política">
              <p>
                certCol se reserva el derecho de modificar esta política en cualquier momento. Las
                modificaciones serán publicadas en esta página con indicación de la fecha de
                actualización. El uso continuado de nuestros servicios implica la aceptación de
                los cambios.
              </p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
