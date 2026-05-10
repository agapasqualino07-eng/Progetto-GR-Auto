import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

import {
  getFinanceSettings,
  getSimilarVehicles,
  getSiteSettings,
  getVehicleBySlug,
} from '@/lib/payload/queries'
import { Section, SectionHeader } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import { Gallery } from '@/components/vehicles/Gallery'
import { FinanceCalculator } from '@/components/vehicles/FinanceCalculator'
import { Tabs } from '@/components/vehicles/Tabs'
import { VehicleSidebar } from '@/components/vehicles/VehicleSidebar'
import { LocationMapLazy } from '@/components/vehicles/LocationMapLazy'
import { RichTextRender } from '@/components/payload/RichTextRender'
import { formatKm, formatMonthYear, formatPrice } from '@/lib/utils/format'
import { getCoverImage, getGallery, vehicleYear } from '@/lib/utils/vehicle'
import {
  bodyTypeLabels,
  conditionLabels,
  drivetrainLabels,
  euroLabels,
  fuelLabels,
  optionalCategoryLabels,
  statusLabels,
  transmissionLabels,
} from '@/lib/utils/labels'
import type { Location, Make, Optional } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)
  if (!vehicle) return { title: 'Veicolo non trovato' }
  const cover = getCoverImage(vehicle, 'hero')
  return {
    title: vehicle.metaTitle || vehicle.title,
    description:
      vehicle.metaDescription ||
      `${vehicle.title} — ${formatKm(vehicle.mileage)}, ${formatMonthYear(vehicle.firstRegistration)}, ${formatPrice(vehicle.price)}.`,
    openGraph: {
      title: vehicle.metaTitle || vehicle.title,
      images: cover?.url ? [{ url: cover.url }] : undefined,
    },
  }
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)
  if (!vehicle) notFound()

  const [finance, site, similar] = await Promise.all([
    getFinanceSettings(),
    getSiteSettings(),
    getSimilarVehicles(vehicle),
  ])

  const make = (typeof vehicle.make === 'object' ? vehicle.make : null) as
    | Make
    | null
  const location = (typeof vehicle.location === 'object'
    ? vehicle.location
    : null) as Location | null
  const status = statusLabels[vehicle.availability as keyof typeof statusLabels]
  const galleryImages = getGallery(vehicle)
  const optionals = (vehicle.optionals ?? []).filter(
    (o): o is Optional => typeof o === 'object' && o !== null,
  )

  const optionalsByCat = optionals.reduce<Record<string, Optional[]>>(
    (acc, o) => {
      const k = o.category as string
      acc[k] = acc[k] || []
      acc[k].push(o)
      return acc
    },
    {},
  )

  const specs: { label: string; value: string }[] = [
    {
      label: 'Immatricolazione',
      value: formatMonthYear(vehicle.firstRegistration),
    },
    { label: 'Chilometri', value: formatKm(vehicle.mileage) },
    {
      label: 'Alimentazione',
      value: fuelLabels[vehicle.fuel as keyof typeof fuelLabels] || '—',
    },
    {
      label: 'Cambio',
      value:
        transmissionLabels[
          vehicle.transmission as keyof typeof transmissionLabels
        ] || '—',
    },
    {
      label: 'Trazione',
      value: vehicle.drivetrain
        ? drivetrainLabels[vehicle.drivetrain as keyof typeof drivetrainLabels]
        : '—',
    },
    {
      label: 'Cilindrata',
      value: vehicle.displacement ? `${vehicle.displacement} cc` : '—',
    },
    {
      label: 'Potenza',
      value: vehicle.powerCv
        ? `${vehicle.powerCv} CV (${vehicle.powerKw} kW)`
        : `${vehicle.powerKw} kW`,
    },
    { label: 'CO₂', value: vehicle.co2 ? `${vehicle.co2} g/km` : '—' },
    {
      label: 'Classe Euro',
      value: vehicle.euroClass
        ? euroLabels[vehicle.euroClass as keyof typeof euroLabels]
        : '—',
    },
    {
      label: 'Carrozzeria',
      value: vehicle.bodyType
        ? bodyTypeLabels[vehicle.bodyType as keyof typeof bodyTypeLabels]
        : '—',
    },
    { label: 'Porte', value: vehicle.doors ? String(vehicle.doors) : '—' },
    { label: 'Posti', value: vehicle.seats ? String(vehicle.seats) : '—' },
    {
      label: 'Condizione',
      value: conditionLabels[vehicle.condition as keyof typeof conditionLabels],
    },
    { label: 'Colore esterno', value: vehicle.exteriorColor || '—' },
    {
      label: 'Interni',
      value:
        [vehicle.interiorColor, vehicle.interiorMaterial]
          .filter(Boolean)
          .join(' · ') || '—',
    },
  ]

  const cover = getCoverImage(vehicle, 'hero')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: vehicle.title,
    brand: make?.name,
    model: vehicle.model,
    vehicleConfiguration: vehicle.trim,
    bodyType: vehicle.bodyType,
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitCode: 'KMT',
    },
    vehicleModelDate: vehicleYear(vehicle),
    image: cover?.url,
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'EUR',
      availability:
        vehicle.availability === 'sold'
          ? 'https://schema.org/SoldOut'
          : vehicle.availability === 'incoming'
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/InStock',
      seller: { '@type': 'AutoDealer', name: site.name },
    },
  }

  return (
    <>
      {/* Breadcrumb + titolo su sfondo light */}
      <Section className="pt-8 sm:pt-10">
        <nav
          className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink-500"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-ink-900">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-ink-300" />
          <Link href="/veicoli" className="hover:text-ink-900">
            Veicoli
          </Link>
          <ChevronRight className="h-3 w-3 text-ink-300" />
          <span className="text-ink-700">{vehicle.title}</span>
        </nav>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {status ? <Badge tone={status.tone}>{status.label}</Badge> : null}
          {vehicle.featured ? <Badge tone="brand">In evidenza</Badge> : null}
          {make ? (
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500">
              {make.name}
            </span>
          ) : null}
        </div>
        <h1 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
          {vehicle.title}
        </h1>

        {/* Quick specs strip */}
        <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-ink-100 py-4 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-ink-500">Anno</span>
            <strong className="font-display font-bold tabular-nums text-ink-900">
              {formatMonthYear(vehicle.firstRegistration)}
            </strong>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-ink-500">Km</span>
            <strong className="font-display font-bold tabular-nums text-ink-900">
              {formatKm(vehicle.mileage)}
            </strong>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-ink-500">Alimentazione</span>
            <strong className="font-display font-bold text-ink-900">
              {fuelLabels[vehicle.fuel as keyof typeof fuelLabels]}
            </strong>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-ink-500">Cambio</span>
            <strong className="font-display font-bold text-ink-900">
              {
                transmissionLabels[
                  vehicle.transmission as keyof typeof transmissionLabels
                ]
              }
            </strong>
          </li>
          {vehicle.powerCv ? (
            <li className="flex items-center gap-2">
              <span className="text-ink-500">Potenza</span>
              <strong className="font-display font-bold tabular-nums text-ink-900">
                {vehicle.powerCv} CV
              </strong>
            </li>
          ) : null}
        </ul>
      </Section>

      <Section className="py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <Gallery images={galleryImages} />

            {vehicle.highlights && vehicle.highlights.length > 0 ? (
              <div className="mt-8">
                <h2 className="font-display text-lg font-bold text-ink-900">
                  Punti di forza
                </h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {vehicle.highlights.map((h) => (
                    <li
                      key={h.id ?? h.text}
                      className="flex items-center gap-2.5 rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 shadow-card"
                    >
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                      {h.text}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10">
              <Tabs
                items={[
                  {
                    id: 'spec',
                    label: 'Caratteristiche',
                    content: (
                      <dl className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                        {specs.map((s) => (
                          <div
                            key={s.label}
                            className="flex items-baseline justify-between border-b border-ink-100 py-2.5 text-sm"
                          >
                            <dt className="text-ink-600">{s.label}</dt>
                            <dd className="text-right font-semibold text-ink-900">
                              {s.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ),
                  },
                  {
                    id: 'opt',
                    label: `Optional (${optionals.length})`,
                    content:
                      optionals.length === 0 ? (
                        <p className="text-ink-600">
                          Nessun optional registrato.
                        </p>
                      ) : (
                        <div className="space-y-7">
                          {Object.entries(optionalsByCat).map(([cat, list]) => (
                            <div key={cat}>
                              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                                {optionalCategoryLabels[cat] ?? cat}
                              </h4>
                              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {list.map((o) => (
                                  <li
                                    key={o.id}
                                    className="flex items-center gap-2.5 text-sm text-ink-800"
                                  >
                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                                    {o.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ),
                  },
                  {
                    id: 'desc',
                    label: 'Descrizione',
                    content: vehicle.description ? (
                      <RichTextRender
                        data={vehicle.description}
                        className="prose-sm max-w-none text-ink-700 leading-relaxed"
                      />
                    ) : (
                      <p className="text-ink-600">
                        Nessuna descrizione disponibile.
                      </p>
                    ),
                  },
                  {
                    id: 'sede',
                    label: 'Sede',
                    content: location ? (
                      <div className="grid gap-5 lg:grid-cols-2">
                        <div className="rounded-xl border border-ink-200 bg-white p-5 text-sm">
                          <strong className="block font-display text-base font-bold text-ink-900">
                            {location.name}
                          </strong>
                          <p className="mt-2 text-ink-700">{location.address}</p>
                          <p className="text-ink-700">
                            {location.zip} {location.city} ({location.province})
                          </p>
                          {location.phone ? (
                            <p className="mt-3">
                              <a
                                className="inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
                                href={`tel:${location.phone}`}
                              >
                                {location.phone}
                              </a>
                            </p>
                          ) : null}
                          {location.openingHours &&
                          location.openingHours.length > 0 ? (
                            <ul className="mt-3 space-y-1 text-ink-700">
                              {location.openingHours.map((o) => (
                                <li key={o.id ?? o.days}>
                                  <strong className="text-ink-900">
                                    {o.days}:
                                  </strong>{' '}
                                  {o.hours}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                        {location.coordinates ? (
                          <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-card">
                            <LocationMapLazy location={location} />
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <p className="text-ink-600">Sede non specificata.</p>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <VehicleSidebar vehicle={vehicle} whatsapp={site.whatsapp} />
            <div className="mt-4">
              <FinanceCalculator price={vehicle.price} settings={finance} />
            </div>
          </div>
        </div>
      </Section>

      {similar.length > 0 ? (
        <section className="border-t border-ink-100 bg-ink-50 py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Potrebbero interessarti"
              title="Veicoli simili"
              description="Stessa fascia di prezzo, marca o categoria. Forse fanno per te."
            />
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((v) => (
                <li key={v.id} className="h-full">
                  <VehicleCard vehicle={v} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
