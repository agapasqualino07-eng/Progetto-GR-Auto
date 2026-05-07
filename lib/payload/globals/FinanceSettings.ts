import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const FinanceSettings: GlobalConfig = {
  slug: 'financeSettings',
  label: 'Finanziamento',
  admin: {
    description:
      'Parametri di default per il calcolatore rata. Modificarli aggiorna tutte le pagine veicolo.',
    group: 'Configurazione',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'defaultTan',
          label: 'TAN di default (%)',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 6.95,
        },
        {
          name: 'defaultTaeg',
          label: 'TAEG di default (%)',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 8.45,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'defaultDownPaymentPercent',
          label: 'Anticipo di default (%)',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          defaultValue: 20,
        },
        {
          name: 'defaultMonths',
          label: 'Durata di default (mesi)',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 60,
        },
      ],
    },
    {
      name: 'availableMonths',
      label: 'Durate selezionabili',
      type: 'array',
      labels: { singular: 'Durata', plural: 'Durate' },
      defaultValue: [{ months: 24 }, { months: 36 }, { months: 48 }, { months: 60 }, { months: 72 }, { months: 84 }],
      fields: [
        { name: 'months', label: 'Mesi', type: 'number', required: true, min: 1 },
      ],
    },
    {
      name: 'disclaimer',
      label: 'Disclaimer',
      type: 'textarea',
      defaultValue:
        'Esempio rappresentativo. Calcolo indicativo non vincolante: condizioni soggette a valutazione finanziaria.',
    },
  ],
}
