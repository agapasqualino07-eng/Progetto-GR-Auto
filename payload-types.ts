/**
 * Placeholder dei tipi Payload.
 * Verrà sovrascritto da `pnpm payload generate:types` (o npm/yarn).
 * Qui esponiamo solo le tipizzazioni minime necessarie per la fase 1.
 */

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor'
}

export interface Media {
  id: string
  alt: string
  url?: string
  filename?: string
  mimeType?: string
  width?: number
  height?: number
}

export interface Vehicle {
  id: string
  title: string
  slug: string
  status: 'disponibile' | 'riservato' | 'venduto' | 'in-arrivo'
  featured?: boolean
  _status?: 'draft' | 'published'
  make?: { id: string; name: string; slug: string } | string
  model: string
  trim?: string
  condition: 'nuovo' | 'km0' | 'aziendale' | 'usato'
  firstRegistration: string
  mileage: number
  fuel:
    | 'benzina'
    | 'diesel'
    | 'gpl'
    | 'metano'
    | 'ibrida'
    | 'ibrida-plug-in'
    | 'elettrica'
  transmission: 'manuale' | 'automatico' | 'semiautomatico'
  displacement?: number
  powerKw: number
  powerCv?: number
  price: number
  priceStrikethrough?: number
  vatDeductible?: boolean
  financingMonthly?: number
  highlights?: { text: string; id?: string }[]
  optionals?: string[] | { id: string; name: string; category: string }[]
  gallery?: { image: string | Media; id?: string }[]
  videoUrl?: string
  location?: string | Location
  metaTitle?: string
  metaDescription?: string
  updatedAt?: string
  createdAt?: string
}

export interface Make {
  id: string
  name: string
  slug: string
  logo?: string | Media
}

export interface Optional {
  id: string
  name: string
  category:
    | 'comfort'
    | 'sicurezza'
    | 'multimedia'
    | 'esterni'
    | 'interni'
    | 'assistenza-guida'
}

export interface Location {
  id: string
  name: string
  address: string
  city: string
  province: string
  zip: string
  phone?: string
  whatsapp?: string
  email?: string
  openingHours?: { days: string; hours: string; id?: string }[]
  coordinates?: [number, number]
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  type: 'info' | 'test-drive' | 'valutazione' | 'finanziamento'
  status: 'nuovo' | 'contattato' | 'chiuso'
  message?: string
  vehicle?: string | Vehicle
  vehicleSnapshot?: Record<string, unknown>
  source?: string
  createdAt?: string
}

export interface Page {
  id: string
  title: string
  slug: string
  layout?: unknown[]
  _status?: 'draft' | 'published'
}

export interface SiteSettings {
  name: string
  tagline?: string
  logo?: string | Media
  logoDark?: string | Media
  favicon?: string | Media
  colorPrimary?: string
  colorAccent?: string
  phone?: string
  whatsapp?: string
  email?: string
  social?: { platform: string; url: string; id?: string }[]
  companyName?: string
  vat?: string
  rea?: string
  footerText?: string
}

export interface FinanceSettings {
  defaultTan: number
  defaultTaeg: number
  defaultDownPaymentPercent: number
  defaultMonths: number
  availableMonths: { months: number; id?: string }[]
  disclaimer?: string
}

export interface Config {
  collections: {
    users: User
    media: Media
    makes: Make
    optionals: Optional
    locations: Location
    vehicles: Vehicle
    leads: Lead
    pages: Page
  }
  globals: {
    siteSettings: SiteSettings
    financeSettings: FinanceSettings
  }
  user: User
}
