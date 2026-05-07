import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Sito',
  admin: {
    description:
      'Identità del sito: nome, logo, colori, social, dati legali, footer.',
    group: 'Configurazione',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identità',
          fields: [
            { name: 'name', label: 'Nome concessionario', type: 'text', required: true },
            { name: 'tagline', label: 'Tagline', type: 'text' },
            { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media' },
            { name: 'logoDark', label: 'Logo (sfondo scuro)', type: 'upload', relationTo: 'media' },
            { name: 'favicon', label: 'Favicon', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Brand',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'colorPrimary', label: 'Colore primario', type: 'text', defaultValue: '#3a52c4' },
                { name: 'colorAccent', label: 'Colore accento', type: 'text', defaultValue: '#0f172a' },
              ],
            },
          ],
        },
        {
          label: 'Contatti',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', label: 'Telefono principale', type: 'text' },
                { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'social',
              type: 'array',
              labels: { singular: 'Profilo', plural: 'Profili' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'LinkedIn', value: 'linkedin' },
                  ],
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Legale',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'companyName', label: 'Ragione sociale', type: 'text' },
                { name: 'vat', label: 'Partita IVA', type: 'text' },
                { name: 'rea', label: 'REA', type: 'text' },
              ],
            },
            { name: 'footerText', label: 'Testo footer', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
