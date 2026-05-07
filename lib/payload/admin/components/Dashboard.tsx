import React from 'react'
import { getPayload } from '@/lib/payload/getPayload'

const StatCard: React.FC<{
  label: string
  value: number | string
  hint?: string
  tone?: 'default' | 'warn' | 'danger' | 'ok'
}> = ({ label, value, hint, tone = 'default' }) => {
  const tones: Record<string, { bg: string; fg: string }> = {
    default: { bg: 'var(--theme-elevation-50)', fg: 'inherit' },
    ok: { bg: '#dcfce7', fg: '#166534' },
    warn: { bg: '#fef3c7', fg: '#854d0e' },
    danger: { bg: '#fee2e2', fg: '#991b1b' },
  }
  const t = tones[tone]
  return (
    <div
      style={{
        background: t.bg,
        color: t.fg,
        padding: 16,
        borderRadius: 8,
        border: '1px solid var(--theme-elevation-100)',
        flex: '1 1 200px',
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.75, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>{value}</div>
      {hint ? (
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{hint}</div>
      ) : null}
    </div>
  )
}

/**
 * Dashboard custom mostrata sopra l'homepage admin.
 * Si carica direttamente via Local API (server component).
 */
export const AdminDashboard: React.FC = async () => {
  const payload = await getPayload()

  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000,
  ).toISOString()

  const [
    published,
    drafts,
    sold,
    missingPhotos,
    missingPrice,
    recentLeads,
  ] = await Promise.all([
    payload.count({ collection: 'vehicles', where: { _status: { equals: 'published' } } }),
    payload.count({ collection: 'vehicles', where: { _status: { equals: 'draft' } } }),
    payload.count({ collection: 'vehicles', where: { status: { equals: 'venduto' } } }),
    payload.find({
      collection: 'vehicles',
      depth: 0,
      limit: 5,
      where: {
        or: [
          { 'gallery.0.image': { exists: false } as never },
          { gallery: { equals: null } },
        ],
      },
    }),
    payload.find({
      collection: 'vehicles',
      depth: 0,
      limit: 5,
      where: { price: { equals: 0 } },
    }),
    payload.find({
      collection: 'leads',
      depth: 1,
      limit: 5,
      sort: '-createdAt',
      where: {
        and: [
          { status: { equals: 'nuovo' } },
          { createdAt: { greater_than: sevenDaysAgo } },
        ],
      },
    }),
  ])

  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ marginTop: 0, marginBottom: 16 }}>Panoramica</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <StatCard
          label="Veicoli pubblicati"
          value={published.totalDocs}
          tone="ok"
          hint="Visibili sul sito"
        />
        <StatCard
          label="Veicoli in bozza"
          value={drafts.totalDocs}
          tone="warn"
          hint="Da pubblicare"
        />
        <StatCard
          label="Venduti"
          value={sold.totalDocs}
          hint="Stato: venduto"
        />
        <StatCard
          label="Lead nuovi (7g)"
          value={recentLeads.totalDocs}
          tone={recentLeads.totalDocs > 0 ? 'ok' : 'default'}
          hint="In stato 'nuovo'"
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          marginBottom: 16,
        }}
      >
        {missingPhotos.totalDocs > 0 ? (
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              background: '#fef3c7',
              border: '1px solid #fde68a',
            }}
          >
            <strong>Veicoli senza foto ({missingPhotos.totalDocs})</strong>
            <p style={{ margin: '6px 0 0 0', fontSize: 13 }}>
              Aggiungi almeno una foto per poterli pubblicare.
            </p>
            <ul style={{ margin: '8px 0 0 16px', fontSize: 13 }}>
              {missingPhotos.docs.map((v) => (
                <li key={String(v.id)}>
                  <a href={`/admin/collections/vehicles/${v.id}`}>{v.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {missingPrice.totalDocs > 0 ? (
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              background: '#fee2e2',
              border: '1px solid #fecaca',
            }}
          >
            <strong>Veicoli senza prezzo ({missingPrice.totalDocs})</strong>
            <p style={{ margin: '6px 0 0 0', fontSize: 13 }}>
              Imposta un prezzo prima di pubblicare.
            </p>
            <ul style={{ margin: '8px 0 0 16px', fontSize: 13 }}>
              {missingPrice.docs.map((v) => (
                <li key={String(v.id)}>
                  <a href={`/admin/collections/vehicles/${v.id}`}>{v.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {recentLeads.totalDocs > 0 ? (
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              background: '#dbeafe',
              border: '1px solid #bfdbfe',
            }}
          >
            <strong>Ultimi lead in arrivo</strong>
            <ul style={{ margin: '8px 0 0 16px', fontSize: 13 }}>
              {recentLeads.docs.map((l) => (
                <li key={String(l.id)}>
                  <a href={`/admin/collections/leads/${l.id}`}>
                    {l.name} — {l.type}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a
          href="/admin/collections/vehicles/create"
          className="btn btn--style-primary btn--size-small"
        >
          + Aggiungi veicolo
        </a>
        <a
          href="/admin/collections/leads?where[status][equals]=nuovo"
          className="btn btn--style-secondary btn--size-small"
        >
          Vedi lead nuovi
        </a>
        <a
          href="/admin/collections/vehicles?where[_status][equals]=draft"
          className="btn btn--style-secondary btn--size-small"
        >
          Bozze da pubblicare
        </a>
      </div>
    </section>
  )
}

export default AdminDashboard
