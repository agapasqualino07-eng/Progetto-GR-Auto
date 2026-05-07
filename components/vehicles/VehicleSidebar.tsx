'use client'

import { useState } from 'react'
import { MessageSquare, Phone, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeadForm } from '@/components/forms/LeadForm'
import { formatPrice } from '@/lib/utils/format'
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

  const waMessage = encodeURIComponent(
    `Buongiorno, sono interessato/a a ${vehicle.title} (€ ${vehicle.price.toLocaleString('it-IT')}). Posso avere maggiori informazioni?`,
  )
  const waUrl = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${waMessage}`
    : undefined

  return (
    <aside className="space-y-4">
      <div className="rounded-xl border border-ink-200 bg-white p-5">
        {vehicle.priceStrikethrough ? (
          <div className="text-sm text-ink-500 line-through">
            {formatPrice(vehicle.priceStrikethrough)}
          </div>
        ) : null}
        <div className="text-3xl font-bold tabular-nums text-ink-900">
          {formatPrice(vehicle.price)}
        </div>
        {vehicle.vatDeductible ? (
          <div className="mt-1 text-xs font-medium text-emerald-700">
            IVA esposta detraibile
          </div>
        ) : null}
        {vehicle.financingMonthly ? (
          <div className="mt-2 text-sm text-ink-700">
            o da{' '}
            <strong className="text-ink-900">
              {formatPrice(vehicle.financingMonthly)}/mese
            </strong>
          </div>
        ) : null}

        <div className="mt-5 grid gap-2">
          <Button onClick={() => setMode('info')}>
            <MessageSquare className="h-4 w-4" />
            Richiedi informazioni
          </Button>
          <Button variant="outline" onClick={() => setMode('test-drive')}>
            <CalendarCheck className="h-4 w-4" />
            Prenota test drive
          </Button>
          {waUrl ? (
            <Button asChild variant="secondary">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      {mode !== 'closed' ? (
        <div className="rounded-xl border border-ink-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <strong className="text-sm">
              {mode === 'info' ? 'Richiedi informazioni' : 'Prenota test drive'}
            </strong>
            <button
              type="button"
              onClick={() => setMode('closed')}
              className="text-xs text-ink-500 hover:text-ink-900"
            >
              Chiudi
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
                : 'Test drive richiesto. Ti chiamiamo per confermare l\'appuntamento.'
            }
          />
        </div>
      ) : null}
    </aside>
  )
}
