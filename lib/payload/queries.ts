import { unstable_cache } from 'next/cache'
import { getPayload } from './getPayload'
import type {
  Vehicle,
  Make,
  Optional,
  Location,
  SiteSetting,
  FinanceSetting,
  Page,
} from '@/payload-types'

/**
 * Tutte le query verso Payload sono cachate in fetch cache con tag
 * 'vehicles' / 'site' / 'finance' / 'pages' e invalidate dagli hook
 * afterChange/afterDelete delle relative collection.
 */

export const getPublishedVehicles = unstable_cache(
  async (): Promise<Vehicle[]> => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'vehicles',
      depth: 2,
      limit: 200,
      where: { _status: { equals: 'published' } },
      sort: '-updatedAt',
    })
    return res.docs as Vehicle[]
  },
  ['vehicles:published'],
  { tags: ['vehicles'], revalidate: 3600 },
)

export const getFeaturedVehicles = unstable_cache(
  async (): Promise<Vehicle[]> => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'vehicles',
      depth: 2,
      limit: 8,
      where: {
        _status: { equals: 'published' },
        featured: { equals: true },
        status: { not_equals: 'venduto' },
      },
      sort: '-updatedAt',
    })
    return res.docs as Vehicle[]
  },
  ['vehicles:featured'],
  { tags: ['vehicles'], revalidate: 3600 },
)

export const getVehicleBySlug = async (slug: string): Promise<Vehicle | null> => {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'vehicles',
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
  })
  return (res.docs[0] as Vehicle) ?? null
}

export const getMakes = unstable_cache(
  async (): Promise<Make[]> => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'makes',
      limit: 200,
      sort: 'name',
      depth: 0,
    })
    return res.docs as Make[]
  },
  ['makes'],
  { tags: ['makes'], revalidate: 3600 },
)

export const getOptionals = unstable_cache(
  async (): Promise<Optional[]> => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'optionals',
      limit: 500,
      sort: 'name',
      depth: 0,
    })
    return res.docs as Optional[]
  },
  ['optionals'],
  { tags: ['optionals'], revalidate: 3600 },
)

export const getLocations = unstable_cache(
  async (): Promise<Location[]> => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'locations',
      limit: 50,
      depth: 0,
    })
    return res.docs as Location[]
  },
  ['locations'],
  { tags: ['locations'], revalidate: 3600 },
)

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSetting> => {
    const payload = await getPayload()
    return (await payload.findGlobal({
      slug: 'siteSettings',
      depth: 1,
    })) as SiteSetting
  },
  ['site-settings'],
  { tags: ['site'], revalidate: 3600 },
)

export const getFinanceSettings = unstable_cache(
  async (): Promise<FinanceSetting> => {
    const payload = await getPayload()
    return (await payload.findGlobal({
      slug: 'financeSettings',
      depth: 0,
    })) as FinanceSetting
  },
  ['finance-settings'],
  { tags: ['finance'], revalidate: 3600 },
)

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'pages',
    depth: 2,
    limit: 1,
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
  })
  return (res.docs[0] as Page) ?? null
}

export const getSimilarVehicles = async (vehicle: Vehicle): Promise<Vehicle[]> => {
  const payload = await getPayload()
  const makeId =
    typeof vehicle.make === 'object' && vehicle.make ? vehicle.make.id : vehicle.make
  const lower = vehicle.price * 0.8
  const upper = vehicle.price * 1.2

  const res = await payload.find({
    collection: 'vehicles',
    depth: 2,
    limit: 4,
    where: {
      and: [
        { _status: { equals: 'published' } },
        { id: { not_equals: vehicle.id } },
        {
          or: [
            { make: { equals: makeId } },
            { bodyType: { equals: vehicle.bodyType } },
          ],
        },
        { price: { greater_than_equal: lower } },
        { price: { less_than_equal: upper } },
      ],
    },
  })
  return res.docs as Vehicle[]
}
