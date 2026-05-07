import type { Metadata } from 'next'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

import { Section, SectionHeader } from '@/components/ui/section'
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
    <Section className="py-12 sm:py-16">
      <SectionHeader
        eyebrow="Catalogo"
        title="Veicoli disponibili"
        description="Tutti i veicoli sono ispezionati e venduti con garanzia. Filtra come preferisci."
      />
      <Suspense>
        <CatalogClient vehicles={vehicles} makes={makes} />
      </Suspense>
    </Section>
  )
}
