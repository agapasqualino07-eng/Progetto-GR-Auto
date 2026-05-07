import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utente', plural: 'Utenti' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Sistema',
    description: 'Account che possono accedere all\'admin del sito.',
  },
  access: {
    create: isAdmin,
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return req.user ? { id: { equals: req.user.id } } : false
    },
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return req.user ? { id: { equals: req.user.id } } : false
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Ruolo',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Amministratore', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        description:
          'Admin: accesso completo. Editor: gestisce veicoli, pagine, lead.',
      },
    },
  ],
}
