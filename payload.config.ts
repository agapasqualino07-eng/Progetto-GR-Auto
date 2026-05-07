import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { it } from '@payloadcms/translations/languages/it'
import { en } from '@payloadcms/translations/languages/en'

import { Users } from '@/lib/payload/collections/Users'
import { Media } from '@/lib/payload/collections/Media'
import { Makes } from '@/lib/payload/collections/Makes'
import { Optionals } from '@/lib/payload/collections/Optionals'
import { Locations } from '@/lib/payload/collections/Locations'
import { Vehicles } from '@/lib/payload/collections/Vehicles'
import { Leads } from '@/lib/payload/collections/Leads'
import { Pages } from '@/lib/payload/collections/Pages'
import { SiteSettings } from '@/lib/payload/globals/SiteSettings'
import { FinanceSettings } from '@/lib/payload/globals/FinanceSettings'

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
      // Dashboard custom inserita in Fase 2
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
    push: process.env.NODE_ENV !== 'production',
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
