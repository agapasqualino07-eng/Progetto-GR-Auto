import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
} from 'lucide-react'
import type { SiteSetting } from '@/payload-types'

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: MessageCircle, // fallback (no TikTok in lucide)
} as const

const socialLabels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
}

export function Footer({ settings }: { settings: SiteSetting }) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 bg-ink-900 text-ink-200">
      {/* Striscia rossa decorativa di brand */}
      <div aria-hidden className="h-1 w-full bg-brand-600" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-16">
        {/* Brand + tagline */}
        <div className="lg:col-span-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-white"
          >
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-[15px] font-extrabold ring-1 ring-inset ring-white/10"
            >
              <span className="bg-gradient-to-br from-brand-400 to-brand-600 bg-clip-text text-transparent">
                GR
              </span>
            </span>
            {settings.name}
          </Link>
          {settings.tagline ? (
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-300">
              {settings.tagline}
            </p>
          ) : null}
          {settings.footerText ? (
            <p className="mt-3 max-w-md text-xs leading-relaxed text-ink-400">
              {settings.footerText}
            </p>
          ) : null}

          {settings.social && settings.social.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {settings.social.map((s) => {
                const Icon =
                  socialIcons[s.platform as keyof typeof socialIcons] ??
                  MessageCircle
                return (
                  <li key={s.id ?? s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={socialLabels[s.platform] ?? s.platform}
                      className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-ink-300 ring-1 ring-inset ring-white/10 transition-all hover:bg-brand-600 hover:text-white hover:ring-brand-600"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>

        {/* Veicoli */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Veicoli
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/veicoli"
              >
                Tutti i veicoli
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/veicoli?alimentazione=benzina"
              >
                Benzina
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/veicoli?alimentazione=diesel"
              >
                Diesel
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/veicoli?alimentazione=ibrida"
              >
                Ibride
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/veicoli?alimentazione=elettrica"
              >
                Elettriche
              </Link>
            </li>
          </ul>
        </div>

        {/* Servizi */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Servizi
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/vendi-la-tua-auto"
              >
                Vendi la tua auto
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/servizi"
              >
                Finanziamento
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/servizi"
              >
                Permuta
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/servizi"
              >
                Garanzia
              </Link>
            </li>
            <li>
              <Link
                className="text-ink-300 transition-colors hover:text-white"
                href="/chi-siamo"
              >
                Chi siamo
              </Link>
            </li>
          </ul>
        </div>

        {/* Contatti */}
        <div className="lg:col-span-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contatti
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            {settings.phone ? (
              <li>
                <a
                  className="group inline-flex items-center gap-3 text-ink-200 hover:text-white"
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-brand-600 group-hover:ring-brand-600">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="font-semibold tabular-nums">
                    {settings.phone}
                  </span>
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li>
                <a
                  className="group inline-flex items-center gap-3 text-ink-200 hover:text-white"
                  href={`mailto:${settings.email}`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-brand-600 group-hover:ring-brand-600">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>{settings.email}</span>
                </a>
              </li>
            ) : null}
            {settings.whatsapp ? (
              <li>
                <a
                  className="group inline-flex items-center gap-3 text-ink-200 hover:text-white"
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-emerald-500 group-hover:ring-emerald-500">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span>WhatsApp</span>
                </a>
              </li>
            ) : null}
          </ul>

          <Link
            href="/contatti"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300"
          >
            <MapPin className="h-4 w-4" />
            Vieni a trovarci in sede →
          </Link>
        </div>
      </div>

      {/* Bottom bar — legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {year} {settings.companyName || settings.name}.
            {settings.vat ? ` P.IVA ${settings.vat}` : ''}
            {settings.rea ? ` · REA ${settings.rea}` : ''}
          </p>
          <div className="flex items-center gap-5">
            <Link
              className="transition-colors hover:text-white"
              href="/privacy"
            >
              Privacy
            </Link>
            <Link className="transition-colors hover:text-white" href="/cookie">
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
