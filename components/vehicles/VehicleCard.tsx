import Image from 'next/image'
import Link from 'next/link'
import {
  Car,
  Gauge,
  Calendar,
  Settings2,
  Fuel,
  ArrowUpRight,
} from 'lucide-react'
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
  const status = statusLabels[vehicle.availability as keyof typeof statusLabels]
  const isSold = vehicle.availability === 'sold'

  return (
    <Link
      href={`/veicoli/${vehicle.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-ink-300 hover:shadow-card-hover focus-visible:-translate-y-1 focus-visible:shadow-card-hover"
    >
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={
              'object-cover transition-transform duration-700 ease-out group-hover:scale-110' +
              (isSold ? ' grayscale' : '')
            }
          />
        ) : (
          <div className="grid h-full place-items-center text-ink-400">
            <Car className="h-12 w-12" />
          </div>
        )}

        {/* Gradient bottom overlay (per leggibilità eventuali label sopra) */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Badge stack top-left */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {vehicle.featured ? <Badge tone="brand">In evidenza</Badge> : null}
          {status ? <Badge tone={status.tone}>{status.label}</Badge> : null}
          {vehicle.priceStrikethrough && !isSold ? (
            <Badge tone="dark">Offerta</Badge>
          ) : null}
        </div>

        {/* Anno top-right su pillola scura */}
        {vehicle.firstRegistration ? (
          <div className="absolute right-3 top-3">
            <Badge tone="outline">
              {formatMonthYear(vehicle.firstRegistration)}
            </Badge>
          </div>
        ) : null}

        {/* Mini CTA arrow on hover */}
        <div
          aria-hidden
          className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-brand-600 text-white opacity-0 shadow-cta transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">
          {make?.name ?? 'Marca'}
        </div>
        <h3 className="mt-1 line-clamp-2 font-display text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
          {vehicle.model}
          {vehicle.trim ? (
            <span className="font-medium text-ink-600"> {vehicle.trim}</span>
          ) : null}
        </h3>

        {/* Specs grid */}
        <ul className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-ink-700">
          <li className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-ink-400" />
            <span className="tabular-nums">
              {formatMonthYear(vehicle.firstRegistration)}
            </span>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-ink-400" />
            <span className="tabular-nums">{formatKm(vehicle.mileage)}</span>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-ink-400" />
            <span className="truncate">
              {transmissionLabels[
                vehicle.transmission as keyof typeof transmissionLabels
              ] ?? '—'}
            </span>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-ink-400" />
            <span className="truncate">
              {fuelLabels[vehicle.fuel as keyof typeof fuelLabels] ?? '—'}
            </span>
          </li>
        </ul>

        {/* Price footer */}
        <div className="mt-5 flex items-end justify-between border-t border-ink-100 pt-4">
          <div>
            {vehicle.priceStrikethrough ? (
              <div className="text-xs font-medium text-ink-400 line-through tabular-nums">
                {formatPrice(vehicle.priceStrikethrough)}
              </div>
            ) : null}
            <div className="font-display text-2xl font-extrabold leading-none text-ink-900 tabular-nums">
              {formatPrice(vehicle.price)}
            </div>
          </div>
          {vehicle.financingMonthly ? (
            <div className="text-right">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                Da
              </div>
              <div className="text-sm font-bold text-brand-600 tabular-nums">
                {formatPrice(vehicle.financingMonthly)}
                <span className="text-xs font-medium text-ink-500">/mese</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
