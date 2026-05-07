import Link from 'next/link'
import { bodyTypeLabels, fuelLabels } from '@/lib/utils/labels'

const bodyTiles: { key: string; label: string; emoji: string }[] = [
  { key: 'suv', label: bodyTypeLabels.suv, emoji: '🚙' },
  { key: 'berlina', label: bodyTypeLabels.berlina, emoji: '🚗' },
  { key: 'station-wagon', label: bodyTypeLabels['station-wagon'], emoji: '🚘' },
  { key: 'city-car', label: bodyTypeLabels['city-car'], emoji: '🚕' },
  { key: 'crossover', label: bodyTypeLabels.crossover, emoji: '🛻' },
  { key: 'cabrio', label: bodyTypeLabels.cabrio, emoji: '🏎️' },
]

const fuelTiles: { key: string; label: string }[] = [
  { key: 'benzina', label: fuelLabels.benzina },
  { key: 'diesel', label: fuelLabels.diesel },
  { key: 'ibrida', label: fuelLabels.ibrida },
  { key: 'ibrida-plug-in', label: fuelLabels['ibrida-plug-in'] },
  { key: 'elettrica', label: fuelLabels.elettrica },
  { key: 'gpl', label: fuelLabels.gpl },
]

export function CategoryGrid() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
          Per carrozzeria
        </h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {bodyTiles.map((b) => (
            <li key={b.key}>
              <Link
                href={`/veicoli?carrozzeria=${b.key}`}
                className="flex h-24 flex-col items-start justify-between rounded-xl border border-ink-200 bg-white p-4 text-sm font-medium text-ink-900 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
              >
                <span aria-hidden className="text-2xl">
                  {b.emoji}
                </span>
                {b.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
          Per alimentazione
        </h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {fuelTiles.map((f) => (
            <li key={f.key}>
              <Link
                href={`/veicoli?alimentazione=${f.key}`}
                className="flex h-24 flex-col items-start justify-end rounded-xl border border-ink-200 bg-white p-4 text-sm font-medium text-ink-900 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
              >
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
