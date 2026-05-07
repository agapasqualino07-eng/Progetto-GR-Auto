import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { RichTextRender } from './RichTextRender'
import { cn } from '@/lib/utils/cn'
import type { Media } from '@/payload-types'

type Block = { blockType: string } & Record<string, unknown>

function asMedia(m: unknown): Media | null {
  return m && typeof m === 'object' ? (m as Media) : null
}

function HeroBlock({ block }: { block: Block }) {
  const image = asMedia(block.image)
  return (
    <Section className="py-12 sm:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          {block.eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {String(block.eyebrow)}
            </span>
          ) : null}
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {String(block.heading)}
          </h1>
          {block.subheading ? (
            <p className="mt-4 max-w-xl text-pretty text-base text-ink-700">
              {String(block.subheading)}
            </p>
          ) : null}
          {Array.isArray(block.cta) && block.cta.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {(
                block.cta as {
                  label: string
                  href: string
                  variant?: 'primary' | 'secondary'
                  id?: string
                }[]
              ).map((c) => (
                <Button
                  key={c.id ?? c.href}
                  asChild
                  variant={c.variant === 'secondary' ? 'outline' : 'primary'}
                >
                  <Link href={c.href}>{c.label}</Link>
                </Button>
              ))}
            </div>
          ) : null}
        </div>
        {image?.url ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
            <Image
              src={image.url}
              alt={image.alt ?? ''}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </Section>
  )
}

function TextSectionBlock({ block }: { block: Block }) {
  const align = block.align === 'center' ? 'mx-auto text-center' : ''
  return (
    <Section className="py-10">
      <div className={cn('max-w-3xl', align)}>
        {block.heading ? (
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {String(block.heading)}
          </h2>
        ) : null}
        <RichTextRender data={block.body} className="mt-4 text-base text-ink-700" />
      </div>
    </Section>
  )
}

function ImageGridBlock({ block }: { block: Block }) {
  const items = (block.images as { image?: Media | string; caption?: string; id?: string }[]) ?? []
  return (
    <Section className="py-10">
      {block.heading ? (
        <SectionHeader title={String(block.heading)} />
      ) : null}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const m = asMedia(it.image)
          return (
            <li
              key={it.id ?? i}
              className="overflow-hidden rounded-xl border border-ink-200 bg-white"
            >
              {m?.url ? (
                <div className="relative aspect-[4/3]">
                  <Image src={m.url} alt={m.alt ?? ''} fill sizes="33vw" className="object-cover" />
                </div>
              ) : null}
              {it.caption ? (
                <div className="px-4 py-3 text-sm text-ink-700">{it.caption}</div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

function CTABlock({ block }: { block: Block }) {
  return (
    <Section className="py-10">
      <div className="rounded-2xl bg-brand-700 p-8 text-white sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {String(block.heading)}
            </h2>
            {block.description ? (
              <p className="mt-2 text-white/85">{String(block.description)}</p>
            ) : null}
          </div>
          <Button asChild size="lg" className="bg-white text-brand-800 hover:bg-white/90">
            <Link href={String(block.buttonHref)}>{String(block.buttonLabel)}</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

function FAQBlock({ block }: { block: Block }) {
  const items = (block.items as { question: string; answer: unknown; id?: string }[]) ?? []
  return (
    <Section className="py-10">
      {block.heading ? (
        <SectionHeader title={String(block.heading)} />
      ) : null}
      <ul className="divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white">
        {items.map((q, i) => (
          <li key={q.id ?? i}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium text-ink-900">
                {q.question}
                <span aria-hidden className="text-ink-500 transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-ink-700">
                <RichTextRender data={q.answer} />
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function TestimonialsBlock({ block }: { block: Block }) {
  const items =
    (block.items as {
      author: string
      role?: string
      quote: string
      rating?: number
      id?: string
    }[]) ?? []
  return (
    <Section className="py-10">
      {block.heading ? (
        <SectionHeader title={String(block.heading)} />
      ) : null}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <li
            key={t.id ?? i}
            className="rounded-xl border border-ink-200 bg-white p-5"
          >
            <div aria-label={`${t.rating ?? 5} su 5 stelle`} className="text-amber-500">
              {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                <span key={k}>★</span>
              ))}
            </div>
            <blockquote className="mt-3 text-sm text-ink-900">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-3 text-xs font-medium text-ink-700">
              {t.author}
              {t.role ? <span className="text-ink-500"> · {t.role}</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Blocks({ blocks }: { blocks: unknown[] | undefined | null }) {
  if (!blocks) return null
  return (
    <>
      {blocks.map((b, i) => {
        if (!b || typeof b !== 'object') return null
        const block = b as Block
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={i} block={block} />
          case 'textSection':
            return <TextSectionBlock key={i} block={block} />
          case 'imageGrid':
            return <ImageGridBlock key={i} block={block} />
          case 'cta':
            return <CTABlock key={i} block={block} />
          case 'faq':
            return <FAQBlock key={i} block={block} />
          case 'testimonials':
            return <TestimonialsBlock key={i} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
