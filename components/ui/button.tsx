import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-white shadow-cta hover:bg-brand-700 active:bg-brand-800',
        secondary:
          'bg-ink-100 text-ink-900 hover:bg-ink-200 active:bg-ink-300',
        outline:
          'border border-ink-200 bg-white text-ink-900 hover:border-ink-300 hover:bg-ink-50',
        ghost:
          'bg-transparent text-ink-900 hover:bg-ink-100',
        dark:
          'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-700',
        danger:
          'bg-brand-600 text-white shadow-cta hover:bg-brand-700 active:bg-brand-800',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-5',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
