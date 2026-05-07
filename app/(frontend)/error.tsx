'use client'

import { useEffect } from 'react'
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
    <Section className="py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Qualcosa non ha funzionato
      </h1>
      <p className="mt-3 text-ink-700">
        Stiamo cercando di capire cosa è successo. Riprova fra qualche istante.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={reset}>Riprova</Button>
        <Button variant="outline" asChild>
          <a href="/">Torna alla home</a>
        </Button>
      </div>
    </Section>
  )
}
