'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import type { Make } from '@/payload-types'
import { fuelLabels } from '@/lib/utils/labels'

const priceOptions = [10000, 15000, 20000, 25000, 30000, 40000, 60000]

export function Hero({ makes, totalCount }: { makes: Make[]; totalCount: number }) {
  const router = useRouter()
  const [marca, setMarca] = useState('')
  const [prezzoMax, setPrezzoMax] = useState('')
  const [fuel, setFuel] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (marca) params.set('marca', marca)
    if (prezzoMax) params.set('prezzo_max', prezzoMax)
    if (fuel) params.set('alimentazione', fuel)
    router.push(`/veicoli?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-ink-900 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:py-28">
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-inset ring-white/20">
            {totalCount} veicoli pronti consegna
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            La tua prossima auto, già selezionata.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-white/85 sm:text-lg">
            Auto usate, km 0 e aziendali controllate punto per punto. Garanzia,
            finanziamento su misura e permuta valutata in giornata.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex-1 rounded-2xl border border-white/10 bg-white/95 p-5 text-ink-900 shadow-2xl ring-1 ring-black/5 backdrop-blur sm:p-6"
        >
          <div className="text-sm font-semibold text-ink-900">Trova la tua auto</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="block text-xs">
              <span className="mb-1 block text-ink-700">Marca</span>
              <Select value={marca} onChange={(e) => setMarca(e.target.value)}>
                <option value="">Tutte</option>
                {makes.map((m) => (
                  <option key={m.id} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </Select>
            </label>
            <label className="block text-xs">
              <span className="mb-1 block text-ink-700">Prezzo massimo</span>
              <Select
                value={prezzoMax}
                onChange={(e) => setPrezzoMax(e.target.value)}
              >
                <option value="">Qualsiasi</option>
                {priceOptions.map((p) => (
                  <option key={p} value={p}>
                    fino a € {p.toLocaleString('it-IT')}
                  </option>
                ))}
              </Select>
            </label>
            <label className="block text-xs">
              <span className="mb-1 block text-ink-700">Alimentazione</span>
              <Select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option value="">Tutte</option>
                {Object.entries(fuelLabels).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </Select>
            </label>
          </div>
          <Button type="submit" size="lg" className="mt-5 w-full">
            <Search className="h-4 w-4" />
            Cerca veicoli
          </Button>
        </form>
      </div>
    </section>
  )
}
