'use client'

import dynamic from 'next/dynamic'
import type { Location } from '@/payload-types'

const Map = dynamic(
  () => import('./LocationMap').then((m) => m.LocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[320px] place-items-center rounded-xl border border-ink-200 bg-ink-50 text-sm text-ink-500">
        Caricamento mappa…
      </div>
    ),
  },
)

export function LocationMapLazy({ location }: { location: Location }) {
  return <Map location={location} />
}
