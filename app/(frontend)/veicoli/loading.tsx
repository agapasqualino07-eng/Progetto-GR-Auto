import { Section } from '@/components/ui/section'

export default function Loading() {
  return (
    <Section className="py-12 sm:py-16">
      <div className="mb-8 max-w-3xl">
        <div className="h-4 w-24 animate-pulse rounded bg-ink-100" />
        <div className="mt-3 h-9 w-3/4 animate-pulse rounded bg-ink-100" />
        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-ink-100" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-full animate-pulse rounded bg-ink-100" />
            ))}
          </div>
        </div>
        <div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i}>
                <div className="rounded-xl border border-ink-200 bg-white">
                  <div className="aspect-[4/3] animate-pulse rounded-t-xl bg-ink-100" />
                  <div className="space-y-2 p-4">
                    <div className="h-3 w-1/3 animate-pulse rounded bg-ink-100" />
                    <div className="h-5 w-3/4 animate-pulse rounded bg-ink-100" />
                    <div className="h-3 w-full animate-pulse rounded bg-ink-100" />
                    <div className="h-6 w-1/2 animate-pulse rounded bg-ink-100" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
