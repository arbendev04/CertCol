import type { Metadata } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'certCol — Compra-venta de Certificados de Inversión para el Desarrollo',
  description:
    'Plataforma profesional para la gestión y compra-venta de Certificados de Inversión para el Desarrollo (CID) en Colombia. Proceso transparente, seguro y eficiente.',
  keywords: ['CID', 'certificados de inversión', 'Colombia', 'títulos valores', 'inversión'],
  icons: {
    icon: '/img/favico.webp',
    apple: '/img/favico.webp',
  },
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
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
