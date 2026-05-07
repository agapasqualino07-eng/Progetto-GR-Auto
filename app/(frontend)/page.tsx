/**
 * Placeholder homepage. Verrà sostituita nella fase 3.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <span className="text-sm font-medium uppercase tracking-wide text-brand-600">
        Fase 1 — setup
      </span>
      <h1 className="text-4xl font-semibold tracking-tight">
        Concessionario Auto
      </h1>
      <p className="text-ink-700">
        Progetto inizializzato. Lo schema CMS è completo: vai su{' '}
        <a className="text-brand-600 underline" href="/admin">
          /admin
        </a>{' '}
        per gestire i veicoli. Il frontend pubblico arriva nella fase 3.
      </p>
      <ul className="list-disc pl-6 text-sm text-ink-500">
        <li>Schema veicoli con tab, conditional fields, hooks</li>
        <li>Bozze + pubblicazione abilitate</li>
        <li>Storage Vercel Blob per le foto</li>
        <li>Admin in italiano</li>
      </ul>
    </main>
  )
}
