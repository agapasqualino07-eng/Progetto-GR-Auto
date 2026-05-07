import { Section } from '@/components/ui/section'

export default function Loading() {
  return (
    <Section className="py-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="h-9 w-2/3 animate-pulse rounded bg-ink-100" />
          <div className="mt-6 aspect-[16/10] w-full animate-pulse rounded-xl bg-ink-100" />
          <div className="mt-3 flex gap-2 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 w-24 animate-pulse rounded bg-ink-100" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-ink-200 bg-white p-5">
            <div className="h-8 w-1/2 animate-pulse rounded bg-ink-100" />
            <div className="mt-4 h-10 w-full animate-pulse rounded bg-ink-100" />
            <div className="mt-2 h-10 w-full animate-pulse rounded bg-ink-100" />
          </div>
          <div className="rounded-xl border border-ink-200 bg-white p-5">
            <div className="h-4 w-2/3 animate-pulse rounded bg-ink-100" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-10 animate-pulse rounded bg-ink-100" />
              <div className="h-10 animate-pulse rounded bg-ink-100" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
