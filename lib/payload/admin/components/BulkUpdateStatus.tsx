'use client'

import React, { useState } from 'react'
import { useListQuery, useConfig, toast } from '@payloadcms/ui'

const STATUSES = [
  { value: 'disponibile', label: 'Disponibile' },
  { value: 'riservato', label: 'Riservato' },
  { value: 'venduto', label: 'Venduto' },
  { value: 'in-arrivo', label: 'In arrivo' },
] as const

type SelectionContext = {
  selected?: Map<string | number, boolean> | Record<string, boolean>
  count?: number
}

/**
 * Toolbar custom: permette di cambiare lo stato dei veicoli selezionati.
 * Renderizzato in `admin.components.beforeListTable` di vehicles.
 */
export const BulkUpdateStatus: React.FC = () => {
  const config = useConfig()
  const list = useListQuery() as unknown as { selectAll?: SelectionContext } & {
    refineListData?: () => void
  }
  const [next, setNext] = useState<string>('disponibile')
  const [loading, setLoading] = useState(false)

  const apiBase =
    (config?.config as { routes?: { api?: string } })?.routes?.api || '/api'

  const collectIds = (): string[] => {
    const sel = list?.selectAll?.selected
    if (!sel) return []
    if (sel instanceof Map) {
      return Array.from(sel.entries())
        .filter(([, v]) => v)
        .map(([k]) => String(k))
    }
    return Object.entries(sel)
      .filter(([, v]) => v)
      .map(([k]) => k)
  }

  const onApply = async () => {
    const ids = collectIds()
    if (ids.length === 0) {
      toast.warning('Seleziona almeno un veicolo nella lista.')
      return
    }
    if (
      !confirm(
        `Cambiare lo stato di ${ids.length} veicol${ids.length === 1 ? 'o' : 'i'} in "${
          STATUSES.find((s) => s.value === next)?.label
        }"?`,
      )
    )
      return

    setLoading(true)
    try {
      const where = encodeURIComponent(
        JSON.stringify({ id: { in: ids } }),
      )
      const res = await fetch(`${apiBase}/vehicles?where=${where}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) throw new Error(await res.text())
      toast.success(`Stato aggiornato per ${ids.length} veicoli.`)
      // Reload list
      window.location.reload()
    } catch (err) {
      console.error(err)
      toast.error('Errore durante la modifica massiva dello stato.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 0',
        borderBottom: '1px solid var(--theme-elevation-100)',
        marginBottom: 12,
        flexWrap: 'wrap',
      }}
    >
      <strong style={{ fontSize: 13 }}>Azioni massive sui selezionati:</strong>
      <label htmlFor="bulk-status" style={{ fontSize: 13 }}>
        cambia stato in
      </label>
      <select
        id="bulk-status"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        style={{
          padding: '6px 10px',
          borderRadius: 4,
          border: '1px solid var(--theme-elevation-200)',
        }}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn--style-primary btn--size-small"
        onClick={onApply}
        disabled={loading}
      >
        {loading ? 'Aggiornamento…' : 'Applica'}
      </button>
    </div>
  )
}

export default BulkUpdateStatus
