import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { it } from '@payloadcms/translations/languages/it'
import { en } from '@payloadcms/translations/languages/en'

import { Users } from './lib/payload/collections/Users.js'
import { Media } from './lib/payload/collections/Media.js'
import { Makes } from './lib/payload/collections/Makes.js'
import { Optionals } from './lib/payload/collections/Optionals.js'
import { Locations } from './lib/payload/collections/Locations.js'
import { Vehicles } from './lib/payload/collections/Vehicles.js'
import { Leads } from './lib/payload/collections/Leads.js'
import { Pages } from './lib/payload/collections/Pages.js'
import { SiteSettings } from './lib/payload/globals/SiteSettings.js'
import { FinanceSettings } from './lib/payload/globals/FinanceSettings.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Admin Concessionario',
    },
    components: {
      beforeDashboard: [
        '@/lib/payload/admin/components/Dashboard#AdminDashboard',
      ],
    },
  },
  i18n: {
    fallbackLanguage: 'it',
    supportedLanguages: { it, en },
    translations: {
      it: {
        general: {
          dashboard: 'Pannello',
        },
      },
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Media,
    Makes,
    Optionals,
    Locations,
    Vehicles,
    Leads,
    Pages,
  ],
  globals: [SiteSettings, FinanceSettings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'].filter(
    Boolean,
  ),
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'].filter(
    Boolean,
  ),
})
