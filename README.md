# Concessionario Auto — Sito vetrina + CMS

Sito web per concessionario di auto usate / km 0 con CMS integrato. Il cliente
gestisce in autonomia veicoli, pagine, lead e impostazioni dall'admin.

> Stato: **Fase 3 — frontend pubblico pronto.**
> Build verificato (`next build` OK). Le fasi rimanenti (polish UX,
> performance, SEO avanzato, README cliente, seed) verranno aggiunte
> man mano.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Payload CMS 3 (admin nello stesso progetto)
- PostgreSQL (Neon free tier consigliato)
- Vercel Blob (storage media)
- Tailwind CSS v4
- Lexical editor per il rich text

## Setup locale

1. **Node 20.9+**
2. Crea un database Postgres (Neon, Supabase, Postgres locale...) e copia la
   connection string.
3. Copia `.env.example` in `.env` e compila almeno:

   ```env
   DATABASE_URL=postgres://...
   PAYLOAD_SECRET=stringa-lunga-casuale
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Per upload reali su Vercel Blob, imposta `BLOB_READ_WRITE_TOKEN`. Senza
   token i media restano salvati in locale (modalità di sviluppo).

4. Installa le dipendenze e genera i tipi Payload:

   ```bash
   npm install
   npm run generate:types
   ```

5. Avvia in dev:

   ```bash
   npm run dev
   ```

   - Sito pubblico: <http://localhost:3000>
   - Admin Payload: <http://localhost:3000/admin> (al primo accesso crei
     l'utente amministratore)

## Struttura progetto

```
/app
  /(frontend)         pagine pubbliche (in costruzione)
  /(payload)
    /admin            UI admin Payload
    /api/[...slug]    REST Payload
/lib
  /payload
    /collections      Vehicles, Users, Media, Makes, Optionals, ...
    /globals          siteSettings, financeSettings
    /blocks           blocchi modulari per le Pagine
    /hooks            beforeChange, afterChange (revalidate)
    /access           helper per i ruoli admin/editor
  /i18n               predisposizione next-intl (IT + EN, attiva solo IT)
  /utils              format, slugify
payload.config.ts     configurazione Payload
```

## Schema implementato in fase 1

### Collections
| Slug | Descrizione |
| --- | --- |
| `users` | Account admin/editor con ruoli |
| `media` | Upload Vercel Blob, varianti responsive (thumbnail/card/full/hero), WebP, alt text obbligatorio |
| `makes` | Marche pre-popolate al seed |
| `optionals` | Optional categorizzati (~50 voci pre-popolate al seed) |
| `locations` | Sedi del concessionario con coordinate per la mappa |
| `vehicles` | Schema veicoli completo: tab, conditional fields, draft/publish |
| `leads` | Richieste informazioni / test drive / valutazione / finanziamento |
| `pages` | Pagine statiche con blocchi modulari (Hero, TextSection, ImageGrid, CTA, FAQ, Testimonials) |

### Globals
- `siteSettings` — identità, brand, contatti, social, legali, footer
- `financeSettings` — TAN, TAEG, anticipo, durate selezionabili, disclaimer

### Veicoli — caratteristiche admin già attive
- 8 tab dedicate (Identificativi, Dati tecnici, Colori e interni, Prezzo, Descrizione, Media, Sede, SEO)
- Campo `displacement` nascosto se `fuel === 'elettrica'` (conditional field)
- Auto-calcoli in `beforeChange`:
  - `title` ← `marca + modello + allestimento`
  - `slug` ← `slugify(title)`
  - `powerCv` ← `powerKw × 1.36` (sovrascrivibile manualmente)
- Default `location` automatico se è presente una sola sede
- Galleria array drag&drop con minimo 1 foto
- Draft/Publish con autosave
- Cache statica del sito invalidata via `revalidatePath` su `afterChange` / `afterDelete`

## Ruoli

- `admin` — accesso completo a tutto, incluse impostazioni e utenti
- `editor` — gestisce veicoli, pagine, lead, ma non utenti né global critici

## Comandi

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Avvio in sviluppo |
| `npm run build` | Build produzione |
| `npm run start` | Avvio del server build |
| `npm run lint` | ESLint |
| `npm run type-check` | `tsc --noEmit` |
| `npm run generate:types` | Genera `payload-types.ts` dallo schema |
| `npm run seed` | (Fase 5) popola il database con dati demo |

## Variabili d'ambiente

| Nome | Obbligatoria | Note |
| --- | --- | --- |
| `DATABASE_URL` | sì | Postgres connection string (Neon consigliato) |
| `PAYLOAD_SECRET` | sì | Stringa casuale lunga (≥ 32 caratteri) |
| `NEXT_PUBLIC_SITE_URL` | sì | URL pubblico del sito (es. `https://concessionario.it`) |
| `BLOB_READ_WRITE_TOKEN` | sì in produzione | Token Vercel Blob |
| `RESEND_API_KEY` | sì in produzione | Per email transazionali |
| `CONTACT_EMAIL` | sì | Indirizzo che riceve i lead |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | no | Rate limiting (fase 3) |

## Funzionalità admin avanzate (Fase 2)

- **Dashboard custom** sopra l'homepage admin: contatori (pubblicati / bozze /
  venduti / lead nuovi 7g), alert "veicoli senza foto" e "veicoli senza
  prezzo", lista degli ultimi 5 lead nuovi, quick actions ("+ Aggiungi
  veicolo", "Vedi lead nuovi", "Bozze da pubblicare").
- **List view veicoli personalizzata**:
  - Thumbnail 60×60 della prima foto (campo `gallery`)
  - Prezzo formattato in EUR, chilometri formattati con separatore italiano
  - Data di prima immatricolazione in formato `MM/YYYY`
  - Stato come **badge colorato** (verde/giallo/rosso/blu)
  - "In evidenza" come **icona stella** dorata
- **Bulk action "Cambia stato"**: toolbar `beforeListTable` con select
  (Disponibile / Riservato / Venduto / In arrivo) e conferma. Aggiorna in massa
  i veicoli selezionati via `PATCH /api/vehicles?where=...`.
- **Duplica veicolo**:
  - Endpoint `POST /api/vehicles/:id/duplicate` (admin/editor only)
  - Crea il duplicato come **bozza**, prefissa il titolo con "(copia)",
    azzera `slug`, `internalCode` e `gallery`
  - Bottone "Duplica veicolo" nella edit view (slot
    `edit.beforeDocumentControls`) che chiama l'endpoint e apre la copia
- **Cache statica del sito**: `revalidatePath('/veicoli')`,
  `revalidatePath('/veicoli/[slug]')`, `revalidatePath('/')` su
  `afterChange`/`afterDelete` dei veicoli.

## Frontend pubblico (Fase 3)

### Routing
| Route | Descrizione |
| --- | --- |
| `/` | Homepage con Hero + ricerca rapida, "In evidenza", categorie, servizi, CTA |
| `/veicoli` | Catalogo con filtri laterali sticky/drawer, sort, paginazione 12 client-side, URL stateful |
| `/veicoli/[slug]` | Scheda dettaglio: galleria Embla + lightbox, sticky sidebar prezzo/CTA/finance calc, tabs (Caratteristiche/Optional/Descrizione/Sede), mappa Leaflet, simili, JSON-LD `Vehicle` |
| `/chi-siamo`, `/servizi`, `/privacy`, `/cookie` | Pagine pilotate dal CMS (`pages` collection) con blocchi modulari (Hero/TextSection/ImageGrid/CTA/FAQ/Testimonials) |
| `/contatti` | Form lead + dati sede + canali rapidi |
| `/vendi-la-tua-auto` | Form valutazione usato + step process |
| `/sitemap.xml`, `/robots.txt` | Generati dinamicamente |

### API
| Endpoint | Descrizione |
| --- | --- |
| `POST /api/lead` | Crea lead (info / test-drive / finanziamento), email a `CONTACT_EMAIL` via Resend, honeypot + rate limit 5/min/IP, snapshot del veicolo per resilienza |
| `POST /api/valutazione` | Lead di tipo `valutazione` con dati auto del cliente |

### UX e accessibilità
- Filtri client-side: marca + modello dipendente, prezzo/anno/km range, alimentazione/cambio/carrozzeria/condizione (checkbox), search Fuse.js
- URL stateful: `?marca=bmw&prezzo_max=20000&p=2&ordine=prezzo-asc` (deep link condivisibile)
- Mobile drawer per i filtri sotto i 1024px
- WhatsApp deep link con messaggio precompilato (testo veicolo)
- Schema.org `Vehicle` JSON-LD su ogni scheda
- Open Graph image automatica (prima foto galleria)

### Decisioni tecniche
- Tutte le pagine Payload-driven sono `dynamic = 'force-dynamic'`: cache reale gestita via `unstable_cache` con tag `vehicles`/`site`/`finance`/`pages` invalidati dagli hook Payload
- Mappa Leaflet caricata via `next/dynamic` lato client (`LocationMapLazy`)
- Email transazionali graceful: se `RESEND_API_KEY` non è impostata, log a console e nessun fail

## Roadmap

- [x] **Fase 1** — setup progetto + schema CMS completo
- [x] **Fase 2** — admin avanzato: dashboard, duplica veicolo, bulk actions,
      list view veicoli personalizzata
- [x] **Fase 3** — frontend pubblico: homepage, catalogo, scheda dettaglio,
      pagine, form lead, sitemap e robots
- [ ] **Fase 4** — polish UX, performance, SEO, accessibilità, README per il
      cliente con screenshot
- [ ] **Fase 5** — seed script (marche, optional, location, veicoli demo)
