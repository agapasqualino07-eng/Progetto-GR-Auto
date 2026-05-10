import {
  ShieldCheck,
  Coins,
  ArrowLeftRight,
  ClipboardCheck,
} from 'lucide-react'

const items = [
  {
    icon: ShieldCheck,
    title: 'Garanzia inclusa',
    body:
      'Ogni veicolo è coperto da garanzia con possibilità di estensione fino a 36 mesi.',
  },
  {
    icon: Coins,
    title: 'Finanziamento su misura',
    body:
      'Rate sostenibili, preventivo trasparente, pratica veloce con i nostri partner.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Permuta valutata',
    body:
      'Portaci la tua auto: la valutiamo gratuitamente entro la giornata.',
  },
  {
    icon: ClipboardCheck,
    title: 'Controlli punto per punto',
    body:
      "Diagnosi, storia tagliandi, controllo struttura: nessuna sorpresa dopo l'acquisto.",
  },
]

export function Services() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon
        return (
          <li
            key={it.title}
            className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-300 hover:shadow-card-hover"
          >
            {/* Glow rosso al hover, top-right */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/0 blur-2xl transition-all duration-500 group-hover:bg-brand-500/15"
            />
            <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-ink-900 text-white shadow-card transition-all duration-300 group-hover:bg-brand-600 group-hover:shadow-cta">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="relative mt-5 font-display text-lg font-bold text-ink-900">
              {it.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-ink-600">
              {it.body}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
