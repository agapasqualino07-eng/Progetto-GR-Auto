/**
 * Predisposizione i18n con next-intl.
 * Per ora supportiamo IT e EN, ma le pagine vengono generate solo in IT.
 * L'attivazione del routing localizzato avverrà in fase 3 dopo conferma del cliente.
 */
export const locales = ['it', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'it'

export const localeLabels: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
}
