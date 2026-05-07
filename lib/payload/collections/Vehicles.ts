import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/index.js'
import { vehicleBeforeChange } from '../hooks/vehicle.js'
import {
  revalidateVehicle,
  revalidateVehicleAfterDelete,
} from '../hooks/revalidate.js'
import { duplicateVehicleEndpoint } from '../endpoints/duplicateVehicle.js'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  labels: { singular: 'Veicolo', plural: 'Veicoli' },
  admin: {
    useAsTitle: 'title',
    group: 'Catalogo',
    description: 'Stock dei veicoli in vendita.',
    defaultColumns: [
      'gallery',
      'make',
      'model',
      'price',
      'mileage',
      'firstRegistration',
      'status',
      'featured',
    ],
    listSearchableFields: ['title', 'model', 'trim', 'internalCode'],
    pagination: { defaultLimit: 25 },
    components: {
      beforeListTable: [
        '@/lib/payload/admin/components/BulkUpdateStatus#BulkUpdateStatus',
      ],
      edit: {
        beforeDocumentControls: [
          '@/lib/payload/admin/components/DuplicateVehicleButton#DuplicateVehicleButton',
        ],
      },
    },
  },
  endpoints: [duplicateVehicleEndpoint],
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: false,
    },
    maxPerDoc: 10,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeChange: [vehicleBeforeChange],
    afterChange: [revalidateVehicle],
    afterDelete: [revalidateVehicleAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identificativi',
          description: 'Titolo, slug, stato e visibilità.',
          fields: [
            {
              name: 'title',
              label: 'Titolo',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Generato automaticamente da Marca + Modello + Allestimento. Modificabile.',
              },
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
                  'URL della pagina veicolo. Generato dal titolo, modificabile.',
              },
            },
            {
              name: 'internalCode',
              label: 'Codice interno',
              type: 'text',
              admin: {
                description:
                  'Codice interno per riferimento gestionale (opzionale).',
              },
            },
            {
              name: 'status',
              label: 'Stato',
              type: 'select',
              required: true,
              defaultValue: 'disponibile',
              options: [
                { label: 'Disponibile', value: 'disponibile' },
                { label: 'Riservato', value: 'riservato' },
                { label: 'Venduto', value: 'venduto' },
                { label: 'In arrivo', value: 'in-arrivo' },
              ],
              admin: {
                position: 'sidebar',
                components: {
                  Cell: '@/lib/payload/admin/components/cells/StatusBadgeCell#StatusBadgeCell',
                },
              },
            },
            {
              name: 'featured',
              label: 'In evidenza',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description:
                  'Mostra il veicolo nella sezione "In evidenza" della homepage.',
                components: {
                  Cell: '@/lib/payload/admin/components/cells/FeaturedCell#FeaturedCell',
                },
              },
            },
          ],
        },
        {
          label: 'Dati tecnici',
          description: 'Caratteristiche tecniche e di omologazione.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'make',
                  label: 'Marca',
                  type: 'relationship',
                  relationTo: 'makes',
                  required: true,
                },
                {
                  name: 'model',
                  label: 'Modello',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'trim',
                  label: 'Allestimento',
                  type: 'text',
                  admin: { description: 'Es. "320d xDrive Msport"' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'condition',
                  label: 'Condizione',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Nuovo', value: 'nuovo' },
                    { label: 'Km 0', value: 'km0' },
                    { label: 'Aziendale', value: 'aziendale' },
                    { label: 'Usato', value: 'usato' },
                  ],
                },
                {
                  name: 'firstRegistration',
                  label: 'Prima immatricolazione',
                  type: 'date',
                  required: true,
                  admin: {
                    date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' },
                    description: 'Mese e anno di prima immatricolazione.',
                    components: {
                      Cell: '@/lib/payload/admin/components/cells/RegistrationCell#RegistrationCell',
                    },
                  },
                },
                {
                  name: 'mileage',
                  label: 'Chilometri',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    description: 'In km.',
                    components: {
                      Cell: '@/lib/payload/admin/components/cells/MileageCell#MileageCell',
                    },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'fuel',
                  label: 'Alimentazione',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Benzina', value: 'benzina' },
                    { label: 'Diesel', value: 'diesel' },
                    { label: 'GPL', value: 'gpl' },
                    { label: 'Metano', value: 'metano' },
                    { label: 'Ibrida', value: 'ibrida' },
                    { label: 'Ibrida plug-in', value: 'ibrida-plug-in' },
                    { label: 'Elettrica', value: 'elettrica' },
                  ],
                },
                {
                  name: 'transmission',
                  label: 'Cambio',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Manuale', value: 'manuale' },
                    { label: 'Automatico', value: 'automatico' },
                    { label: 'Semiautomatico', value: 'semiautomatico' },
                  ],
                },
                {
                  name: 'drivetrain',
                  label: 'Trazione',
                  type: 'select',
                  options: [
                    { label: 'Anteriore', value: 'anteriore' },
                    { label: 'Posteriore', value: 'posteriore' },
                    { label: 'Integrale', value: 'integrale' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'displacement',
                  label: 'Cilindrata (cc)',
                  type: 'number',
                  min: 0,
                  admin: {
                    description: 'Nascosto per veicoli elettrici.',
                    condition: (data) => data?.fuel !== 'elettrica',
                  },
                },
                {
                  name: 'powerKw',
                  label: 'Potenza (kW)',
                  type: 'number',
                  required: true,
                  min: 0,
                },
                {
                  name: 'powerCv',
                  label: 'Potenza (CV)',
                  type: 'number',
                  min: 0,
                  admin: {
                    description:
                      'Calcolato automaticamente da kW (× 1,36). Sovrascrivibile.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'co2',
                  label: 'CO₂ (g/km)',
                  type: 'number',
                  min: 0,
                },
                {
                  name: 'euroClass',
                  label: 'Classe Euro',
                  type: 'select',
                  options: [
                    { label: 'Euro 4', value: 'euro-4' },
                    { label: 'Euro 5', value: 'euro-5' },
                    { label: 'Euro 6', value: 'euro-6' },
                    { label: 'Euro 6d', value: 'euro-6d' },
                    { label: 'Euro 6e', value: 'euro-6e' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'doors',
                  label: 'Porte',
                  type: 'number',
                  min: 2,
                  max: 6,
                },
                {
                  name: 'seats',
                  label: 'Posti',
                  type: 'number',
                  min: 1,
                  max: 9,
                },
                {
                  name: 'bodyType',
                  label: 'Carrozzeria',
                  type: 'select',
                  options: [
                    { label: 'Berlina', value: 'berlina' },
                    { label: 'Station Wagon', value: 'station-wagon' },
                    { label: 'SUV', value: 'suv' },
                    { label: 'Crossover', value: 'crossover' },
                    { label: 'Coupé', value: 'coupe' },
                    { label: 'Cabrio', value: 'cabrio' },
                    { label: 'Monovolume', value: 'monovolume' },
                    { label: 'City Car', value: 'city-car' },
                    { label: 'Pick-up', value: 'pick-up' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Colori e interni',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'exteriorColor', label: 'Colore esterno', type: 'text' },
                {
                  name: 'exteriorColorType',
                  label: 'Tipo colore',
                  type: 'select',
                  options: [
                    { label: 'Metallizzato', value: 'metallizzato' },
                    { label: 'Pastello', value: 'pastello' },
                    { label: 'Perlato', value: 'perlato' },
                    { label: 'Opaco', value: 'opaco' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'interiorColor', label: 'Colore interni', type: 'text' },
                {
                  name: 'interiorMaterial',
                  label: 'Materiale interni',
                  type: 'select',
                  options: [
                    { label: 'Tessuto', value: 'tessuto' },
                    { label: 'Pelle', value: 'pelle' },
                    { label: 'Pelle e tessuto', value: 'pelle-tessuto' },
                    { label: 'Alcantara', value: 'alcantara' },
                    { label: 'Pelle e Alcantara', value: 'pelle-alcantara' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Prezzo',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  label: 'Prezzo (€)',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    components: {
                      Cell: '@/lib/payload/admin/components/cells/PriceCell#PriceCell',
                    },
                  },
                },
                {
                  name: 'priceStrikethrough',
                  label: 'Prezzo barrato (€)',
                  type: 'number',
                  min: 0,
                  admin: {
                    description:
                      'Compila per mostrare un\'offerta con prezzo precedente barrato.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'vatDeductible',
                  label: 'IVA esposta',
                  type: 'checkbox',
                  admin: { description: 'Spunta se l\'IVA è esposta e detraibile.' },
                },
                {
                  name: 'financingMonthly',
                  label: 'Rata indicativa (€/mese)',
                  type: 'number',
                  min: 0,
                  admin: {
                    description:
                      'Rata mensile indicativa mostrata in pagina veicolo. I parametri di default vivono in Configurazione → Finanziamento.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Descrizione',
          fields: [
            {
              name: 'description',
              label: 'Descrizione',
              type: 'richText',
            },
            {
              name: 'highlights',
              label: 'Punti salienti',
              type: 'array',
              labels: { singular: 'Punto', plural: 'Punti' },
              maxRows: 6,
              admin: {
                description:
                  'Massimo 6 punti da mostrare nel riepilogo (es. "Tagliandi ufficiali", "Garanzia 24 mesi").',
              },
              fields: [
                { name: 'text', type: 'text', required: true, label: 'Testo' },
              ],
            },
            {
              name: 'optionals',
              label: 'Optional',
              type: 'relationship',
              relationTo: 'optionals',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'gallery',
              label: 'Galleria',
              type: 'array',
              labels: { singular: 'Foto', plural: 'Foto' },
              minRows: 1,
              admin: {
                description:
                  'Trascina per riordinare. La prima foto è la copertina. Almeno 1 foto.',
                initCollapsed: false,
                components: {
                  Cell: '@/lib/payload/admin/components/cells/ThumbnailCell#ThumbnailCell',
                },
              },
              fields: [
                {
                  name: 'image',
                  label: 'Immagine',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'videoUrl',
              label: 'URL video (YouTube/Vimeo)',
              type: 'text',
              admin: {
                description:
                  'Link a video promozionale (opzionale). Solo URL pubblici.',
              },
            },
          ],
        },
        {
          label: 'Sede',
          fields: [
            {
              name: 'location',
              label: 'Sede',
              type: 'relationship',
              relationTo: 'locations',
              admin: {
                description:
                  'Dove si trova fisicamente il veicolo. Default: prima sede se ne esiste una sola.',
              },
              hooks: {
                beforeChange: [
                  async ({ value, req }) => {
                    if (value) return value
                    const list = await req.payload.find({
                      collection: 'locations',
                      limit: 2,
                      depth: 0,
                    })
                    if (list.totalDocs === 1) return list.docs[0].id
                    return value
                  },
                ],
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta title',
              type: 'text',
              admin: { description: 'Fallback: titolo del veicolo.' },
            },
            {
              name: 'metaDescription',
              label: 'Meta description',
              type: 'textarea',
              admin: { description: 'Lunghezza ottimale 140–160 caratteri.' },
            },
          ],
        },
      ],
    },
  ],
}
