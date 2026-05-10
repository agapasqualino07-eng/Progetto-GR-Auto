'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCw, Home } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section className="grid place-items-center py-20 text-center sm:py-28">
      <div className="max-w-lg">
        <span className="grid h-16 w-16 place-items-center mx-auto rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
          <AlertTriangle className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Qualcosa non ha funzionato
        </h1>
        <p className="mt-4 text-base text-ink-600">
          Stiamo cercando di capire cosa è successo. Riprova fra qualche
          istante o torna alla home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} size="lg">
            <RotateCw className="h-4 w-4" />
            Riprova
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/">
              <Home className="h-4 w-4" />
              Torna alla home
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
