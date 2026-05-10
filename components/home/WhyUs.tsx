import { Award, Wrench, Users, Heart } from 'lucide-react'

const usps = [
  {
    icon: Award,
    title: 'Selezione attenta',
    body:
      'Solo veicoli che acquisteremmo per noi: storia certa, manutenzione regolare.',
  },
  {
    icon: Wrench,
    title: 'Officina interna',
    body:
      'Diagnosi, tagliandi e preparazione: ogni auto esce pronta per la strada.',
  },
  {
    icon: Users,
    title: 'Consulenza dedicata',
    body:
      'Un consulente di riferimento che ti segue dalla scelta al post-vendita.',
  },
  {
    icon: Heart,
    title: 'Trasparenza totale',
    body:
      'Prezzo chiaro, condizioni esposte, nessuna sorpresa al momento del contratto.',
  },
]

export function WhyUs() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {usps.map((u) => {
        const Icon = u.icon
        return (
          <li key={u.title} className="bg-ink-900 p-7 sm:p-8">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-600 text-white shadow-cta">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-white">
              {u.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {u.body}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
