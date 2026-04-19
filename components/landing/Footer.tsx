import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface text-on-surface border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 mb-10 sm:mb-12">
          {/* Marca */}
          <div>
            <Image
              src="/img/logo-claro.webp"
              alt="certCol"
              width={180}
              height={54}
              className="h-[54px] w-auto mb-4 block dark:hidden"
            />
            <Image
              src="/img/logo-oscuro.webp"
              alt="certCol"
              width={180}
              height={54}
              className="h-[54px] w-auto mb-4 hidden dark:block"
            />
            <p className="text-on-surface/50 text-sm leading-relaxed max-w-xs">
              Plataforma profesional para la compra-venta de Certificados de
              Inversión para el Desarrollo en Colombia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-on-surface/70">Navegación</h4>
            <ul className="space-y-3">
              {[
                { href: '#que-es', label: '¿Qué es un CID?' },
                { href: '#como-funciona', label: 'Cómo funciona' },
                { href: '#beneficios', label: 'Beneficios' },
                { href: '#formulario', label: 'Registrar CID' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-on-surface/50 hover:text-on-surface transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal y contacto */}
          <div>
            <h4 className="font-semibold mb-4 text-on-surface/70">Legal & Contacto</h4>
            <ul className="space-y-3 mb-6">
              {[
                { href: '/politica-de-datos', label: 'Política de Tratamiento de Datos' },
                { href: '/terminos', label: 'Términos y Condiciones' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-on-surface/50 hover:text-on-surface transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-on-surface/50">
                <MapPin size={14} />
                <span>Medellín, Antioquia — Colombia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-on-surface/50">
                <Mail size={14} />
                <a
                  href="mailto:contacto@certcol.co"
                  className="hover:text-on-surface transition-colors"
                >
                  contacto@certcol.co
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-on-surface/40 text-xs">
            © {year} certCol. Todos los derechos reservados.
          </p>
          <p className="text-on-surface/40 text-xs text-center">
            Cumplimos con la Ley 1581 de 2012 (Habeas Data) y la normativa colombiana vigente.
          </p>
        </div>

        {/* Créditos */}
        <p className="mt-4 text-center text-[11px] text-on-surface/25">
          Desarrollado por{' '}
          <a
            href="https://www.linkedin.com/in/santiago-arango-benjumea-383864219/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-surface/50 transition-colors"
          >
            ArbenDev
          </a>
        </p>
      </div>
    </footer>
  )
}
