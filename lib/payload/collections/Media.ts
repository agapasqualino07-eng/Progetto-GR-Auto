import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/index.js'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  admin: {
    useAsTitle: 'alt',
    group: 'Contenuti',
    description: 'Immagini e media usati nel sito (auto, banner, loghi).',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: { quality: 82 },
    },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'full', width: 1600, height: undefined },
      { name: 'hero', width: 2400, height: undefined },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Testo alternativo',
      type: 'text',
      required: true,
      admin: {
        description:
          'Descrivi brevemente l\'immagine. Obbligatorio per accessibilità e SEO.',
      },
    },
    {
      name: 'caption',
      label: 'Didascalia',
      type: 'text',
      required: false,
    },
  ],
}
