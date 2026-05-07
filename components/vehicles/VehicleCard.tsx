import Image from 'next/image'
import Link from 'next/link'
import { Car, Gauge, Calendar, Settings2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatKm, formatMonthYear, formatPrice } from '@/lib/utils/format'
import {
  fuelLabels,
  transmissionLabels,
  statusLabels,
} from '@/lib/utils/labels'
import { getCoverImage } from '@/lib/utils/vehicle'
import type { Vehicle, Make } from '@/payload-types'

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const cover = getCoverImage(vehicle, 'card')
  const make = (typeof vehicle.make === 'object' ? vehicle.make : null) as
    | Make
    | null
  const status = statusLabels[vehicle.status as keyof typeof statusLabels]

  return (
    <Link
      href={`/veicoli/${vehicle.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-ink-500">
            <Car className="h-12 w-12" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {vehicle.featured ? <Badge tone="brand">In evidenza</Badge> : null}
          {status ? <Badge tone={status.tone}>{status.label}</Badge> : null}
          {vehicle.priceStrikethrough ? <Badge tone="danger">Offerta</Badge> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs uppercase tracking-wider text-ink-500">
          {make?.name ?? '—'}
        </div>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-ink-900">
          {vehicle.model}
          {vehicle.trim ? <span className="font-normal"> {vehicle.trim}</span> : null}
        </h3>

        <ul className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-ink-700">
          <li className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-ink-500" />
            {formatMonthYear(vehicle.firstRegistration)}
          </li>
          <li className="inline-flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5 text-ink-500" />
            {formatKm(vehicle.mileage)}
          </li>
          <li className="inline-flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5 text-ink-500" />
            {transmissionLabels[vehicle.transmission as keyof typeof transmissionLabels]}
          </li>
          <li className="inline-flex items-center gap-1">
            <span aria-hidden className="h-3.5 w-3.5 rounded-full bg-ink-200" />
            {fuelLabels[vehicle.fuel as keyof typeof fuelLabels]}
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {vehicle.priceStrikethrough ? (
              <div className="text-xs text-ink-500 line-through">
                {formatPrice(vehicle.priceStrikethrough)}
              </div>
            ) : null}
            <div className="text-lg font-bold tabular-nums text-ink-900">
              {formatPrice(vehicle.price)}
            </div>
          </div>
          {vehicle.financingMonthly ? (
            <div className="text-right text-xs text-ink-700">
              da {formatPrice(vehicle.financingMonthly)}/mese
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
