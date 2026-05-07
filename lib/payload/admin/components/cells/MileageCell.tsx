'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { formatKm } from '@/lib/utils/format'

export const MileageCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const value = typeof cellData === 'number' ? cellData : null
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatKm(value)}</span>
  )
}

export default MileageCell
