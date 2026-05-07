import Link from 'next/link'
import type { SiteSetting } from '@/payload-types'

const platformIcons: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
}

export function Footer({ settings }: { settings: SiteSetting }) {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-ink-200 bg-ink-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-base font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              ◆
            </span>
            {settings.name}
          </div>
          {settings.tagline ? (
            <p className="mt-3 max-w-md text-sm text-ink-700">
              {settings.tagline}
            </p>
          ) : null}
          {settings.footerText ? (
            <p className="mt-3 max-w-md text-sm text-ink-500">
              {settings.footerText}
            </p>
          ) : null}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Sito</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li><Link className="hover:text-brand-700" href="/veicoli">Veicoli</Link></li>
            <li><Link className="hover:text-brand-700" href="/chi-siamo">Chi siamo</Link></li>
            <li><Link className="hover:text-brand-700" href="/servizi">Servizi</Link></li>
            <li><Link className="hover:text-brand-700" href="/vendi-la-tua-auto">Vendi la tua auto</Link></li>
            <li><Link className="hover:text-brand-700" href="/contatti">Contatti</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Contatti</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            {settings.phone ? (
              <li>
                <a className="hover:text-brand-700" href={`tel:${settings.phone}`}>
                  {settings.phone}
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li>
                <a className="hover:text-brand-700" href={`mailto:${settings.email}`}>
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings.whatsapp ? (
              <li>
                <a
                  className="hover:text-brand-700"
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>

          {settings.social && settings.social.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2 text-xs">
              {settings.social.map((s) => (
                <li key={s.id ?? s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-ink-200 px-3 py-1 hover:bg-white"
                  >
                    {platformIcons[s.platform] ?? s.platform}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-ink-200">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {year} {settings.companyName || settings.name}.{' '}
            {settings.vat ? `P.IVA ${settings.vat}` : ''}
            {settings.rea ? ` · REA ${settings.rea}` : ''}
          </p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-brand-700" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-brand-700" href="/cookie">
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
