'use client'

import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'
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
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-5 py-3">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-600 text-white">
          <Calculator className="h-4 w-4" />
        </span>
        <h3 className="font-display text-sm font-bold text-ink-900">
          Calcola la rata
        </h3>
      </div>
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-ink-700">
              Anticipo (%)
            </span>
            <Input
              type="number"
              min={0}
              max={90}
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value || 0))}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-ink-700">
              Durata
            </span>
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
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink-600">Anticipo</dt>
            <dd className="font-semibold tabular-nums text-ink-900">
              {formatPrice(result.down)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-600">Capitale finanziato</dt>
            <dd className="font-semibold tabular-nums text-ink-900">
              {formatPrice(result.principal)}
            </dd>
          </div>
          <div className="flex items-end justify-between rounded-xl bg-brand-50 px-4 py-3 ring-1 ring-inset ring-brand-100">
            <dt className="font-display text-sm font-bold text-ink-900">
              Rata mensile
            </dt>
            <dd className="font-display text-2xl font-extrabold tabular-nums text-brand-700">
              {formatPrice(result.monthly)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-[11px] leading-relaxed text-ink-500">
          TAN {settings.defaultTan}% · TAEG {settings.defaultTaeg}%.{' '}
          {settings.disclaimer}
        </p>
      </div>
    </div>
  )
}
