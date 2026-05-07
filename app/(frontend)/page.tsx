import Link from 'next/link'

export const dynamic = 'force-dynamic'

import { Hero } from '@/components/home/Hero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { Services } from '@/components/home/Services'
import { FinalCTA } from '@/components/home/FinalCTA'
import { Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import {
  getFeaturedVehicles,
  getMakes,
  getPublishedVehicles,
} from '@/lib/payload/queries'

export default async function HomePage() {
  const [featured, makes, all] = await Promise.all([
    getFeaturedVehicles(),
    getMakes(),
    getPublishedVehicles(),
  ])

  return (
    <>
      <Hero makes={makes} totalCount={all.length} />

      {featured.length > 0 ? (
        <Section className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Selezione"
              title="Veicoli in evidenza"
              description="Le proposte del momento, scelte per qualità, prezzo o disponibilità immediata."
            />
            <Button asChild variant="ghost" size="sm">
              <Link href="/veicoli">Vedi tutti i veicoli →</Link>
            </Button>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <li key={v.id} className="h-full">
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section className="py-16">
        <SectionHeader
          eyebrow="Esplora il catalogo"
          title="Trova quello che fa per te"
          description="Filtra per carrozzeria o alimentazione: ti portiamo direttamente al sotto-insieme giusto."
        />
        <CategoryGrid />
      </Section>

      <Section className="py-16">
        <SectionHeader
          eyebrow="Servizi"
          title="Quello che facciamo, oltre alla vendita"
        />
        <Services />
      </Section>

      <Section className="pb-20 pt-4">
        <FinalCTA />
      </Section>
    </>
  )
}
