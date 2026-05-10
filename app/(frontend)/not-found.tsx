import Link from 'next/link'
import { Compass, Home } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Section className="grid place-items-center py-20 text-center sm:py-28">
      <div className="max-w-lg">
        <div className="font-display text-[7rem] font-extrabold leading-none tracking-tighter text-ink-100 sm:text-[10rem]">
          <span className="bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="-mt-2 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Pagina non trovata
        </h1>
        <p className="mt-4 text-base text-ink-600">
          La pagina che stai cercando non esiste o è stata spostata. Forse
          quello che cerchi è nel catalogo.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/veicoli">
              <Compass className="h-4 w-4" />
              Sfoglia il catalogo
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" />
              Torna alla home
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
