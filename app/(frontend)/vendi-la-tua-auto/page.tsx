import type { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/ui/section'
import { ValutazioneForm } from '@/components/forms/ValutazioneForm'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vendi la tua auto',
  description:
    'Valutazione gratuita della tua auto entro la giornata. Nessun obbligo: ti diamo un\'offerta concreta sul valore di permuta o ritiro.',
}

const steps = [
  {
    title: 'Compila il form',
    body: 'Bastano marca, modello, anno e km. Ci pensiamo noi a contattarti.',
  },
  {
    title: 'Valutazione entro 24h',
    body: 'Stimiamo il valore in base allo stato e alla nostra rete di canali.',
  },
  {
    title: 'Ritiro o permuta',
    body: 'Ti proponiamo ritiro diretto o permuta su una delle auto in catalogo.',
  },
]

export default function VendiPage() {
  return (
    <Section className="py-12 sm:py-16">
      <SectionHeader
        eyebrow="Permuta · Ritiro"
        title="Vendi o permuta la tua auto"
        description="Valutazione trasparente, gratuita e senza impegno. Ti rispondiamo entro la giornata lavorativa."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)]">
        <div className="space-y-8">
          <ul className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-xl border border-ink-200 bg-white p-5"
              >
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {i + 1}
                </div>
                <h3 className="mt-3 text-base font-semibold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-ink-700">{s.body}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-ink-50 p-5">
            <h3 className="text-sm font-semibold text-ink-900">
              Cosa controlliamo prima dell&apos;offerta
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-1.5 text-sm text-ink-700 sm:grid-cols-2">
              {[
                'Storia tagliandi e manutenzione',
                'Stato meccanico ed elettronico',
                'Carrozzeria e interni',
                'Documenti, passaggi proprietà',
                'Optional e dotazioni',
                'Andamento del mercato del modello',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-ink-200 bg-white p-5">
          <h3 className="mb-4 text-base font-semibold text-ink-900">
            Richiedi valutazione
          </h3>
          <ValutazioneForm />
        </div>
      </div>
    </Section>
  )
}
