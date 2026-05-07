'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

export const FeaturedCell: React.FC<DefaultCellComponentProps> = ({
  cellData,
}) => {
  if (!cellData) return <span style={{ color: '#9ca3af' }}>—</span>
  return (
    <span
      aria-label="In evidenza"
      title="In evidenza"
      style={{ color: '#f59e0b', fontSize: 18, lineHeight: 1 }}
    >
      ★
    </span>
  )
}

export default FeaturedCell
