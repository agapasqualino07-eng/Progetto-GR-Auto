'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const colors: Record<string, { bg: string; fg: string; label: string }> = {
  disponibile: { bg: '#dcfce7', fg: '#166534', label: 'Disponibile' },
  riservato: { bg: '#fef3c7', fg: '#854d0e', label: 'Riservato' },
  venduto: { bg: '#fee2e2', fg: '#991b1b', label: 'Venduto' },
  'in-arrivo': { bg: '#dbeafe', fg: '#1e40af', label: 'In arrivo' },
}

export const StatusBadgeCell: React.FC<DefaultCellComponentProps> = ({
  cellData,
}) => {
  const key = typeof cellData === 'string' ? cellData : ''
  const c = colors[key] ?? { bg: '#e5e7eb', fg: '#374151', label: key || '—' }
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: c.bg,
        color: c.fg,
        whiteSpace: 'nowrap',
      }}
    >
      {c.label}
    </span>
  )
}

export default StatusBadgeCell
