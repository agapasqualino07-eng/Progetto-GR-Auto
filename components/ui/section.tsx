import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-10 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base text-ink-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
