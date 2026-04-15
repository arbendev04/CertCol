import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#003667] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Marca */}
          <div>
            <Image
              src="/img/logo.webp"
              alt="certCol"
              width={180}
              height={54}
              className="h-[54px] w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Plataforma profesional para la compra-venta de Certificados de
              Inversión para el Desarrollo en Colombia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/80">Navegación</h4>
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
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal y contacto */}
          <div>
            <h4 className="font-semibold mb-4 text-white/80">Legal & Contacto</h4>
            <ul className="space-y-3 mb-6">
              {[
                { href: '/politica-de-datos', label: 'Política de Tratamiento de Datos' },
                { href: '/terminos', label: 'Términos y Condiciones' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin size={14} />
                <span>La Estrella, Antioquia — Colombia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Mail size={14} />
                <a
                  href="mailto:contacto@certcol.co"
                  className="hover:text-white transition-colors"
                >
                  contacto@certcol.co
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            © {year} certCol. Todos los derechos reservados.
          </p>
          <p className="text-white/35 text-xs text-center">
            Cumplimos con la Ley 1581 de 2012 (Habeas Data) y la normativa colombiana vigente.
          </p>
        </div>
      </div>
    </footer>
  )
}
