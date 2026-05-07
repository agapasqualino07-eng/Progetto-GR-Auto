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
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn('mb-8 max-w-3xl', className)}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-base text-ink-700">{description}</p>
      ) : null}
    </div>
  )
}
