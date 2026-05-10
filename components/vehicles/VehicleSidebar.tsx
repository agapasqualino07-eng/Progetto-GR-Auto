'use client'

import { useState } from 'react'
import { MessageSquare, Phone, CalendarCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LeadForm } from '@/components/forms/LeadForm'
import { formatPrice } from '@/lib/utils/format'
import { statusLabels } from '@/lib/utils/labels'
import type { Vehicle } from '@/payload-types'

type Mode = 'closed' | 'info' | 'test-drive'

export function VehicleSidebar({
  vehicle,
  whatsapp,
}: {
  vehicle: Vehicle
  whatsapp?: string | null
}) {
  const [mode, setMode] = useState<Mode>('closed')
  const status = statusLabels[vehicle.availability as keyof typeof statusLabels]
  const isSold = vehicle.availability === 'sold'

  const waMessage = encodeURIComponent(
    `Buongiorno, sono interessato/a a ${vehicle.title} (€ ${vehicle.price.toLocaleString('it-IT')}). Posso avere maggiori informazioni?`,
  )
  const waUrl = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${waMessage}`
    : undefined

  return (
    <aside className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
        {/* Header con badge stato */}
        {status ? (
          <div className="border-b border-ink-100 bg-ink-50 px-5 py-3">
            <Badge tone={status.tone}>{status.label}</Badge>
          </div>
        ) : null}

        <div className="p-5 sm:p-6">
          {/* Prezzo */}
          {vehicle.priceStrikethrough ? (
            <div className="text-sm font-medium text-ink-400 line-through tabular-nums">
              {formatPrice(vehicle.priceStrikethrough)}
            </div>
          ) : null}
          <div className="font-display text-4xl font-extrabold leading-none text-ink-900 tabular-nums">
            {formatPrice(vehicle.price)}
          </div>
          {vehicle.vatDeductible ? (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              IVA esposta detraibile
            </div>
          ) : null}
          {vehicle.financingMonthly ? (
            <div className="mt-3 flex items-baseline gap-2 text-sm">
              <span className="text-ink-500">o da</span>
              <span className="font-display text-xl font-extrabold text-brand-600 tabular-nums">
                {formatPrice(vehicle.financingMonthly)}
              </span>
              <span className="text-sm font-medium text-ink-500">/mese</span>
            </div>
          ) : null}

          {/* CTA stack */}
          <div className="mt-6 grid gap-2.5">
            <Button
              size="lg"
              onClick={() => setMode('info')}
              disabled={isSold}
              aria-expanded={mode === 'info'}
              aria-controls="vehicle-lead-form"
            >
              <MessageSquare className="h-4 w-4" />
              {isSold ? 'Veicolo venduto' : 'Richiedi informazioni'}
            </Button>
            {!isSold ? (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setMode('test-drive')}
                aria-expanded={mode === 'test-drive'}
                aria-controls="vehicle-lead-form"
              >
                <CalendarCheck className="h-4 w-4" />
                Prenota test drive
              </Button>
            ) : null}
            {waUrl && !isSold ? (
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.30)] hover:bg-emerald-700"
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-4 w-4" />
                  Scrivi su WhatsApp
                </a>
              </Button>
            ) : null}
          </div>

          {/* Trust micro-list */}
          <ul className="mt-6 space-y-1.5 border-t border-ink-100 pt-5 text-xs text-ink-600">
            <li className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                ✓
              </span>
              Garanzia inclusa
            </li>
            <li className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                ✓
              </span>
              Permuta valutata gratuitamente
            </li>
            <li className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                ✓
              </span>
              Finanziamento personalizzato
            </li>
          </ul>
        </div>
      </div>

      {/* Form drop-down */}
      {mode !== 'closed' ? (
        <div
          id="vehicle-lead-form"
          role="region"
          aria-label={mode === 'info' ? 'Richiedi informazioni' : 'Prenota test drive'}
          className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <strong className="font-display text-base font-bold text-ink-900">
              {mode === 'info' ? 'Richiedi informazioni' : 'Prenota test drive'}
            </strong>
            <button
              type="button"
              onClick={() => setMode('closed')}
              aria-label="Chiudi form"
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <LeadForm
            type={mode === 'info' ? 'info' : 'test-drive'}
            vehicleId={vehicle.id}
            submitLabel={
              mode === 'info' ? 'Invia richiesta' : 'Richiedi appuntamento'
            }
            successText={
              mode === 'info'
                ? 'Grazie! Ti ricontattiamo a breve.'
                : "Test drive richiesto. Ti chiamiamo per confermare l'appuntamento."
            }
          />
        </div>
      ) : null}
    </aside>
  )
}
