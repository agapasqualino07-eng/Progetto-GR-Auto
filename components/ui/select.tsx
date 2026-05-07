import * as React from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Select nativo, semplice. Per la quantità di dati prevista (50 veicoli) e
 * per accessibilità garantita, usiamo l'elemento <select> nativo.
 */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full appearance-none rounded-md border border-ink-200 bg-white pl-3 pr-9 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50',
        'bg-[length:18px_18px] bg-no-repeat bg-[position:calc(100%-8px)_center]',
        'bg-[image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%274,6 8,10 12,6%27/%3E%3C/svg%3E")]',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
)
Select.displayName = 'Select'
