'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'
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
  const list = (k: string) => (sp.get(k)?.split(',').filter(Boolean) ?? [])
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

function CheckboxGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: string; label: string }[]
  value: string[]
  onChange: (next: string[]) => void
}) {
  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  return (
    <div>
      <div className="text-sm font-semibold text-ink-900">{label}</div>
      <ul className="mt-2 space-y-1.5">
        {options.map((o) => (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                checked={value.includes(o.value)}
                onChange={() => toggle(o.value)}
              />
              {o.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
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

  const reset = () => {
    setFilters(empty)
    setSort('recenti')
    setPage(1)
  }

  const Sidebar = (
    <aside className="space-y-6">
      <div>
        <Input
          placeholder="Cerca per modello, allestimento…"
          value={filters.q}
          onChange={(e) => {
            setFilters({ ...filters, q: e.target.value })
            setPage(1)
          }}
        />
      </div>

      <div>
        <div className="text-sm font-semibold text-ink-900">Marca</div>
        <Select
          className="mt-2"
          value={filters.marca}
          onChange={(e) => {
            setFilters({ ...filters, marca: e.target.value, modello: '' })
            setPage(1)
          }}
        >
          <option value="">Tutte</option>
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
      </div>

      <div>
        <div className="text-sm font-semibold text-ink-900">Prezzo (€)</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
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
      </div>

      <div>
        <div className="text-sm font-semibold text-ink-900">Anno</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
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
      </div>

      <div>
        <div className="text-sm font-semibold text-ink-900">Chilometri max</div>
        <Input
          className="mt-2"
          type="number"
          placeholder="es. 80000"
          value={filters.kmMax}
          onChange={(e) => setFilters({ ...filters, kmMax: e.target.value })}
        />
      </div>

      <CheckboxGroup
        label="Alimentazione"
        options={Object.entries(fuelLabels).map(([v, l]) => ({ value: v, label: l }))}
        value={filters.fuel}
        onChange={(next) => {
          setFilters({ ...filters, fuel: next })
          setPage(1)
        }}
      />

      <CheckboxGroup
        label="Cambio"
        options={Object.entries(transmissionLabels).map(([v, l]) => ({ value: v, label: l }))}
        value={filters.transmission}
        onChange={(next) => {
          setFilters({ ...filters, transmission: next })
          setPage(1)
        }}
      />

      <CheckboxGroup
        label="Carrozzeria"
        options={Object.entries(bodyTypeLabels).map(([v, l]) => ({ value: v, label: l }))}
        value={filters.bodyType}
        onChange={(next) => {
          setFilters({ ...filters, bodyType: next })
          setPage(1)
        }}
      />

      <CheckboxGroup
        label="Condizione"
        options={Object.entries(conditionLabels).map(([v, l]) => ({ value: v, label: l }))}
        value={filters.condition}
        onChange={(next) => {
          setFilters({ ...filters, condition: next })
          setPage(1)
        }}
      />

      <Button variant="ghost" size="sm" onClick={reset}>
        Azzera filtri
      </Button>
    </aside>
  )

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <div className="sticky top-20">{Sidebar}</div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-ink-700">
            <strong className="text-ink-900">{filtered.length}</strong> veicoli
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
            </Button>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Ordina"
              className="w-auto min-w-[180px]"
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
          <div className="mt-10 rounded-xl border border-dashed border-ink-200 p-10 text-center">
            <p className="text-ink-700">
              Nessun veicolo corrisponde ai filtri selezionati.
            </p>
            <Button onClick={reset} variant="outline" className="mt-4">
              Azzera filtri
            </Button>
          </div>
        ) : (
          <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
              Precedente
            </Button>
            <span className="text-sm text-ink-700">
              Pagina {safePage} di {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Successiva
            </Button>
          </nav>
        ) : null}
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className={cn('absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl')}>
            <div className="mb-4 flex items-center justify-between">
              <strong>Filtri</strong>
              <button
                aria-label="Chiudi filtri"
                onClick={() => setDrawerOpen(false)}
                className="rounded-md p-2 hover:bg-ink-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {Sidebar}
            <div className="mt-6">
              <Button className="w-full" onClick={() => setDrawerOpen(false)}>
                Mostra {filtered.length} veicoli
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
