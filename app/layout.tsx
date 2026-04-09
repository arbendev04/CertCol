import type { Metadata } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'certCol — Compra-venta de Certificados de Inversión para el Desarrollo',
  description:
    'Plataforma profesional para la gestión y compra-venta de Certificados de Inversión para el Desarrollo (CID) en Colombia. Proceso transparente, seguro y eficiente.',
  keywords: ['CID', 'certificados de inversión', 'Colombia', 'títulos valores', 'inversión'],
  openGraph: {
    title: 'certCol — CID Colombia',
    description: 'Compra-venta de Certificados de Inversión para el Desarrollo',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es-CO"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-on-surface">{children}</body>
    </html>
  )
}
