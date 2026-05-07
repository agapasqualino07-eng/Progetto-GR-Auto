import Link from 'next/link'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Section className="py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Pagina non trovata
      </h1>
      <p className="mt-3 text-ink-700">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link href="/veicoli">Vedi i veicoli</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Torna alla home</Link>
        </Button>
      </div>
    </Section>
  )
}
