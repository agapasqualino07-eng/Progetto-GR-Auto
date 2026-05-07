import type { Vehicle, Media } from '@/payload-types'

export type VehicleImageSize = 'thumbnail' | 'card' | 'full' | 'hero'

export function getCoverImage(vehicle: Vehicle, size: VehicleImageSize = 'card') {
  const first = vehicle.gallery?.[0]?.image
  if (!first || typeof first !== 'object') return null
  const m = first as Media
  const sized = m.sizes?.[size]
  return {
    url: sized?.url || m.url || '',
    alt: m.alt || vehicle.title || '',
    width: sized?.width || m.width || undefined,
    height: sized?.height || m.height || undefined,
  }
}

export function getGallery(vehicle: Vehicle, size: VehicleImageSize = 'full') {
  return (vehicle.gallery || [])
    .map((g) => {
      const img = g.image
      if (!img || typeof img !== 'object') return null
      const m = img as Media
      const sized = m.sizes?.[size]
      return {
        url: sized?.url || m.url || '',
        thumb: m.sizes?.thumbnail?.url || m.url || '',
        alt: m.alt || vehicle.title || '',
        width: sized?.width || m.width || undefined,
        height: sized?.height || m.height || undefined,
      }
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x?.url))
}

export function vehicleYear(v: Vehicle): number | null {
  if (!v.firstRegistration) return null
  const d = new Date(v.firstRegistration)
  return Number.isNaN(d.getTime()) ? null : d.getFullYear()
}
