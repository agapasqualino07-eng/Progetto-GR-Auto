import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: {
    default: 'Concessionario Auto',
    template: '%s · Concessionario Auto',
  },
  description:
    'Auto usate, km 0, aziendali. Selezione di veicoli garantiti con servizio di finanziamento e permuta.',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Concessionario Auto',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#3a52c4',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-ink-900 antialiased">
        <a
          href="#main"
          className="absolute left-2 top-2 -translate-y-12 rounded-md bg-brand-700 px-3 py-2 text-sm text-white focus:translate-y-0 focus:outline-none"
        >
          Salta al contenuto principale
        </a>
        {children}
      </body>
    </html>
  )
}
