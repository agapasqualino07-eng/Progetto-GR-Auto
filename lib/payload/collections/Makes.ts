import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access'
import { slugify } from '@/lib/utils/format'

export const Makes: CollectionConfig = {
  slug: 'makes',
  labels: { singular: 'Marca', plural: 'Marche' },
  admin: {
    useAsTitle: 'name',
    group: 'Catalogo',
    description: 'Marche dei veicoli. Pre-popolate al primo avvio.',
    defaultColumns: ['name', 'slug', 'updatedAt'],
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
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Generato automaticamente dal nome. Modificabile.',
      },
      hooks: {
        beforeChange: [
          ({ data, value }) => value || (data?.name ? slugify(data.name) : value),
        ],
      },
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
