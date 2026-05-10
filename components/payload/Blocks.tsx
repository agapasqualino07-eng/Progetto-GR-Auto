import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Quote, Star } from 'lucide-react'
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
    <Section className="py-14 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          {block.eyebrow ? (
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
              {String(block.eyebrow)}
            </span>
          ) : null}
          <h1 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            {String(block.heading)}
          </h1>
          {block.subheading ? (
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-600 sm:text-lg">
              {String(block.subheading)}
            </p>
          ) : null}
          {Array.isArray(block.cta) && block.cta.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3">
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
                  size="lg"
                  variant={c.variant === 'secondary' ? 'outline' : 'primary'}
                >
                  <Link href={c.href}>{c.label}</Link>
                </Button>
              ))}
            </div>
          ) : null}
        </div>
        {image?.url ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100 shadow-card-hover ring-1 ring-ink-900/5">
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
    <Section className="py-12 sm:py-16">
      <div className={cn('max-w-3xl', align)}>
        {block.heading ? (
          <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">
            {String(block.heading)}
          </h2>
        ) : null}
        <RichTextRender
          data={block.body}
          className="mt-5 text-base leading-relaxed text-ink-700"
        />
      </div>
    </Section>
  )
}

function ImageGridBlock({ block }: { block: Block }) {
  const items =
    (block.images as { image?: Media | string; caption?: string; id?: string }[]) ??
    []
  return (
    <Section className="py-12 sm:py-16">
      {block.heading ? (
        <SectionHeader title={String(block.heading)} />
      ) : null}
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const m = asMedia(it.image)
          return (
            <li
              key={it.id ?? i}
              className="group overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              {m?.url ? (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={m.url}
                    alt={m.alt ?? ''}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : null}
              {it.caption ? (
                <div className="px-5 py-4 text-sm font-medium text-ink-800">
                  {it.caption}
                </div>
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
    <Section className="py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white shadow-card-hover sm:p-12 lg:p-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_25%,rgba(239,68,68,0.30),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div>
            <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              {String(block.heading)}
            </h2>
            {block.description ? (
              <p className="mt-3 max-w-2xl text-pretty text-base text-white/80">
                {String(block.description)}
              </p>
            ) : null}
          </div>
          <Button
            asChild
            size="lg"
            className="bg-white text-ink-900 shadow-card hover:bg-white/90"
          >
            <Link href={String(block.buttonHref)}>
              {String(block.buttonLabel)}
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

function FAQBlock({ block }: { block: Block }) {
  const items =
    (block.items as { question: string; answer: unknown; id?: string }[]) ?? []
  return (
    <Section className="py-12 sm:py-16">
      {block.heading ? (
        <SectionHeader title={String(block.heading)} />
      ) : null}
      <ul className="mx-auto max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
        {items.map((q, i) => (
          <li key={q.id ?? i}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-semibold text-ink-900 transition-colors hover:bg-ink-50 sm:p-6">
                <span>{q.question}</span>
                <span
                  aria-hidden
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-ink-100 text-ink-600 transition-all group-open:rotate-180 group-open:bg-brand-600 group-open:text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div className="px-5 pb-6 text-sm leading-relaxed text-ink-600 sm:px-6">
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
    <Section className="py-12 sm:py-16">
      {block.heading ? (
        <SectionHeader title={String(block.heading)} />
      ) : null}
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <li
            key={t.id ?? i}
            className="relative rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover sm:p-7"
          >
            <Quote
              aria-hidden
              className="absolute right-5 top-5 h-8 w-8 text-brand-100"
            />
            <div
              aria-label={`${t.rating ?? 5} su 5 stelle`}
              className="flex items-center gap-0.5"
            >
              {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                <Star
                  key={k}
                  aria-hidden
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <blockquote className="relative mt-4 text-sm leading-relaxed text-ink-800">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-5 border-t border-ink-100 pt-4 text-sm">
              <strong className="font-display font-bold text-ink-900">
                {t.author}
              </strong>
              {t.role ? (
                <span className="text-ink-500"> · {t.role}</span>
              ) : null}
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
