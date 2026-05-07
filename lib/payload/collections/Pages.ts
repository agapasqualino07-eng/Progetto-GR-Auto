import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, publishedOrAuthenticated } from '../access/index.js'
import { revalidatePageAfterChange } from '../hooks/revalidate.js'
import { pageBlocks } from '../blocks/index.js'
import { slugify } from '../../utils/format.js'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Pagina', plural: 'Pagine' },
  admin: {
    useAsTitle: 'title',
    group: 'Contenuti',
    description: 'Pagine statiche del sito (Chi siamo, Servizi, Contatti, ecc.).',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 10,
  },
  access: {
    read: publishedOrAuthenticated,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidatePageAfterChange],
  },
  fields: [
    {
      name: 'title',
      label: 'Titolo',
      type: 'text',
      required: true,
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
        description:
          'URL della pagina (es. "chi-siamo"). Generato dal titolo, modificabile.',
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => value || (data?.title ? slugify(data.title) : value),
        ],
      },
    },
    {
      name: 'layout',
      label: 'Contenuto',
      type: 'blocks',
      blocks: pageBlocks,
      minRows: 1,
      admin: {
        description: 'Componi la pagina trascinando i blocchi nell\'ordine voluto.',
      },
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: { initCollapsed: true },
      fields: [
        { name: 'metaTitle', label: 'Meta title', type: 'text' },
        { name: 'metaDescription', label: 'Meta description', type: 'textarea' },
        {
          name: 'ogImage',
          label: 'Open Graph image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
