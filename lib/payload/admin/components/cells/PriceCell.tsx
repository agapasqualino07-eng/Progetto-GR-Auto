'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { formatPrice } from '@/lib/utils/format'

export const PriceCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const value = typeof cellData === 'number' ? cellData : null
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
      {formatPrice(value)}
    </span>
  )
}

export default PriceCell
