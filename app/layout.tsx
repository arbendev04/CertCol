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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://certcol.co'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'certCol — Vende tu Certificado de Inversión para el Desarrollo (CID)',
    template: '%s | certCol',
  },
  description:
    'Vende tu Certificado de Inversión para el Desarrollo (CID) en Colombia de forma rápida, segura y transparente. Registro en 5 minutos, respuesta garantizada en 24 horas.',
  keywords: [
    'certificado de inversión para el desarrollo',
    'vender CID Colombia',
    'compraventa CID',
    'títulos valores Colombia',
    'inversión CID',
    'certcol',
  ],
  authors: [{ name: 'certCol' }],
  creator: 'certCol',
  icons: {
    icon: '/img/favico.webp',
    apple: '/img/favico.webp',
  },
  openGraph: {
    title: 'certCol — Vende tu Certificado de Inversión para el Desarrollo (CID)',
    description:
      'Vende tu CID en Colombia de forma rápida y segura. Registro en 5 minutos, respuesta en 24 horas.',
    type: 'website',
    locale: 'es_CO',
    url: baseUrl,
    siteName: 'certCol',
    images: [
      {
        url: '/img/og.webp',
        width: 1200,
        height: 630,
        alt: 'certCol — Compraventa de Certificados de Inversión para el Desarrollo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'certCol — Vende tu CID en Colombia',
    description: 'Registro en 5 minutos, respuesta garantizada en 24 horas.',
    images: ['/img/og.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: baseUrl,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'certCol',
  url: baseUrl,
  logo: `${baseUrl}/img/logo-claro.webp`,
  description:
    'Plataforma colombiana especializada en la compraventa de Certificados de Inversión para el Desarrollo (CID).',
  areaServed: 'CO',
  knowsAbout: [
    'Certificados de Inversión para el Desarrollo',
    'Títulos valores Colombia',
    'Compraventa de CID',
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
