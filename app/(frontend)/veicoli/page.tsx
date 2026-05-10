import type { Metadata } from 'next'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

import { Section } from '@/components/ui/section'
import { CatalogClient } from '@/components/vehicles/CatalogClient'
import { getMakes, getPublishedVehicles } from '@/lib/payload/queries'

export const metadata: Metadata = {
  title: 'Veicoli',
  description:
    'Catalogo dei veicoli usati, km 0 e aziendali. Filtra per marca, prezzo, alimentazione, anno e chilometri.',
}

export default async function VeicoliPage() {
  const [vehicles, makes] = await Promise.all([
    getPublishedVehicles(),
    getMakes(),
  ])

  return (
    <>
      {/* Hero secondaria scura */}
      <section className="relative overflow-hidden bg-ink-900 py-14 text-white sm:py-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_15%,rgba(239,68,68,0.20),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-600/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-300 ring-1 ring-inset ring-brand-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {vehicles.length} veicoli disponibili
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Il nostro stock
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-white/80 sm:text-lg">
            Tutti i veicoli sono ispezionati e venduti con garanzia. Filtra per
            marca, prezzo, alimentazione e altro: trovi quello che fa per te in
            pochi click.
          </p>
        </div>
      </section>

      <Section className="py-10 sm:py-14">
        <Suspense>
          <CatalogClient vehicles={vehicles} makes={makes} />
        </Suspense>
      </Section>
    </>
  )
}
