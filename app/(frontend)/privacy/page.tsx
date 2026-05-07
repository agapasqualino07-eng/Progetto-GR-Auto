import type { Metadata } from 'next'
import { getPageBySlug } from '@/lib/payload/queries'
import { Blocks } from '@/components/payload/Blocks'
import { Section } from '@/components/ui/section'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy policy',
  robots: { index: false, follow: false },
}

const fallback = (
  <Section className="prose-sm max-w-3xl py-12 sm:py-16">
    <h1 className="text-3xl font-semibold tracking-tight">Privacy policy</h1>
    <p className="mt-4 text-ink-700">
      Questa pagina è un placeholder. Il titolare deve sostituirla con la
      propria informativa privacy aggiornata, redatta in conformità al
      Regolamento (UE) 2016/679 (GDPR) e al D.lgs. 196/2003 e ss.mm.ii.
    </p>
    <h2 className="mt-6 text-xl font-semibold">Titolare del trattamento</h2>
    <p className="text-ink-700">
      Indicare ragione sociale, sede legale, P.IVA, REA e contatti del titolare.
    </p>
    <h2 className="mt-6 text-xl font-semibold">Tipologie di dati raccolti</h2>
    <p className="text-ink-700">
      Dati di contatto forniti volontariamente (nome, email, telefono) per
      richieste informazioni, prenotazioni test drive, valutazioni dell&apos;usato.
    </p>
    <h2 className="mt-6 text-xl font-semibold">Diritti dell&apos;interessato</h2>
    <p className="text-ink-700">
      Accesso, rettifica, cancellazione, limitazione, portabilità,
      opposizione, reclamo all&apos;Autorità Garante per la protezione dei dati
      personali.
    </p>
  </Section>
)

export default async function PrivacyPage() {
  const page = await getPageBySlug('privacy')
  if (page?.layout && Array.isArray(page.layout) && page.layout.length > 0) {
    return <Blocks blocks={page.layout as unknown[]} />
  }
  return fallback
}
