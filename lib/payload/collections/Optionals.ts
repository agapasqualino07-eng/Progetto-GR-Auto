import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/index.js'

export const Optionals: CollectionConfig = {
  slug: 'optionals',
  labels: { singular: 'Optional', plural: 'Optional' },
  admin: {
    useAsTitle: 'name',
    group: 'Catalogo',
    description:
      'Lista degli optional disponibili. Pre-popolata al primo avvio, espandibile.',
    defaultColumns: ['name', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      required: true,
      options: [
        { label: 'Comfort', value: 'comfort' },
        { label: 'Sicurezza', value: 'sicurezza' },
        { label: 'Multimedia', value: 'multimedia' },
        { label: 'Esterni', value: 'esterni' },
        { label: 'Interni', value: 'interni' },
        { label: 'Assistenza alla guida', value: 'assistenza-guida' },
      ],
    },
  ],
}
