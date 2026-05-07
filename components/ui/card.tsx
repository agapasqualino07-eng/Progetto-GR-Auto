import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-ink-200 bg-white shadow-xs transition-shadow',
      className,
    )}
    {...props}
  />
))
Card.displayName = 'Card'

export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5', className)} {...props} />
))
CardBody.displayName = 'CardBody'
