import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white shadow-xl sm:p-12">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Vuoi parlare con noi prima di scegliere?
          </h2>
          <p className="mt-3 max-w-lg text-pretty text-base text-white/85">
            Raccontaci cosa cerchi: marca, budget, finalità d'uso. Ti chiamiamo
            noi con due o tre proposte realmente disponibili.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button asChild variant="secondary" size="lg">
            <Link href="/contatti">Scrivici</Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-brand-800 hover:bg-white/90">
            <Link href="/veicoli">Sfoglia il catalogo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
