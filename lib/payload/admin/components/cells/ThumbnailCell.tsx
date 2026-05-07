'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

type Media = {
  url?: string
  alt?: string
  sizes?: { thumbnail?: { url?: string } }
}

type GalleryItem = {
  image?: Media | string | null
}

/**
 * Mostra una thumbnail 60x60 della prima foto della galleria.
 */
export const ThumbnailCell: React.FC<DefaultCellComponentProps> = ({
  cellData,
}) => {
  let url: string | undefined
  let alt = ''

  if (Array.isArray(cellData) && cellData.length > 0) {
    const first = cellData[0] as GalleryItem
    const img = first?.image
    if (img && typeof img === 'object') {
      url = img.sizes?.thumbnail?.url || img.url
      alt = img.alt || ''
    }
  }

  if (!url) {
    return (
      <div
        aria-hidden
        style={{
          width: 60,
          height: 60,
          borderRadius: 6,
          background: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af',
          fontSize: 11,
        }}
      >
        no foto
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      width={60}
      height={60}
      style={{
        width: 60,
        height: 60,
        objectFit: 'cover',
        borderRadius: 6,
        display: 'block',
      }}
    />
  )
}

export default ThumbnailCell
