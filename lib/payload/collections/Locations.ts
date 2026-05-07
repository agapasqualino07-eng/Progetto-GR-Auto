import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access'

export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: { singular: 'Sede', plural: 'Sedi' },
  admin: {
    useAsTitle: 'name',
    group: 'Configurazione',
    description: 'Le sedi del concessionario (showroom, officine, ecc.).',
    defaultColumns: ['name', 'city', 'phone'],
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
      label: 'Nome sede',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'address', label: 'Indirizzo', type: 'text', required: true },
        { name: 'zip', label: 'CAP', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'city', label: 'Città', type: 'text', required: true },
        { name: 'province', label: 'Provincia (sigla)', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefono', type: 'text' },
        { name: 'whatsapp', label: 'WhatsApp', type: 'text', admin: { description: 'Numero E.164, es. +393331234567' } },
        { name: 'email', label: 'Email', type: 'email' },
      ],
    },
    {
      name: 'openingHours',
      label: 'Orari di apertura',
      type: 'array',
      labels: { singular: 'Fascia oraria', plural: 'Fasce orarie' },
      fields: [
        {
          name: 'days',
          label: 'Giorni',
          type: 'text',
          required: true,
          admin: { description: 'Es. "Lun–Ven" o "Sab"' },
        },
        {
          name: 'hours',
          label: 'Orario',
          type: 'text',
          required: true,
          admin: { description: 'Es. "9:00–13:00, 15:00–19:00"' },
        },
      ],
    },
    {
      name: 'coordinates',
      label: 'Coordinate (lat, lng)',
      type: 'point',
      required: false,
      admin: { description: 'Posizione sulla mappa.' },
    },
  ],
}
