import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../access/index.js'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Richiesta', plural: 'Richieste' },
  admin: {
    useAsTitle: 'name',
    group: 'Vendite',
    description:
      'Richieste informazioni, prenotazioni test drive, valutazioni dell\'usato.',
    defaultColumns: ['name', 'type', 'status', 'vehicle', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'message'],
  },
  access: {
    // I lead vengono creati da API pubbliche tramite Local API (req.user è null)
    create: () => true,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Nome', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Telefono', type: 'text' },
      ],
    },
    {
      name: 'type',
      label: 'Tipo richiesta',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Richiesta informazioni', value: 'info' },
        { label: 'Test drive', value: 'test-drive' },
        { label: 'Valutazione usato', value: 'valutazione' },
        { label: 'Finanziamento', value: 'finanziamento' },
      ],
    },
    {
      name: 'status',
      label: 'Stato',
      type: 'select',
      required: true,
      defaultValue: 'nuovo',
      options: [
        { label: 'Nuovo', value: 'nuovo' },
        { label: 'Contattato', value: 'contattato' },
        { label: 'Chiuso', value: 'chiuso' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'message',
      label: 'Messaggio',
      type: 'textarea',
    },
    {
      name: 'vehicle',
      label: 'Veicolo richiesto',
      type: 'relationship',
      relationTo: 'vehicles',
      admin: {
        description:
          'Veicolo a cui si riferisce la richiesta (se applicabile).',
      },
    },
    {
      name: 'vehicleSnapshot',
      label: 'Snapshot veicolo',
      type: 'json',
      admin: {
        readOnly: true,
        description:
          'Fotografia del veicolo al momento della richiesta. Utile se il veicolo viene rimosso.',
      },
    },
    {
      name: 'notes',
      label: 'Note interne',
      type: 'richText',
      admin: { description: 'Visibili solo allo staff.' },
    },
    {
      name: 'source',
      label: 'Sorgente',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Pagina di origine della richiesta.',
      },
    },
  ],
  timestamps: true,
}
