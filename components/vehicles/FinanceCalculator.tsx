'use client'

import { useMemo, useState } from 'react'
import { monthlyPayment } from '@/lib/utils/finance'
import { formatPrice } from '@/lib/utils/format'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import type { FinanceSetting } from '@/payload-types'

export function FinanceCalculator({
  price,
  settings,
}: {
  price: number
  settings: FinanceSetting
}) {
  const [downPercent, setDownPercent] = useState(
    settings.defaultDownPaymentPercent,
  )
  const [months, setMonths] = useState(settings.defaultMonths)

  const result = useMemo(() => {
    const down = (price * downPercent) / 100
    const principal = Math.max(0, price - down)
    const m = monthlyPayment({
      principal,
      annualRatePercent: settings.defaultTan,
      months,
    })
    return { down, principal, monthly: m }
  }, [price, downPercent, months, settings.defaultTan])

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-ink-900">Calcola la rata</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="block text-xs">
          <span className="mb-1 block text-ink-700">Anticipo (%)</span>
          <Input
            type="number"
            min={0}
            max={90}
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value || 0))}
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-ink-700">Durata</span>
          <Select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          >
            {(settings.availableMonths ?? []).map((m) => (
              <option key={m.id ?? m.months} value={m.months}>
                {m.months} mesi
              </option>
            ))}
          </Select>
        </label>
      </div>
      <dl className="mt-4 space-y-1.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-ink-700">Anticipo</dt>
          <dd className="font-medium tabular-nums">{formatPrice(result.down)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-700">Capitale finanziato</dt>
          <dd className="font-medium tabular-nums">
            {formatPrice(result.principal)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-ink-200 pt-2 text-base">
          <dt className="font-semibold text-ink-900">Rata mensile</dt>
          <dd className="font-bold tabular-nums text-brand-700">
            {formatPrice(result.monthly)}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-ink-500">
        TAN {settings.defaultTan}% · TAEG {settings.defaultTaeg}%.{' '}
        {settings.disclaimer}
      </p>
    </div>
  )
}
