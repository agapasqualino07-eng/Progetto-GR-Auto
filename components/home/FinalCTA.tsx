import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white shadow-card-hover sm:p-12 lg:p-16">
      {/* Glow rossi */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_25%,rgba(239,68,68,0.30),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_15%_85%,rgba(239,68,68,0.15),transparent_60%)]"
      />
      {/* Pattern grid sottile */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
            Parliamone
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Vuoi parlare con noi prima di scegliere?
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Raccontaci cosa cerchi: marca, budget, finalità d&apos;uso. Ti
            chiamiamo noi con due o tre proposte realmente disponibili.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button asChild size="lg">
            <Link href="/contatti">
              <Phone className="h-4 w-4" />
              Scrivici
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white text-ink-900 shadow-card hover:bg-white/90"
          >
            <Link href="/veicoli">
              Sfoglia il catalogo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
