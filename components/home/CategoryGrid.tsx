import Link from 'next/link'
import {
  Mountain,
  Car,
  Briefcase,
  Sparkles,
  Caravan,
  Sun,
  Droplet,
  Flame,
  Leaf,
  Plug,
  Zap,
  Wind,
} from 'lucide-react'
import { bodyTypeLabels, fuelLabels } from '@/lib/utils/labels'

type Tile = {
  key: string
  label: string
  icon: typeof Car
}

const bodyTiles: Tile[] = [
  { key: 'suv', label: bodyTypeLabels.suv, icon: Mountain },
  { key: 'berlina', label: bodyTypeLabels.berlina, icon: Car },
  { key: 'station-wagon', label: bodyTypeLabels['station-wagon'], icon: Briefcase },
  { key: 'city-car', label: bodyTypeLabels['city-car'], icon: Sparkles },
  { key: 'crossover', label: bodyTypeLabels.crossover, icon: Caravan },
  { key: 'cabrio', label: bodyTypeLabels.cabrio, icon: Sun },
]

const fuelTiles: Tile[] = [
  { key: 'benzina', label: fuelLabels.benzina, icon: Droplet },
  { key: 'diesel', label: fuelLabels.diesel, icon: Flame },
  { key: 'ibrida', label: fuelLabels.ibrida, icon: Leaf },
  { key: 'ibrida-plug-in', label: fuelLabels['ibrida-plug-in'], icon: Plug },
  { key: 'elettrica', label: fuelLabels.elettrica, icon: Zap },
  { key: 'gpl', label: fuelLabels.gpl, icon: Wind },
]

function TileGrid({
  tiles,
  paramKey,
}: {
  tiles: Tile[]
  paramKey: string
}) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {tiles.map((t) => {
        const Icon = t.icon
        return (
          <li key={t.key}>
            <Link
              href={`/veicoli?${paramKey}=${t.key}`}
              className="group flex h-28 flex-col items-start justify-between rounded-xl border border-ink-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-100 text-ink-700 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink-900">
                {t.label}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function CategoryGrid() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
          Per carrozzeria
        </h3>
        <div className="mt-4">
          <TileGrid tiles={bodyTiles} paramKey="carrozzeria" />
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
          Per alimentazione
        </h3>
        <div className="mt-4">
          <TileGrid tiles={fuelTiles} paramKey="alimentazione" />
        </div>
      </div>
    </div>
  )
}
