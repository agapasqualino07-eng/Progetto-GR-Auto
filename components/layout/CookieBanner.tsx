'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const KEY = 'cookie-ack-v1'

export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!localStorage.getItem(KEY)) setOpen(true)
  }, [])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="Informativa cookie"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-xl border border-ink-200 bg-white p-4 shadow-lg sm:p-5"
    >
      <p className="text-sm text-ink-900">
        Usiamo solo cookie tecnici essenziali e statistiche aggregate anonime,
        senza raccolta di dati personali. Maggiori informazioni nella{' '}
        <Link className="underline" href="/cookie">cookie policy</Link>.
      </p>
      <div className="mt-3 flex justify-end">
        <Button
          size="sm"
          onClick={() => {
            localStorage.setItem(KEY, '1')
            setOpen(false)
          }}
        >
          Ho capito
        </Button>
      </div>
    </div>
  )
}
