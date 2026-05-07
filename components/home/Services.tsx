import { ShieldCheck, Coins, ArrowLeftRight, ClipboardCheck } from 'lucide-react'

const items = [
  {
    icon: ShieldCheck,
    title: 'Garanzia inclusa',
    body: 'Ogni veicolo è coperto da garanzia con possibilità di estensione fino a 36 mesi.',
  },
  {
    icon: Coins,
    title: 'Finanziamento su misura',
    body: 'Rate sostenibili, preventivo trasparente, pratica veloce con i nostri partner.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Permuta valutata',
    body: 'Portaci la tua auto: la valutiamo gratuitamente entro la giornata.',
  },
  {
    icon: ClipboardCheck,
    title: 'Controlli punto per punto',
    body: 'Diagnosi, storia tagliandi, controllo struttura: nessuna sorpresa dopo l\'acquisto.',
  },
]

export function Services() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon
        return (
          <li
            key={it.title}
            className="rounded-xl border border-ink-200 bg-white p-5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-700">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-ink-900">
              {it.title}
            </h3>
            <p className="mt-1 text-sm text-ink-700">{it.body}</p>
          </li>
        )
      })}
    </ul>
  )
}
