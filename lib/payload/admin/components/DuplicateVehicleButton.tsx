'use client'

import React, { useState } from 'react'
import { useDocumentInfo, useConfig, toast } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

/**
 * Bottone "Duplica" per la edit view di un veicolo.
 * Chiama POST /api/vehicles/:id/duplicate e apre il duplicato in editing.
 */
export const DuplicateVehicleButton: React.FC = () => {
  const { id } = useDocumentInfo()
  const router = useRouter()
  const config = useConfig()
  const [loading, setLoading] = useState(false)

  if (!id) return null

  const onClick = async () => {
    if (loading) return
    setLoading(true)
    try {
      const apiBase =
        (config?.config as { routes?: { api?: string } })?.routes?.api ||
        '/api'
      const adminBase =
        (config?.config as { routes?: { admin?: string } })?.routes?.admin ||
        '/admin'
      const res = await fetch(`${apiBase}/vehicles/${id}/duplicate`, {
        method: 'POST',
        credentials: 'include',
      })
      if (!res.ok) throw new Error(await res.text())
      const data = (await res.json()) as { id: string }
      toast.success('Veicolo duplicato. Apro la copia in editing…')
      router.push(`${adminBase}/collections/vehicles/${data.id}`)
    } catch (err) {
      console.error(err)
      toast.error('Impossibile duplicare il veicolo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="btn btn--style-secondary btn--icon-style-without-border btn--size-small"
      style={{ marginLeft: 8 }}
    >
      {loading ? 'Duplicazione…' : 'Duplica veicolo'}
    </button>
  )
}

export default DuplicateVehicleButton
