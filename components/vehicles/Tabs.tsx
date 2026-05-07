'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export function Tabs({
  items,
}: {
  items: { id: string; label: string; content: React.ReactNode }[]
}) {
  const [active, setActive] = useState(items[0]?.id)
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-ink-200">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={active === it.id}
            onClick={() => setActive(it.id)}
            className={cn(
              'rounded-t-md px-4 py-2 text-sm font-medium transition-colors',
              active === it.id
                ? 'border-b-2 border-brand-600 text-brand-700'
                : 'text-ink-700 hover:text-ink-900',
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="pt-5">
        {items.map((it) => (
          <div
            key={it.id}
            role="tabpanel"
            hidden={active !== it.id}
            className="text-sm"
          >
            {it.content}
          </div>
        ))}
      </div>
    </div>
  )
}
