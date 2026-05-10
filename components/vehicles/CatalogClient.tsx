'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
  Inbox,
} from 'lucide-react'
import Fuse from 'fuse.js'
import { VehicleCard } from './VehicleCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils/cn'
import { vehicleYear } from '@/lib/utils/vehicle'
import {
  bodyTypeLabels,
  conditionLabels,
  fuelLabels,
  transmissionLabels,
} from '@/lib/utils/labels'
import type { Make, Vehicle } from '@/payload-types'

const PAGE_SIZE = 12

type SortKey =
  | 'recenti'
  | 'prezzo-asc'
  | 'prezzo-desc'
  | 'km-asc'
  | 'anno-desc'

type Filters = {
  q: string
  marca: string
  modello: string
  prezzoMin: string
  prezzoMax: string
  annoMin: string
  annoMax: string
  kmMax: string
  fuel: string[]
  transmission: string[]
  bodyType: string[]
  condition: string[]
}

const empty: Filters = {
  q: '',
  marca: '',
  modello: '',
  prezzoMin: '',
  prezzoMax: '',
  annoMin: '',
  annoMax: '',
  kmMax: '',
  fuel: [],
  transmission: [],
  bodyType: [],
  condition: [],
}

function readFromUrl(sp: URLSearchParams): Filters {
  const list = (k: string) => sp.get(k)?.split(',').filter(Boolean) ?? []
  return {
    q: sp.get('q') ?? '',
    marca: sp.get('marca') ?? '',
    modello: sp.get('modello') ?? '',
    prezzoMin: sp.get('prezzo_min') ?? '',
    prezzoMax: sp.get('prezzo_max') ?? '',
    annoMin: sp.get('anno_min') ?? '',
    annoMax: sp.get('anno_max') ?? '',
    kmMax: sp.get('km_max') ?? '',
    fuel: list('alimentazione'),
    transmission: list('cambio'),
    bodyType: list('carrozzeria'),
    condition: list('condizione'),
  }
}

function writeToUrl(filters: Filters, sort: SortKey, page: number) {
  const sp = new URLSearchParams()
  if (filters.q) sp.set('q', filters.q)
  if (filters.marca) sp.set('marca', filters.marca)
  if (filters.modello) sp.set('modello', filters.modello)
  if (filters.prezzoMin) sp.set('prezzo_min', filters.prezzoMin)
  if (filters.prezzoMax) sp.set('prezzo_max', filters.prezzoMax)
  if (filters.annoMin) sp.set('anno_min', filters.annoMin)
  if (filters.annoMax) sp.set('anno_max', filters.annoMax)
  if (filters.kmMax) sp.set('km_max', filters.kmMax)
  if (filters.fuel.length) sp.set('alimentazione', filters.fuel.join(','))
  if (filters.transmission.length)
    sp.set('cambio', filters.transmission.join(','))
  if (filters.bodyType.length)
    sp.set('carrozzeria', filters.bodyType.join(','))
  if (filters.condition.length)
    sp.set('condizione', filters.condition.join(','))
  if (sort !== 'recenti') sp.set('ordine', sort)
  if (page > 1) sp.set('p', String(page))
  return sp.toString()
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-ink-100 pt-5 first:border-0 first:pt-0">
      <div className="mb-3 font-display text-sm font-bold text-ink-900">
        {title}
      </div>
      {children}
    </div>
  )
}

function CheckboxGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[]
  value: string[]
  onChange: (next: string[]) => void
}) {
  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  return (
    <ul className="space-y-2">
      {options.map((o) => {
        const checked = value.includes(o.value)
        return (
          <li key={o.value}>
            <label
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-ink-700 transition-colors hover:bg-ink-50',
                checked && 'text-ink-900',
              )}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-0"
                checked={checked}
                onChange={() => toggle(o.value)}
              />
              <span className={checked ? 'font-semibold' : ''}>{o.label}</span>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

export function CatalogClient({
  vehicles,
  makes,
}: {
  vehicles: Vehicle[]
  makes: Make[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Filters>(empty)
  const [sort, setSort] = useState<SortKey>('recenti')
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hydrate from URL on first render
  useEffect(() => {
    setFilters(readFromUrl(searchParams))
    const s = searchParams.get('ordine') as SortKey | null
    if (s) setSort(s)
    const p = parseInt(searchParams.get('p') ?? '1', 10)
    if (p > 1) setPage(p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push state changes to URL
  useEffect(() => {
    const qs = writeToUrl(filters, sort, page)
    router.replace(`/veicoli${qs ? `?${qs}` : ''}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, page])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const fuse = useMemo(
    () =>
      new Fuse(vehicles, {
        keys: ['title', 'model', 'trim', 'internalCode'],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [vehicles],
  )

  const modelsForMake = useMemo(() => {
    if (!filters.marca) return []
    const set = new Set<string>()
    vehicles.forEach((v) => {
      const make = typeof v.make === 'object' ? v.make : null
      if (make && (make as Make).slug === filters.marca && v.model) {
        set.add(v.model)
      }
    })
    return Array.from(set).sort()
  }, [vehicles, filters.marca])

  const filtered = useMemo(() => {
    let list = filters.q
      ? fuse.search(filters.q).map((r) => r.item)
      : vehicles.slice()

    list = list.filter((v) => {
      const make = (typeof v.make === 'object' ? v.make : null) as Make | null
      if (filters.marca && make?.slug !== filters.marca) return false
      if (filters.modello && v.model !== filters.modello) return false
      if (filters.prezzoMin && v.price < +filters.prezzoMin) return false
      if (filters.prezzoMax && v.price > +filters.prezzoMax) return false
      const year = vehicleYear(v) ?? 0
      if (filters.annoMin && year < +filters.annoMin) return false
      if (filters.annoMax && year > +filters.annoMax) return false
      if (filters.kmMax && v.mileage > +filters.kmMax) return false
      if (filters.fuel.length && !filters.fuel.includes(v.fuel as string))
        return false
      if (
        filters.transmission.length &&
        !filters.transmission.includes(v.transmission as string)
      )
        return false
      if (
        filters.bodyType.length &&
        !filters.bodyType.includes(v.bodyType as string)
      )
        return false
      if (
        filters.condition.length &&
        !filters.condition.includes(v.condition as string)
      )
        return false
      return true
    })

    switch (sort) {
      case 'prezzo-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'prezzo-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'km-asc':
        list.sort((a, b) => a.mileage - b.mileage)
        break
      case 'anno-desc':
        list.sort((a, b) => (vehicleYear(b) ?? 0) - (vehicleYear(a) ?? 0))
        break
      default:
        list.sort(
          (a, b) =>
            new Date(b.updatedAt ?? 0).getTime() -
            new Date(a.updatedAt ?? 0).getTime(),
        )
    }
    return list
  }, [vehicles, fuse, filters, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  // Conta filtri attivi (per badge sul bottone mobile)
  const activeFiltersCount =
    (filters.q ? 1 : 0) +
    (filters.marca ? 1 : 0) +
    (filters.modello ? 1 : 0) +
    (filters.prezzoMin ? 1 : 0) +
    (filters.prezzoMax ? 1 : 0) +
    (filters.annoMin ? 1 : 0) +
    (filters.annoMax ? 1 : 0) +
    (filters.kmMax ? 1 : 0) +
    filters.fuel.length +
    filters.transmission.length +
    filters.bodyType.length +
    filters.condition.length

  const reset = () => {
    setFilters(empty)
    setSort('recenti')
    setPage(1)
  }

  const Sidebar = (
    <div className="space-y-5">
      <FilterSection title="Cerca">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <Input
            placeholder="Modello, allestimento…"
            className="pl-10"
            value={filters.q}
            onChange={(e) => {
              setFilters({ ...filters, q: e.target.value })
              setPage(1)
            }}
          />
        </div>
      </FilterSection>

      <FilterSection title="Marca">
        <Select
          value={filters.marca}
          onChange={(e) => {
            setFilters({ ...filters, marca: e.target.value, modello: '' })
            setPage(1)
          }}
        >
          <option value="">Tutte le marche</option>
          {makes.map((m) => (
            <option key={m.id} value={m.slug}>
              {m.name}
            </option>
          ))}
        </Select>
        {modelsForMake.length > 0 ? (
          <Select
            className="mt-2"
            value={filters.modello}
            onChange={(e) => {
              setFilters({ ...filters, modello: e.target.value })
              setPage(1)
            }}
          >
            <option value="">Tutti i modelli</option>
            {modelsForMake.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        ) : null}
      </FilterSection>

      <FilterSection title="Prezzo (€)">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            inputMode="numeric"
            value={filters.prezzoMin}
            onChange={(e) =>
              setFilters({ ...filters, prezzoMin: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Max"
            inputMode="numeric"
            value={filters.prezzoMax}
            onChange={(e) =>
              setFilters({ ...filters, prezzoMax: e.target.value })
            }
          />
        </div>
      </FilterSection>

      <FilterSection title="Anno">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Da"
            value={filters.annoMin}
            onChange={(e) =>
              setFilters({ ...filters, annoMin: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="A"
            value={filters.annoMax}
            onChange={(e) =>
              setFilters({ ...filters, annoMax: e.target.value })
            }
          />
        </div>
      </FilterSection>

      <FilterSection title="Chilometri max">
        <Input
          type="number"
          placeholder="es. 80.000"
          value={filters.kmMax}
          onChange={(e) => setFilters({ ...filters, kmMax: e.target.value })}
        />
      </FilterSection>

      <FilterSection title="Alimentazione">
        <CheckboxGroup
          options={Object.entries(fuelLabels).map(([v, l]) => ({
            value: v,
            label: l,
          }))}
          value={filters.fuel}
          onChange={(next) => {
            setFilters({ ...filters, fuel: next })
            setPage(1)
          }}
        />
      </FilterSection>

      <FilterSection title="Cambio">
        <CheckboxGroup
          options={Object.entries(transmissionLabels).map(([v, l]) => ({
            value: v,
            label: l,
          }))}
          value={filters.transmission}
          onChange={(next) => {
            setFilters({ ...filters, transmission: next })
            setPage(1)
          }}
        />
      </FilterSection>

      <FilterSection title="Carrozzeria">
        <CheckboxGroup
          options={Object.entries(bodyTypeLabels).map(([v, l]) => ({
            value: v,
            label: l,
          }))}
          value={filters.bodyType}
          onChange={(next) => {
            setFilters({ ...filters, bodyType: next })
            setPage(1)
          }}
        />
      </FilterSection>

      <FilterSection title="Condizione">
        <CheckboxGroup
          options={Object.entries(conditionLabels).map(([v, l]) => ({
            value: v,
            label: l,
          }))}
          value={filters.condition}
          onChange={(next) => {
            setFilters({ ...filters, condition: next })
            setPage(1)
          }}
        />
      </FilterSection>

      {activeFiltersCount > 0 ? (
        <div className="border-t border-ink-100 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="w-full"
          >
            <X className="h-4 w-4" />
            Azzera filtri ({activeFiltersCount})
          </Button>
        </div>
      ) : null}
    </div>
  )

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block" aria-label="Filtri">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-brand-600" />
            <span className="font-display text-base font-bold text-ink-900">
              Filtra
            </span>
            {activeFiltersCount > 0 ? (
              <span className="ml-auto inline-flex items-center justify-center rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">
                {activeFiltersCount}
              </span>
            ) : null}
          </div>
          {Sidebar}
        </div>
      </aside>

      {/* Main */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 shadow-card">
          <div className="text-sm text-ink-700">
            <strong className="font-display text-lg font-extrabold text-ink-900 tabular-nums">
              {filtered.length}
            </strong>{' '}
            <span className="text-ink-500">
              {filtered.length === 1 ? 'veicolo trovato' : 'veicoli trovati'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filtri
              {activeFiltersCount > 0 ? (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {activeFiltersCount}
                </span>
              ) : null}
            </Button>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Ordina"
              className="h-10 w-auto min-w-[180px]"
            >
              <option value="recenti">Più recenti</option>
              <option value="prezzo-asc">Prezzo crescente</option>
              <option value="prezzo-desc">Prezzo decrescente</option>
              <option value="km-asc">Km crescenti</option>
              <option value="anno-desc">Anno più recente</option>
            </Select>
          </div>
        </div>

        {paged.length === 0 ? (
          <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-12 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-card">
              <Inbox className="h-6 w-6 text-ink-400" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
              Nessun veicolo trovato
            </h3>
            <p className="mt-1 max-w-sm text-sm text-ink-600">
              Nessun veicolo corrisponde ai filtri selezionati. Prova ad
              allargare i criteri.
            </p>
            <Button onClick={reset} variant="primary" className="mt-5">
              <X className="h-4 w-4" />
              Azzera filtri
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paged.map((v) => (
              <li key={v.id} className="h-full">
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 ? (
          <nav
            aria-label="Paginazione"
            className="mt-10 flex items-center justify-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
              Precedente
            </Button>
            <span className="rounded-md bg-ink-100 px-3 py-1.5 text-sm font-semibold tabular-nums text-ink-900">
              {safePage} <span className="text-ink-500">/ {totalPages}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Successiva
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        ) : null}
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            key="drawer-wrap"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-[92%] max-w-md flex-col bg-white shadow-card-hover"
              role="dialog"
              aria-modal="true"
              aria-label="Filtri"
            >
              <div className="flex items-center justify-between border-b border-ink-200 p-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-brand-600" />
                  <strong className="font-display text-base font-bold">
                    Filtri
                  </strong>
                  {activeFiltersCount > 0 ? (
                    <span className="inline-flex items-center justify-center rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">
                      {activeFiltersCount}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="Chiudi filtri"
                  onClick={() => setDrawerOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg hover:bg-ink-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{Sidebar}</div>
              <div className="border-t border-ink-200 p-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  Mostra {filtered.length}{' '}
                  {filtered.length === 1 ? 'veicolo' : 'veicoli'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
