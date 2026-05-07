import type { Metadata } from 'next'
import { getPageBySlug } from '@/lib/payload/queries'
import { Blocks } from '@/components/payload/Blocks'
import { Section } from '@/components/ui/section'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cookie policy',
  robots: { index: false, follow: false },
}

const fallback = (
  <Section className="max-w-3xl py-12 sm:py-16">
    <h1 className="text-3xl font-semibold tracking-tight">Cookie policy</h1>
    <p className="mt-4 text-ink-700">
      Il sito utilizza esclusivamente cookie tecnici essenziali al
      funzionamento, e statistiche aggregate anonime tramite Plausible
      Analytics, che non richiede consenso.
    </p>
    <h2 className="mt-6 text-xl font-semibold">Cookie tecnici</h2>
    <p className="text-ink-700">
      Indispensabili per la navigazione e per le funzionalità del sito. Non
      richiedono consenso.
    </p>
    <h2 className="mt-6 text-xl font-semibold">Statistiche anonime</h2>
    <p className="text-ink-700">
      Plausible Analytics raccoglie dati aggregati senza cookie di profilazione
      e senza tracciamento personale. È conforme al GDPR senza necessità di
      banner di consenso.
    </p>
  </Section>
)

export default async function CookiePage() {
  const page = await getPageBySlug('cookie')
  if (page?.layout && Array.isArray(page.layout) && page.layout.length > 0) {
    return <Blocks blocks={page.layout as unknown[]} />
  }
  return fallback
}
