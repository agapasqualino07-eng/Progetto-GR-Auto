import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

import {
  getFinanceSettings,
  getSimilarVehicles,
  getSiteSettings,
  getVehicleBySlug,
} from '@/lib/payload/queries'
import { Section } from '@/components/ui/section'
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

  const make = (typeof vehicle.make === 'object' ? vehicle.make : null) as Make | null
  const location = (typeof vehicle.location === 'object'
    ? vehicle.location
    : null) as Location | null
  const status = statusLabels[vehicle.availability as keyof typeof statusLabels]
  const galleryImages = getGallery(vehicle)
  const optionals = (vehicle.optionals ?? [])
    .filter((o): o is Optional => typeof o === 'object' && o !== null)

  // Raggruppa optional per categoria
  const optionalsByCat = optionals.reduce<Record<string, Optional[]>>((acc, o) => {
    const k = o.category as string
    acc[k] = acc[k] || []
    acc[k].push(o)
    return acc
  }, {})

  // Specs render
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
    { label: 'Potenza', value: vehicle.powerCv ? `${vehicle.powerCv} CV (${vehicle.powerKw} kW)` : `${vehicle.powerKw} kW` },
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
    {
      label: 'Colore esterno',
      value: vehicle.exteriorColor || '—',
    },
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
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: vehicle.mileage, unitCode: 'KMT' },
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
      <Section className="pt-8">
        <nav className="text-xs text-ink-500" aria-label="breadcrumb">
          <Link href="/" className="hover:text-ink-900">Home</Link>
          {' / '}
          <Link href="/veicoli" className="hover:text-ink-900">Veicoli</Link>
          {' / '}
          <span className="text-ink-700">{vehicle.title}</span>
        </nav>
      </Section>

      <Section className="py-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {status ? <Badge tone={status.tone}>{status.label}</Badge> : null}
              <span className="text-xs uppercase tracking-wider text-ink-500">
                {make?.name}
              </span>
            </div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              {vehicle.title}
            </h1>

            <div className="mt-6">
              <Gallery images={galleryImages} />
            </div>

            {vehicle.highlights && vehicle.highlights.length > 0 ? (
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {vehicle.highlights.map((h) => (
                  <li
                    key={h.id ?? h.text}
                    className="flex items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      ✓
                    </span>
                    {h.text}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8">
              <Tabs
                items={[
                  {
                    id: 'spec',
                    label: 'Caratteristiche',
                    content: (
                      <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        {specs.map((s) => (
                          <div
                            key={s.label}
                            className="flex justify-between border-b border-ink-100 py-2 text-sm"
                          >
                            <dt className="text-ink-700">{s.label}</dt>
                            <dd className="font-medium text-ink-900">{s.value}</dd>
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
                        <p className="text-ink-700">Nessun optional registrato.</p>
                      ) : (
                        <div className="space-y-5">
                          {Object.entries(optionalsByCat).map(([cat, list]) => (
                            <div key={cat}>
                              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                                {optionalCategoryLabels[cat] ?? cat}
                              </h4>
                              <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                                {list.map((o) => (
                                  <li
                                    key={o.id}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <span className="text-emerald-700">✓</span>
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
                        className="prose-sm max-w-none"
                      />
                    ) : (
                      <p className="text-ink-700">
                        Nessuna descrizione disponibile.
                      </p>
                    ),
                  },
                  {
                    id: 'sede',
                    label: 'Sede',
                    content: location ? (
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="text-sm">
                          <strong className="block text-ink-900">{location.name}</strong>
                          <p>{location.address}</p>
                          <p>
                            {location.zip} {location.city} ({location.province})
                          </p>
                          {location.phone ? (
                            <p className="mt-2">
                              Tel.{' '}
                              
                                className="text-brand-700 hover:underline"
                                href={`tel:${location.phone}`}
                              >
                                {location.phone}
                              </a>
                            </p>
                          ) : null}
                          {location.openingHours && location.openingHours.length > 0 ? (
                            <ul className="mt-2 text-ink-700">
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
                          <LocationMapLazy location={location} />
                        ) : null}
                      </div>
                    ) : (
                      <p className="text-ink-700">
                        Sede non specificata.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <VehicleSidebar vehicle={vehicle} whatsapp={site.whatsapp} />
            <div className="mt-4">
              <FinanceCalculator price={vehicle.price} settings={finance} />
            </div>
          </div>
        </div>
      </Section>

      {similar.length > 0 ? (
        <Section className="py-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Veicoli simili
          </h2>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((v) => (
              <li key={v.id} className="h-full">
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}