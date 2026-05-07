import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { Section, SectionHeader } from '@/components/ui/section'
import { LeadForm } from '@/components/forms/LeadForm'
import { getLocations, getSiteSettings } from '@/lib/payload/queries'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

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
    <Section className="py-12 sm:py-16">
      <SectionHeader
        eyebrow="Contatti"
        title="Parliamone"
        description="Risposta entro la giornata lavorativa successiva. Per richieste urgenti, telefono o WhatsApp."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <LeadForm type="info" submitLabel="Invia messaggio" withMessage />
        </div>

        <div className="space-y-6">
          {site.phone || site.email || site.whatsapp ? (
            <div className="rounded-xl border border-ink-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-ink-900">Canali rapidi</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {site.phone ? (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand-700" />
                    <a className="hover:text-brand-700" href={`tel:${site.phone}`}>
                      {site.phone}
                    </a>
                  </li>
                ) : null}
                {site.email ? (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-brand-700" />
                    <a className="hover:text-brand-700" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </li>
                ) : null}
                {site.whatsapp ? (
                  <li className="flex items-center gap-2">
                    <span aria-hidden className="text-emerald-600">
                      ●
                    </span>
                    <a
                      className="hover:text-brand-700"
                      href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}

          {locations.map((loc) => (
            <div key={loc.id} className="rounded-xl border border-ink-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-ink-900">{loc.name}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-brand-700" />
                  <div>
                    {loc.address}
                    <br />
                    {loc.zip} {loc.city} ({loc.province})
                  </div>
                </div>
                {loc.phone ? (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand-700" />
                    <a className="hover:text-brand-700" href={`tel:${loc.phone}`}>
                      {loc.phone}
                    </a>
                  </div>
                ) : null}
                {loc.openingHours && loc.openingHours.length > 0 ? (
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-brand-700" />
                    <ul>
                      {loc.openingHours.map((o) => (
                        <li key={o.id ?? o.days}>
                          <strong>{o.days}:</strong> {o.hours}
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
  )
}
