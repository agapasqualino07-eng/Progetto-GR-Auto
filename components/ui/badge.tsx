import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider leading-none',
  {
    variants: {
      tone: {
        neutral: 'bg-ink-100 text-ink-700',
        success: 'bg-emerald-600 text-white',
        warn: 'bg-amber-500 text-white',
        danger: 'bg-brand-600 text-white',
        info: 'bg-blue-600 text-white',
        brand: 'bg-brand-600 text-white shadow-cta',
        dark: 'bg-ink-900 text-white',
        outline: 'border border-ink-300 bg-white/90 text-ink-800 backdrop-blur',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
