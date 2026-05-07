import type { MetadataRoute } from 'next'
import { getPublishedVehicles } from '@/lib/payload/queries'

export const dynamic = 'force-dynamic'

const STATIC_PATHS = [
  '',
  'veicoli',
  'chi-siamo',
  'servizi',
  'contatti',
  'vendi-la-tua-auto',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const vehicles = await getPublishedVehicles()

  return [
    ...STATIC_PATHS.map((p) => ({
      url: p ? `${base}/${p}` : `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1.0 : 0.7,
    })),
    ...vehicles.map((v) => ({
      url: `${base}/veicoli/${v.slug}`,
      lastModified: v.updatedAt ? new Date(v.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
