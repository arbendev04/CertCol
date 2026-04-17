import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — certCol',
  description: 'Términos y condiciones de uso de la plataforma certCol.',
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

export default function TerminosPage() {
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
              Términos y Condiciones de Uso
            </h1>
            <p className="text-on-surface/50 text-sm">
              Última actualización: abril de 2026
            </p>
          </div>

          <div className="bg-surface-low dark:bg-white/5 rounded-2xl p-8 md:p-10">

            <Section title="1. Aceptación de los términos">
              <p>
                Al acceder y utilizar la plataforma <strong className="text-on-surface">certCol</strong> (en adelante,
                "la Plataforma"), usted acepta quedar vinculado por estos Términos y Condiciones. Si no
                está de acuerdo con alguno de ellos, le rogamos que no utilice nuestros servicios.
              </p>
            </Section>

            <Section title="2. Descripción del servicio">
              <p>
                certCol es una plataforma digital que facilita la <strong className="text-on-surface">captación
                y gestión de solicitudes de compra-venta de Certificados de Inversión para el Desarrollo
                (CID)</strong> en Colombia. La Plataforma actúa como intermediario de contacto entre
                inversionistas y potenciales compradores, sin garantizar la realización de ninguna transacción.
              </p>
              <p>
                certCol <strong className="text-on-surface">no es una entidad financiera</strong> y no
                capta dinero del público. Los servicios prestados son de naturaleza informativa e intermediadora.
              </p>
            </Section>

            <Section title="3. Uso del formulario de registro">
              <p>Al completar el formulario de registro, usted declara que:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Es el titular o representante legal autorizado del CID indicado</li>
                <li>La información suministrada es veraz, completa y actualizada</li>
                <li>Cuenta con las facultades legales para disponer o negociar dicho título</li>
                <li>Ha leído y aceptado la Política de Tratamiento de Datos Personales</li>
              </ul>
              <p>
                certCol se reserva el derecho de rechazar o cancelar cualquier solicitud que presente
                inconsistencias o indicios de irregularidad.
              </p>
            </Section>

            <Section title="4. Responsabilidades del usuario">
              <p>El usuario se compromete a:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>No suministrar información falsa, incompleta o fraudulenta</li>
                <li>No utilizar la Plataforma para actividades contrarias a la ley colombiana</li>
                <li>Mantener la confidencialidad de sus datos de acceso si aplica</li>
                <li>Notificar a certCol cualquier uso no autorizado de sus datos</li>
              </ul>
            </Section>

            <Section title="5. Limitación de responsabilidad">
              <p>
                certCol no será responsable por:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>La veracidad de la información suministrada por los usuarios</li>
                <li>El resultado final de las negociaciones entre las partes</li>
                <li>Pérdidas económicas derivadas del uso de la Plataforma</li>
                <li>Interrupciones temporales del servicio por mantenimiento o causas de fuerza mayor</li>
              </ul>
              <p>
                La Plataforma se ofrece en el estado en que se encuentra ("as is"), sin garantías
                expresas o implícitas de resultado.
              </p>
            </Section>

            <Section title="6. Propiedad intelectual">
              <p>
                Todos los contenidos de la Plataforma — incluyendo textos, diseños, logotipos,
                código fuente y estructura — son propiedad de certCol y están protegidos por la
                legislación colombiana sobre propiedad intelectual. Queda prohibida su reproducción
                total o parcial sin autorización escrita.
              </p>
            </Section>

            <Section title="7. Modificaciones al servicio">
              <p>
                certCol se reserva el derecho de modificar, suspender o discontinuar la Plataforma
                o cualquiera de sus funcionalidades en cualquier momento, sin previo aviso y sin
                incurrir en responsabilidad alguna.
              </p>
            </Section>

            <Section title="8. Ley aplicable y jurisdicción">
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la{' '}
                <strong className="text-on-surface">República de Colombia</strong>. Para cualquier
                controversia derivada del uso de la Plataforma, las partes se someten a la
                jurisdicción de los jueces competentes de la ciudad de Bogotá D.C.
              </p>
            </Section>

            <Section title="9. Contacto">
              <p>
                Para cualquier consulta sobre estos términos, contáctenos en:{' '}
                <a href="mailto:legal@certcol.co" className="text-[#0A4D8C] dark:text-brand-primary hover:underline">
                  legal@certcol.co
                </a>
              </p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
