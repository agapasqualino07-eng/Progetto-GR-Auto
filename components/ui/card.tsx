import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-ink-200 bg-white shadow-card transition-all duration-200',
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
  <div ref={ref} className={cn('p-5 sm:p-6', className)} {...props} />
))
CardBody.displayName = 'CardBody'
