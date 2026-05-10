import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

import { Section } from '@/components/ui/section'
import { LeadForm } from '@/components/forms/LeadForm'
import { getLocations, getSiteSettings } from '@/lib/payload/queries'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Scrivici, chiamaci o passa in concessionaria. Siamo a tua disposizione per ogni informazione.',
}

export default async function ContattiPage() {
  const [site, locations] = await Promise.all([
    getSiteSettings(),
    getLocations(),
  ])

  return (
    <>
      {/* Hero secondaria */}
      <section className="relative overflow-hidden bg-ink-900 py-14 text-white sm:py-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_15%,rgba(239,68,68,0.20),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
            Contatti
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Parliamone.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-white/80 sm:text-lg">
            Risposta entro la giornata lavorativa successiva. Per richieste
            urgenti, telefono o WhatsApp: rispondiamo subito.
          </p>
        </div>
      </section>

      <Section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-14">
          {/* Form a sinistra */}
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                Scrivici
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                Compila il form: ti rispondiamo entro la giornata lavorativa.
              </p>
            </div>
            <LeadForm
              type="info"
              submitLabel="Invia messaggio"
              withMessage
            />
          </div>

          {/* Info a destra */}
          <div className="space-y-5">
            {site.phone || site.email || site.whatsapp ? (
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                <h3 className="font-display text-base font-bold text-ink-900">
                  Canali rapidi
                </h3>
                <ul className="mt-4 space-y-3">
                  {site.phone ? (
                    <li>
                      <a
                        className="group flex items-center gap-3 text-sm text-ink-800 hover:text-ink-900"
                        href={`tel:${site.phone.replace(/\s/g, '')}`}
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Phone className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-500">
                            Telefono
                          </span>
                          <span className="font-semibold tabular-nums">
                            {site.phone}
                          </span>
                        </span>
                      </a>
                    </li>
                  ) : null}
                  {site.email ? (
                    <li>
                      <a
                        className="group flex items-center gap-3 text-sm text-ink-800 hover:text-ink-900"
                        href={`mailto:${site.email}`}
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Mail className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-500">
                            Email
                          </span>
                          <span className="font-semibold">{site.email}</span>
                        </span>
                      </a>
                    </li>
                  ) : null}
                  {site.whatsapp ? (
                    <li>
                      <a
                        className="group flex items-center gap-3 text-sm text-ink-800 hover:text-ink-900"
                        href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                          <MessageCircle className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-500">
                            Chat
                          </span>
                          <span className="font-semibold">WhatsApp</span>
                        </span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}

            {locations.map((loc) => (
              <div
                key={loc.id}
                className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-ink-900 text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-900">
                      {loc.name}
                    </h3>
                    <div className="mt-1 text-sm text-ink-700">
                      {loc.address}
                      <br />
                      {loc.zip} {loc.city} ({loc.province})
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2.5 border-t border-ink-100 pt-4 text-sm">
                  {loc.phone ? (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0 text-brand-600" />
                      <a
                        className="font-semibold text-ink-900 hover:text-brand-600"
                        href={`tel:${loc.phone}`}
                      >
                        {loc.phone}
                      </a>
                    </div>
                  ) : null}
                  {loc.openingHours && loc.openingHours.length > 0 ? (
                    <div className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                      <ul className="space-y-1 text-ink-700">
                        {loc.openingHours.map((o) => (
                          <li key={o.id ?? o.days}>
                            <strong className="font-semibold text-ink-900">
                              {o.days}:
                            </strong>{' '}
                            {o.hours}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
