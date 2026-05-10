import type { Metadata } from 'next'
import {
  CheckCircle2,
  ClipboardList,
  CalendarClock,
  HandCoins,
} from 'lucide-react'
import { Section } from '@/components/ui/section'
import { ValutazioneForm } from '@/components/forms/ValutazioneForm'

export const metadata: Metadata = {
  title: 'Vendi la tua auto',
  description:
    "Valutazione gratuita della tua auto entro la giornata. Nessun obbligo: ti diamo un'offerta concreta sul valore di permuta o ritiro.",
}

const steps = [
  {
    icon: ClipboardList,
    title: 'Compila il form',
    body: 'Bastano marca, modello, anno e km. Ci pensiamo noi a contattarti.',
  },
  {
    icon: CalendarClock,
    title: 'Valutazione entro 24h',
    body:
      'Stimiamo il valore in base allo stato e alla nostra rete di canali.',
  },
  {
    icon: HandCoins,
    title: 'Ritiro o permuta',
    body:
      'Ti proponiamo ritiro diretto o permuta su una delle auto in catalogo.',
  },
]

const checklist = [
  'Storia tagliandi e manutenzione',
  'Stato meccanico ed elettronico',
  'Carrozzeria e interni',
  'Documenti, passaggi proprietà',
  'Optional e dotazioni',
  'Andamento del mercato del modello',
]

export default function VendiPage() {
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
            Permuta · Ritiro
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Vendi o permuta la tua auto
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-white/80 sm:text-lg">
            Valutazione trasparente, gratuita e senza impegno. Ti rispondiamo
            entro la giornata lavorativa.
          </p>
        </div>
      </section>

      <Section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-14">
          <div className="space-y-10">
            {/* Steps */}
            <div>
              <div className="mb-6">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                  Come funziona
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  Tre passi, zero stress
                </h2>
              </div>
              <ol className="grid gap-5 sm:grid-cols-3">
                {steps.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <li
                      key={s.title}
                      className="relative rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
                    >
                      <span className="absolute -top-3 left-6 inline-flex items-center justify-center rounded-md bg-brand-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-cta">
                        Step {i + 1}
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-900 text-white shadow-card">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-base font-bold text-ink-900">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                        {s.body}
                      </p>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Checklist */}
            <div className="overflow-hidden rounded-2xl bg-ink-900 p-7 text-white shadow-card-hover sm:p-9">
              <div className="relative">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
                  Trasparenza
                </span>
                <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">
                  Cosa controlliamo prima dell&apos;offerta
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {checklist.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 text-sm text-white/85"
                    >
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Form sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-7">
              <div className="mb-5">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                  Gratuito · Senza impegno
                </span>
                <h2 className="mt-2 font-display text-xl font-bold text-ink-900">
                  Richiedi valutazione
                </h2>
                <p className="mt-1 text-sm text-ink-600">
                  Compila i dati: ti rispondiamo entro la giornata.
                </p>
              </div>
              <ValutazioneForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
