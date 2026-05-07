import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

import { getPageBySlug } from '@/lib/payload/queries'
import { Blocks } from '@/components/payload/Blocks'
import type { Media } from '@/payload-types'

const ALLOWED_SLUGS = new Set(['chi-siamo', 'servizi', 'privacy', 'cookie'])

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!ALLOWED_SLUGS.has(slug)) return { title: 'Pagina non trovata' }
  const page = await getPageBySlug(slug)
  if (!page) return { title: 'Pagina non trovata' }

  const seo = (page as unknown as {
    metaTitle?: string
    metaDescription?: string
    ogImage?: Media | string
  }) ?? {}

  return {
    title: seo.metaTitle || page.title,
    description: seo.metaDescription,
    openGraph: {
      title: seo.metaTitle || page.title,
      images:
        seo.ogImage && typeof seo.ogImage === 'object' && (seo.ogImage as Media).url
          ? [{ url: (seo.ogImage as Media).url! }]
          : undefined,
    },
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  if (!ALLOWED_SLUGS.has(slug)) notFound()

  const page = await getPageBySlug(slug)
  if (!page) notFound()

  return <Blocks blocks={page.layout as unknown[]} />
}
