'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, BadgeCheck, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import type { Make } from '@/payload-types'
import { fuelLabels } from '@/lib/utils/labels'

const priceOptions = [10000, 15000, 20000, 25000, 30000, 40000, 60000]

const trustBadges = [
  { icon: ShieldCheck, label: 'Garanzia inclusa' },
  { icon: BadgeCheck, label: 'Veicoli controllati' },
  { icon: Wallet, label: 'Finanziamento su misura' },
]

export function Hero({
  makes,
  totalCount,
}: {
  makes: Make[]
  totalCount: number
}) {
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
    <section className="relative overflow-hidden bg-ink-900 text-white">
      {/* Texture / glow di sfondo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_15%,rgba(239,68,68,0.25),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_80%,rgba(239,68,68,0.10),transparent_60%)]"
      />
      {/* Pattern grid sottile */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 lg:pr-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-600/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-300 ring-1 ring-inset ring-brand-500/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            {totalCount} veicoli pronti consegna
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            La tua prossima auto,{' '}
            <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              già selezionata
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Auto usate, km 0 e aziendali controllate punto per punto. Garanzia,
            finanziamento su misura e permuta valutata in giornata.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {trustBadges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-2 text-white/85"
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-white/5 text-brand-400 ring-1 ring-inset ring-white/10">
                  <b.icon className="h-4 w-4" />
                </span>
                <span className="font-semibold">{b.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={onSubmit}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl bg-white/95 p-6 text-ink-900 shadow-card-hover ring-1 ring-black/5 backdrop-blur sm:p-7">
            <div className="flex items-center justify-between">
              <div className="font-display text-lg font-bold">
                Trova la tua auto
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                Cerca ora
              </span>
            </div>
            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">
                  Marca
                </span>
                <Select
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  aria-label="Marca"
                >
                  <option value="">Tutte le marche</option>
                  {makes.map((m) => (
                    <option key={m.id} value={m.slug}>
                      {m.name}
                    </option>
                  ))}
                </Select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-ink-700">
                    Prezzo massimo
                  </span>
                  <Select
                    value={prezzoMax}
                    onChange={(e) => setPrezzoMax(e.target.value)}
                    aria-label="Prezzo massimo"
                  >
                    <option value="">Qualsiasi</option>
                    {priceOptions.map((p) => (
                      <option key={p} value={p}>
                        fino a € {p.toLocaleString('it-IT')}
                      </option>
                    ))}
                  </Select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-ink-700">
                    Alimentazione
                  </span>
                  <Select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    aria-label="Alimentazione"
                  >
                    <option value="">Tutte</option>
                    {Object.entries(fuelLabels).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </Select>
                </label>
              </div>
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full">
              <Search className="h-4 w-4" />
              Cerca veicoli
            </Button>
            <p className="mt-3 text-center text-xs text-ink-500">
              Più di {totalCount} veicoli pronti consegna in stock
            </p>
          </div>
        </motion.form>
      </div>

      {/* Bordo decorativo in basso */}
      <div
        aria-hidden
        className="relative h-px w-full bg-gradient-to-r from-transparent via-brand-600/40 to-transparent"
      />
    </section>
  )
}
