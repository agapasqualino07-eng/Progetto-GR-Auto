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
      <div
        role="tablist"
        className="flex flex-wrap gap-1 border-b border-ink-200"
      >
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={`tab-${it.id}`}
            aria-selected={active === it.id}
            aria-controls={`tabpanel-${it.id}`}
            tabIndex={active === it.id ? 0 : -1}
            onClick={() => setActive(it.id)}
            className={cn(
              'relative -mb-px rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors',
              active === it.id
                ? 'text-ink-900'
                : 'text-ink-500 hover:text-ink-900',
            )}
          >
            {it.label}
            {active === it.id ? (
              <span
                aria-hidden
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-600"
              />
            ) : null}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {items.map((it) => (
          <div
            key={it.id}
            id={`tabpanel-${it.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${it.id}`}
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
