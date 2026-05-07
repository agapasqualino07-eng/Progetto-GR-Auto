/**
 * Formattazione per il mercato italiano: prezzi in EUR, km e date.
 */
export const eur = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export const num = new Intl.NumberFormat('it-IT')

export function formatPrice(value: number | null | undefined): string {
  if (value == null) return '—'
  return eur.format(value)
}

export function formatKm(value: number | null | undefined): string {
  if (value == null) return '—'
  return `${num.format(value)} km`
}

export function formatMonthYear(
  date: string | number | Date | null | undefined,
): string {
  if (date == null || date === '') return '—'
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return '—'
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${month}/${d.getFullYear()}`
}

export function kwToCv(kw: number): number {
  return Math.round(kw * 1.36)
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
