# Guida al sito del concessionario

Sito vetrina con CMS integrato per la gestione di veicoli, pagine, lead e
impostazioni. Pensato per essere gestito in autonomia da personale non tecnico.

---

## 1. Panoramica del progetto

### Cosa è stato realizzato
- **Sito pubblico** con homepage, catalogo veicoli, schede dettagliate,
  pagine "Chi siamo / Servizi / Contatti / Vendi la tua auto", privacy e
  cookie policy.
- **CMS integrato** (Payload CMS 3) accessibile su `/admin` per gestire
  veicoli, marche, optional, sedi, pagine, richieste clienti, impostazioni
  del sito e parametri del finanziamento.
- **Design originale** moderno e responsive, tutti i testi sono originali.
- **Form di contatto e valutazione** che generano richieste salvate nel
  CMS con notifica email al concessionario.
- **SEO**: sitemap dinamica, robots.txt, JSON-LD per i veicoli, Open Graph
  image automatica.
- **Performance**: cache statica con invalidazione automatica quando
  un veicolo o una pagina viene modificato, immagini ottimizzate (WebP +
  varianti responsive), font self-hosted (Inter).
- **Accessibilità**: WCAG 2.1 AA come obiettivo, focus visibili, skip link,
  navigazione tastiera, alt text obbligatorio sui media.
- **Localizzazione**: tutti i testi del sito e dell'admin sono in italiano.

### Stack tecnico (per la tua agenzia)
- Next.js 15 (App Router) + TypeScript
- Payload CMS 3 (auto-hosted, stesso progetto)
- PostgreSQL come database
- Vercel Blob per i media
- Tailwind CSS v4

---

## 2. Cosa devi collegare tu

Per portare il sito online ti servono **5 servizi gratuiti o quasi**, tutti
facili da attivare.

### Checklist di attivazione

| # | Servizio | Costo | Tempo | Note |
| --- | --- | --- | --- | --- |
| 1 | **Database Postgres (Neon)** | Gratuito (free tier) | 5 min | Crea progetto, copia connection string |
| 2 | **Hosting (Vercel)** | Gratuito (Hobby) | 10 min | Collega repository GitHub |
| 3 | **Storage media (Vercel Blob)** | Gratuito fino a 1 GB | 2 min | Crea store dal dashboard Vercel |
| 4 | **Email (Resend)** | Gratuito (100 email/giorno) | 15 min | Verifica dominio email |
| 5 | **Dominio** | ~10 €/anno | 5 min | Punta DNS su Vercel |

Totale: **~37 minuti** se hai i credenziali pronti.

---

### 2.1 Database Postgres (Neon) — gratuito

Neon è la soluzione più semplice e veloce.

1. Vai su <https://neon.tech> e registrati con Google o email.
2. Clicca **"Create project"**.
3. **Region**: scegli `Europe (Frankfurt)` per migliore latenza.
4. **Database name**: lascia default (`neondb`) o metti `concessionario`.
5. Una volta creato, copia la **Connection string** (formato:
   `postgresql://user:password@host/dbname?sslmode=require`).
6. Conserva questa stringa: andrà nella variabile `DATABASE_URL`.

> 💡 **Suggerimento**: il free tier di Neon è più che sufficiente per
> ~50 veicoli e qualche migliaio di visite mensili.

---

### 2.2 Hosting (Vercel) — gratuito

1. Vai su <https://vercel.com> e accedi con GitHub.
2. Clicca **"Add New… → Project"**.
3. Seleziona il repository del sito (te lo fornisce la tua agenzia).
4. **Framework preset**: Next.js (rilevato automaticamente).
5. **Environment Variables**: clicca su "Environment Variables" e aggiungi
   tutte quelle indicate al punto 3 di questa guida (NON cliccare ancora
   "Deploy", finisci di compilare le variabili prima).
6. Clicca **"Deploy"**.

Il primo deploy impiega 2–4 minuti.

---

### 2.3 Storage media (Vercel Blob) — gratuito

1. Dal dashboard Vercel, vai sulla scheda **"Storage"**.
2. Clicca **"Create Database" → "Blob"**.
3. **Name**: `concessionario-media`.
4. **Region**: stessa del progetto.
5. Una volta creato, vai sulla scheda **"Settings"** del Blob store e copia
   il `BLOB_READ_WRITE_TOKEN`.
6. Vercel lo aggiunge automaticamente al progetto Next.js. Verifica
   nelle env del progetto.

---

### 2.4 Email transazionali (Resend) — gratuito

Serve per ricevere automaticamente le richieste dei clienti via email.

1. Vai su <https://resend.com> e registrati.
2. **Domains** → **Add Domain**.
3. Inserisci il tuo dominio (es. `concessionario.it`).
4. Resend ti mostra dei record DNS da aggiungere (TXT, MX, CNAME). Copia
   questi record presso il tuo registrar (chi ti ha venduto il dominio).
5. Aspetta che Resend verifichi i record (di solito 5–30 minuti).
6. Vai su **API Keys → Create API Key**, dai un nome (`Sito vetrina`),
   permessi **Sending access**.
7. Copia la chiave API: andrà nella variabile `RESEND_API_KEY`.
8. Imposta in `CONTACT_EMAIL` l'indirizzo che riceverà le richieste
   (es. `info@concessionario.it`).

> ⚠️ **Importante**: il file `lib/utils/email.ts` ha un mittente
> placeholder `noreply@notifiche.example.it`. La tua agenzia deve
> sostituirlo con un mittente del tuo dominio verificato (es.
> `noreply@concessionario.it`).

---

### 2.5 Dominio — ~10 €/anno

Se hai già un dominio, salta direttamente alla configurazione DNS.

**Acquisto** (se non ce l'hai): consigliati [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/),
[Namecheap](https://www.namecheap.com/), o [GoDaddy](https://it.godaddy.com/).

**Configurazione su Vercel**:
1. Dashboard Vercel → tuo progetto → **Settings → Domains**.
2. Inserisci il tuo dominio (es. `concessionario.it`).
3. Vercel ti mostra i record DNS da impostare (`A` o `CNAME`).
4. Vai dal tuo registrar e aggiungi quei record.
5. Aspetta la propagazione (5 min – 24 ore di solito).

---

## 3. Variabili d'ambiente

Ecco le variabili che vanno impostate su Vercel **prima del deploy**.

| Nome | Cosa è | Dove la prendi |
| --- | --- | --- |
| `DATABASE_URL` | Stringa di connessione Postgres | Neon (punto 2.1) |
| `PAYLOAD_SECRET` | Chiave random per firmare i token | Generala con `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico del sito | `https://www.concessionario.it` |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob | Vercel Storage (punto 2.3) |
| `RESEND_API_KEY` | Chiave API Resend | Resend (punto 2.4) |
| `CONTACT_EMAIL` | Email che riceve le richieste | Tu — es. `info@concessionario.it` |

Variabili opzionali:

| Nome | Cosa fa | Quando serve |
| --- | --- | --- |
| `UPSTASH_REDIS_REST_URL` | Rate limit distribuito | Solo se installazione multi-region |
| `UPSTASH_REDIS_REST_TOKEN` | Token Redis | Vedi sopra |

---

## 4. Primo accesso all'admin

Dopo il deploy, vai su `https://tuo-dominio.it/admin`.

### Se hai eseguito il seed (raccomandato)
Usa le credenziali del seed:
- **Email**: `admin@example.it`
- **Password**: `admin12345`

> 🔐 **Cambia la password al primo accesso** dalla pagina del tuo profilo!

### Se non hai eseguito il seed
La prima volta che apri `/admin`, Payload ti chiede di creare l'utente
amministratore. Inserisci email, password e nome.

---

## 5. Come si gestisce un veicolo

### 5.1 Aggiungere un nuovo veicolo

1. Dall'admin, clicca **"Veicoli" → "Crea nuovo"**.
2. Compila i campi nella tab **"Identificativi"**:
   - Lascia il **titolo** vuoto: si genera da solo (Marca + Modello + Allestimento).
   - Lascia lo **slug** vuoto: si genera da solo dal titolo.
   - **Stato**: scegli "Disponibile" (o "Riservato"/"In arrivo" se applicabile).
   - **In evidenza**: spunta se vuoi che appaia in homepage.
3. Tab **"Dati tecnici"**: marca (relazione), modello, allestimento,
   condizione, prima immatricolazione (mese/anno), km, alimentazione,
   cambio, potenza in kW (i CV si calcolano in automatico).
4. Tab **"Colori e interni"**: colore esterno, tipo, materiale interni.
5. Tab **"Prezzo"**: prezzo (obbligatorio), prezzo barrato (per offerte),
   IVA esposta, rata indicativa.
6. Tab **"Descrizione"**: descrizione libera, fino a 6 punti salienti
   ("Tagliandi ufficiali", ecc.) e selezione optional dalla lista.
7. Tab **"Media"**: trascina le foto. **Almeno una foto è obbligatoria**.
   La prima foto è la copertina. Riordina trascinando.
8. Tab **"Sede"**: scegli la sede dove si trova il veicolo. Se ne esiste
   solo una, viene scelta in automatico.
9. Tab **"SEO"** (opzionale): meta title e description personalizzati.
10. **In alto a destra**: clicca **"Salva bozza"** per salvare senza
    pubblicare, o **"Pubblica"** per renderlo visibile sul sito.

### 5.2 Modificare un veicolo

Apri il veicolo dalla lista, modifica, **"Salva"**. Il sito si aggiorna
automaticamente entro pochi secondi.

### 5.3 Duplicare un veicolo

Quando hai un veicolo molto simile a uno già inserito (es. stesso modello
con allestimento diverso):

1. Apri il veicolo originale.
2. Clicca **"Duplica veicolo"** in alto.
3. Si apre la copia in modalità bozza, con foto e codice interno azzerati.
4. Modifica solo i campi diversi e pubblica.

### 5.4 Marcare più veicoli come venduti (in massa)

1. Vai sulla lista veicoli.
2. Spunta i veicoli selezionati.
3. In alto trovi la barra **"Azioni massive sui selezionati"**.
4. Scegli "Venduto" e clicca **"Applica"**.

### 5.5 Mostrare/togliere un veicolo dalla home

Apri il veicolo, vai sulla sidebar destra, spunta o togli **"In evidenza"**.
Massimo 8 veicoli featured appaiono in homepage.

### 5.6 Bozze e pubblicazione

- I veicoli con stato `Bozza` **non sono visibili** sul sito pubblico.
- Cliccando "Pubblica" il veicolo diventa visibile entro pochi secondi.
- Se vuoi rimuovere un veicolo dal sito ma non eliminarlo, riportalo a
  bozza (non è disponibile direttamente: per ora cancella o cambia stato a
  "Venduto").

---

## 6. Come si gestiscono le richieste dei clienti

Quando un cliente compila un form sul sito (info, test drive, valutazione),
ricevi:

1. **Una notifica email** all'indirizzo `CONTACT_EMAIL`.
2. **Un nuovo record** nella sezione **"Richieste"** dell'admin.

### Workflow consigliato

1. Apri **"Richieste"** dall'admin.
2. Filtra per stato `Nuovo` per vedere quelli da gestire.
3. Apri la richiesta, contatta il cliente.
4. Cambia lo stato in `Contattato`.
5. Quando la pratica è chiusa (positivamente o negativamente), sposta a
   `Chiuso` e aggiungi note nel campo libero.

> 💡 La dashboard dell'admin mostra le ultime 5 richieste nuove degli
> ultimi 7 giorni come scorciatoia.

---

## 7. Dashboard admin

La home dell'admin mostra:
- **Contatori**: veicoli pubblicati, veicoli in bozza, veicoli venduti,
  lead nuovi degli ultimi 7 giorni.
- **Alert**: veicoli senza foto e veicoli senza prezzo (devono essere
  corretti prima di pubblicarli).
- **Ultimi lead**: per accesso rapido.
- **Quick actions**: "Aggiungi veicolo", "Vedi lead nuovi", "Bozze da
  pubblicare".

---

## 8. Pagine del sito

Le pagine `/chi-siamo`, `/servizi`, `/privacy`, `/cookie` sono modificabili
dall'admin nella sezione **"Pagine"**.

Ogni pagina è composta da blocchi che puoi trascinare e ordinare:

| Blocco | A cosa serve |
| --- | --- |
| **Hero** | Sezione di apertura con titolo grande, sottotitolo, immagine, pulsanti |
| **Sezione testo** | Paragrafo con titolo opzionale, allineamento sinistra/centro |
| **Griglia immagini** | Galleria di foto con didascalia |
| **CTA (Call to action)** | Banner colorato con titolo + pulsante |
| **FAQ** | Lista di domande/risposte cliccabili |
| **Testimonianze** | Recensioni con autore, ruolo, voto |

Per pubblicare una nuova pagina:
1. Crea con slug `chi-siamo` (lo slug determina l'URL: `/chi-siamo`).
2. Aggiungi i blocchi che vuoi.
3. Pubblica.

> ⚠️ Le pagine `privacy` e `cookie` hanno un fallback automatico se non le
> compili: mostrano un placeholder generico. Sostituiscile con i testi reali
> redatti dal tuo legale.

---

## 9. Impostazioni del sito

Sezione **"Configurazione → Sito"** dell'admin:

- **Identità**: nome, tagline, logo, favicon
- **Brand**: colore primario, colore accento (per personalizzare il tema)
- **Contatti**: telefono, WhatsApp, email
- **Social**: Facebook, Instagram, YouTube, TikTok, LinkedIn
- **Legale**: ragione sociale, P.IVA, REA, testo footer

Sezione **"Configurazione → Finanziamento"**:

- **TAN/TAEG di default** per il calcolatore rata
- **Anticipo % di default**
- **Durata di default** (es. 60 mesi)
- **Durate selezionabili** dal cliente (es. 24, 36, 48, 60, 72, 84)
- **Disclaimer** mostrato sotto il calcolo

> 💡 Modifiche a queste impostazioni si propagano a **tutte le pagine veicolo**
> entro pochi secondi.

---

## 10. Manutenzione (per la tua agenzia tecnica)

### Comandi utili

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Avvio in sviluppo (hot reload) |
| `npm run build` | Build produzione (controlla che non ci siano errori) |
| `npm run start` | Avvio del server build (per testare la build localmente) |
| `npm run type-check` | Verifica TypeScript |
| `npm run generate:types` | Rigenera `payload-types.ts` dopo modifiche allo schema |
| `npm run seed` | Popola il database con dati demo (solo prima volta!) |

### Aggiungere una nuova marca o un nuovo optional

Si fa **dall'admin**, nelle sezioni "Marche" e "Optional". Il seed iniziale
ne ha già inserite 30 + 50.

### Cambiare lo schema dei veicoli (campo nuovo, ecc.)

1. Modifica `lib/payload/collections/Vehicles.ts`.
2. Lancia `npm run generate:types` per aggiornare i tipi TypeScript.
3. Lancia `npm run build` per verificare che tutto compili.
4. Deploy via push su Git: Vercel costruisce automaticamente.

### Backup database

Neon fa backup automatici su tutti i piani (anche free). Per backup manuali:
`pg_dump` con la connection string del database.

### Backup media

Vercel Blob ha replica automatica multi-region. I file restano fino a
quando li elimini esplicitamente.

---

## 11. Sicurezza e privacy

- **Honeypot anti-spam** sui form pubblici (campo nascosto che bot
  riempiono per errore — se compilato, la richiesta è scartata).
- **Rate limiting** in-memory: massimo 5 richieste/min per IP sui form
  pubblici.
- **Cookie banner** minimale: il sito usa solo cookie tecnici essenziali e
  Plausible Analytics (statistiche aggregate anonime, conformi GDPR senza
  consenso).
- **Niente integrazioni esterne** automatiche: nessun feed XML, nessuna
  sincronizzazione con Subito.it o gestionali. Il sito è autosufficiente.
- **GDPR**: privacy/cookie policy presenti come placeholder. **Da
  sostituire con testi redatti da legale prima del go-live**.
- **Privacy by design**: i media hanno alt text obbligatorio, i form
  raccolgono solo i dati strettamente necessari, ogni richiesta tiene un
  "snapshot" del veicolo per resilienza nel caso il veicolo venga
  cancellato.

---

## 12. Roadmap di evoluzione (idee future)

Cose **non incluse** in questa versione, ma facili da aggiungere se servirà:

- **Google Search Console**: per monitoraggio SEO. Basta verificare il
  dominio (file html o meta tag).
- **Plausible Analytics**: aggiungere lo script `<script defer
  data-domain="…" src="…">` nel `app/layout.tsx`.
- **Newsletter**: integrazione con Mailchimp/Brevo.
- **Form preventivo finanziamento step-by-step**: wizard più lungo del form
  attuale.
- **Multi-lingua**: lo scaffolding next-intl è predisposto (IT/EN), basta
  attivare il routing localizzato.
- **Notifiche WhatsApp** allo staff per le nuove richieste (via servizio
  esterno tipo Twilio o WAGSL).

---

## 13. Quando contattare la tua agenzia tecnica

- Modifiche allo schema CMS (campi nuovi, tab nuove).
- Modifiche al design (colori, font, layout).
- Aggiornamenti di sicurezza (Next.js, Payload, dipendenze).
- Migrazione da Neon free → paid se cresci oltre 1 GB di dati.
- Aggiunta di integrazioni (analytics avanzato, CRM, ecc.).

Per le **operazioni quotidiane** (gestione veicoli, lead, contenuti, foto)
non hai bisogno di nessun tecnico.

---

## Appendice — Struttura file principali

Per la tua agenzia, i file più importanti da conoscere:

```
/payload.config.ts                        configurazione CMS
/lib/payload/collections/Vehicles.ts      schema veicoli
/lib/payload/collections/Pages.ts         schema pagine
/lib/payload/collections/Leads.ts         schema richieste
/lib/payload/globals/SiteSettings.ts      impostazioni sito
/lib/payload/globals/FinanceSettings.ts   parametri finanziamento
/lib/payload/queries.ts                   query verso il CMS dal frontend
/app/(frontend)/page.tsx                  homepage
/app/(frontend)/veicoli/page.tsx          catalogo
/app/(frontend)/veicoli/[slug]/page.tsx   scheda veicolo
/app/api/lead/route.ts                    endpoint form contatti
/app/api/valutazione/route.ts             endpoint form valutazione
/components/                              tutti i componenti UI
/scripts/seed.ts                          script di popolamento iniziale
```
