import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Concessionario Auto',
    template: '%s · Concessionario Auto',
  },
  description:
    'Auto usate, km 0, aziendali. Selezione di veicoli garantiti con servizio di finanziamento e permuta.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-ink-900 antialiased">
        {children}
      </body>
    </html>
  )
}
