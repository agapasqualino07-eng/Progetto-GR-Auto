'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { formatMonthYear } from '@/lib/utils/format'

export const RegistrationCell: React.FC<DefaultCellComponentProps> = ({
  cellData,
}) => {
  const value =
    typeof cellData === 'string' ||
    typeof cellData === 'number' ||
    cellData instanceof Date
      ? cellData
      : null
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {formatMonthYear(value)}
    </span>
  )
}

export default RegistrationCell
