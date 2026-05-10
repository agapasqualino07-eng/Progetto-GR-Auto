import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

import { Hero } from '@/components/home/Hero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { Services } from '@/components/home/Services'
import { WhyUs } from '@/components/home/WhyUs'
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
        <Section className="py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Selezione del momento"
              title="Veicoli in evidenza"
              description="Le proposte del momento, scelte per qualità, prezzo o disponibilità immediata."
            />
            <Button asChild variant="ghost" size="sm" className="mb-10">
              <Link href="/veicoli">
                Vedi tutti i veicoli
                <ArrowRight className="h-4 w-4" />
              </Link>
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

      {/* Sezione scura — Why us */}
      <section className="relative overflow-hidden bg-ink-900 py-20 text-white sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(239,68,68,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
              Perché sceglierci
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Un concessionario che si comporta come{' '}
              <span className="text-brand-400">vorresti</span>.
            </h2>
            <p className="mt-4 text-pretty text-base text-white/70 sm:text-lg">
              Non vendiamo auto a tutti i costi: vendiamo l&apos;auto giusta
              alla persona giusta. È il modo in cui costruiamo clienti che
              tornano.
            </p>
          </div>
          <WhyUs />
        </div>
      </section>

      <Section className="py-20 sm:py-24">
        <SectionHeader
          eyebrow="Esplora il catalogo"
          title="Trova quello che fa per te"
          description="Filtra per carrozzeria o alimentazione: ti portiamo direttamente al sotto-insieme giusto."
        />
        <CategoryGrid />
      </Section>

      <Section className="py-20 sm:py-24">
        <SectionHeader
          eyebrow="Servizi"
          title="Quello che facciamo, oltre alla vendita"
          description="Ogni veicolo viene consegnato pronto, tagliandato e con la documentazione in regola."
        />
        <Services />
      </Section>

      <Section className="pb-24 pt-4">
        <FinalCTA />
      </Section>
    </>
  )
}
