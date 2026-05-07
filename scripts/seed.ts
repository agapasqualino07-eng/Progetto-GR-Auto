/**
 * Seed script per popolare il database con dati demo.
 * Esegui con: `npm run seed`
 *
 * Crea:
 *  - 30 marche più diffuse in Italia
 *  - ~50 optional categorizzati
 *  - 1 sede di esempio
 *  - 5 veicoli published + 2 in bozza
 *  - 1 utente admin (admin@example.it / admin12345 — da cambiare al primo login)
 *  - siteSettings + financeSettings con valori di partenza
 *  - 4 pagine CMS (chi-siamo, servizi, privacy, cookie) con contenuti placeholder
 *
 * Idempotente: salta i record già esistenti (per slug/email/name).
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'
import { slugify } from '../lib/utils/format.js'

const MAKES = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Fiat', 'Alfa Romeo', 'Ford',
  'Opel', 'Peugeot', 'Renault', 'Citroën', 'Toyota', 'Nissan', 'Hyundai',
  'Kia', 'Volvo', 'Skoda', 'SEAT', 'Mini', 'Jeep', 'Land Rover', 'Porsche',
  'Tesla', 'Dacia', 'Mazda', 'Suzuki', 'Honda', 'Lancia', 'DS Automobiles',
  'Cupra',
]

const OPTIONALS: { name: string; category: string }[] = [
  { name: 'Climatizzatore automatico bizona', category: 'comfort' },
  { name: 'Climatizzatore automatico trizona', category: 'comfort' },
  { name: 'Sedili riscaldati anteriori', category: 'comfort' },
  { name: 'Sedili ventilati', category: 'comfort' },
  { name: 'Sedili in pelle', category: 'comfort' },
  { name: 'Tetto panoramico', category: 'comfort' },
  { name: 'Tetto apribile', category: 'comfort' },
  { name: 'Volante riscaldato', category: 'comfort' },
  { name: 'Cruise control adattivo', category: 'assistenza-guida' },
  { name: 'Cruise control', category: 'assistenza-guida' },
  { name: 'Mantenimento corsia', category: 'assistenza-guida' },
  { name: 'Riconoscimento segnaletica', category: 'assistenza-guida' },
  { name: 'Frenata automatica di emergenza', category: 'sicurezza' },
  { name: 'Sensori parcheggio anteriori', category: 'assistenza-guida' },
  { name: 'Sensori parcheggio posteriori', category: 'assistenza-guida' },
  { name: 'Telecamera posteriore', category: 'assistenza-guida' },
  { name: 'Telecamera 360°', category: 'assistenza-guida' },
  { name: 'Park assist', category: 'assistenza-guida' },
  { name: 'Head-up display', category: 'multimedia' },
  { name: 'Navigatore', category: 'multimedia' },
  { name: 'Apple CarPlay', category: 'multimedia' },
  { name: 'Android Auto', category: 'multimedia' },
  { name: 'Bluetooth', category: 'multimedia' },
  { name: 'Caricatore wireless smartphone', category: 'multimedia' },
  { name: 'Sistema audio premium', category: 'multimedia' },
  { name: 'Schermo touch', category: 'multimedia' },
  { name: 'Display digitale strumentazione', category: 'multimedia' },
  { name: 'ABS', category: 'sicurezza' },
  { name: 'ESP', category: 'sicurezza' },
  { name: 'Airbag laterali', category: 'sicurezza' },
  { name: 'Airbag a tendina', category: 'sicurezza' },
  { name: 'ISOFIX', category: 'sicurezza' },
  { name: 'Allarme', category: 'sicurezza' },
  { name: 'Cerchi in lega', category: 'esterni' },
  { name: 'Cerchi in lega 18"', category: 'esterni' },
  { name: 'Cerchi in lega 19"', category: 'esterni' },
  { name: 'Fari LED', category: 'esterni' },
  { name: 'Fari Matrix LED', category: 'esterni' },
  { name: 'Fari fendinebbia', category: 'esterni' },
  { name: 'Vetri oscurati', category: 'esterni' },
  { name: 'Specchietti elettrici riscaldati', category: 'esterni' },
  { name: 'Barre tetto', category: 'esterni' },
  { name: 'Gancio traino', category: 'esterni' },
  { name: 'Portellone elettrico', category: 'esterni' },
  { name: 'Pacchetto Sport', category: 'esterni' },
  { name: 'Volante in pelle', category: 'interni' },
  { name: 'Pedaliera in alluminio', category: 'interni' },
  { name: 'Inserti in legno', category: 'interni' },
  { name: 'Illuminazione ambient', category: 'interni' },
  { name: 'Bracciolo posteriore', category: 'interni' },
  { name: 'Bagagliaio elettrico', category: 'interni' },
]

const PAGES = [
  {
    slug: 'chi-siamo',
    title: 'Chi siamo',
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Chi siamo',
        heading: 'Una squadra che ascolta, prima di vendere.',
        subheading:
          'Da anni accompagniamo automobilisti italiani nella scelta dell\'auto giusta: usato selezionato, km 0 e aziendali con storia chiara.',
      },
      {
        blockType: 'textSection',
        heading: 'La nostra promessa',
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text:
                      'Trasparenza, garanzia e assistenza. Ogni veicolo è ispezionato con check-list interna e venduto con garanzia. Niente sorprese, niente clausole a sorpresa.',
                  },
                ],
              },
            ],
            version: 1,
          },
        },
      },
    ],
  },
  {
    slug: 'servizi',
    title: 'Servizi',
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Servizi',
        heading: 'Vendita, finanziamento, permuta. E un partner per la manutenzione.',
      },
      {
        blockType: 'faq',
        heading: 'Domande frequenti',
        items: [
          {
            question: 'Posso permutare la mia auto?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      { type: 'text', version: 1, text: 'Sì. Compila il form di valutazione e ti rispondiamo entro la giornata.' },
                    ],
                  },
                ],
                version: 1,
              },
            },
          },
          {
            question: 'Offrite garanzia?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      { type: 'text', version: 1, text: 'Tutti i veicoli sono coperti da garanzia legale. Estensioni fino a 36 mesi su richiesta.' },
                    ],
                  },
                ],
                version: 1,
              },
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy policy',
    layout: [
      {
        blockType: 'textSection',
        heading: 'Privacy policy',
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Sostituire questo testo con l\'informativa privacy aggiornata redatta in conformità al GDPR. Da redigere a cura del concessionario o di un legale.',
                  },
                ],
              },
            ],
            version: 1,
          },
        },
      },
    ],
  },
  {
    slug: 'cookie',
    title: 'Cookie policy',
    layout: [
      {
        blockType: 'textSection',
        heading: 'Cookie policy',
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Il sito utilizza esclusivamente cookie tecnici essenziali. Statistiche aggregate anonime con Plausible Analytics, senza profilazione.',
                  },
                ],
              },
            ],
            version: 1,
          },
        },
      },
    ],
  },
]

type DemoVehicle = {
  status: 'draft' | 'published'
  status_field: 'disponibile' | 'riservato' | 'in-arrivo'
  featured: boolean
  make: string
  model: string
  trim?: string
  condition: 'usato' | 'km0' | 'aziendale' | 'nuovo'
  firstRegistration: string
  mileage: number
  fuel:
    | 'benzina'
    | 'diesel'
    | 'gpl'
    | 'metano'
    | 'ibrida'
    | 'ibrida-plug-in'
    | 'elettrica'
  transmission: 'manuale' | 'automatico' | 'semiautomatico'
  displacement?: number
  powerKw: number
  drivetrain?: 'anteriore' | 'posteriore' | 'integrale'
  doors?: number
  seats?: number
  bodyType?:
    | 'berlina'
    | 'station-wagon'
    | 'suv'
    | 'crossover'
    | 'coupe'
    | 'cabrio'
    | 'monovolume'
    | 'city-car'
    | 'pick-up'
  exteriorColor?: string
  interiorMaterial?: 'tessuto' | 'pelle' | 'pelle-tessuto' | 'alcantara' | 'pelle-alcantara'
  price: number
  priceStrikethrough?: number
  financingMonthly?: number
  highlights: string[]
  optionals: string[]
  picsumSeeds: string[]
}

const VEHICLES: DemoVehicle[] = [
  {
    status: 'published',
    status_field: 'disponibile',
    featured: true,
    make: 'BMW',
    model: 'Serie 3',
    trim: '320d xDrive Msport',
    condition: 'usato',
    firstRegistration: '2021-04-01',
    mileage: 62000,
    fuel: 'diesel',
    transmission: 'automatico',
    displacement: 1995,
    powerKw: 140,
    drivetrain: 'integrale',
    doors: 4,
    seats: 5,
    bodyType: 'berlina',
    exteriorColor: 'Grigio Mineral',
    interiorMaterial: 'pelle',
    price: 28900,
    priceStrikethrough: 31500,
    financingMonthly: 339,
    highlights: ['Tagliandi ufficiali', 'Garanzia 24 mesi', 'Singolo proprietario'],
    optionals: [
      'Cruise control adattivo',
      'Navigatore',
      'Apple CarPlay',
      'Sensori parcheggio posteriori',
      'Telecamera posteriore',
      'Sedili riscaldati anteriori',
      'Fari LED',
      'Cerchi in lega 18"',
    ],
    picsumSeeds: ['bmw-1', 'bmw-2', 'bmw-3', 'bmw-4', 'bmw-5'],
  },
  {
    status: 'published',
    status_field: 'disponibile',
    featured: true,
    make: 'Audi',
    model: 'Q3',
    trim: '35 TDI S-tronic Business Advanced',
    condition: 'aziendale',
    firstRegistration: '2022-09-01',
    mileage: 45000,
    fuel: 'diesel',
    transmission: 'automatico',
    displacement: 1968,
    powerKw: 110,
    drivetrain: 'anteriore',
    doors: 5,
    seats: 5,
    bodyType: 'suv',
    exteriorColor: 'Bianco Glaciale',
    interiorMaterial: 'tessuto',
    price: 32900,
    financingMonthly: 389,
    highlights: ['Ex-aziendale unico utilizzatore', 'Garanzia residua casa madre', 'Tagliandi Audi Service'],
    optionals: [
      'Climatizzatore automatico bizona',
      'Cruise control',
      'Navigatore',
      'Apple CarPlay',
      'Android Auto',
      'Sensori parcheggio anteriori',
      'Sensori parcheggio posteriori',
      'Fari LED',
      'Cerchi in lega 18"',
      'Volante in pelle',
    ],
    picsumSeeds: ['audi-1', 'audi-2', 'audi-3', 'audi-4'],
  },
  {
    status: 'published',
    status_field: 'disponibile',
    featured: true,
    make: 'Toyota',
    model: 'Yaris',
    trim: '1.5 Hybrid Active',
    condition: 'km0',
    firstRegistration: '2024-03-01',
    mileage: 50,
    fuel: 'ibrida',
    transmission: 'automatico',
    displacement: 1490,
    powerKw: 85,
    drivetrain: 'anteriore',
    doors: 5,
    seats: 5,
    bodyType: 'city-car',
    exteriorColor: 'Rosso Chili',
    interiorMaterial: 'tessuto',
    price: 19990,
    financingMonthly: 219,
    highlights: ['Km 0 nuova', '5 anni garanzia ibrida', 'Pronta consegna'],
    optionals: [
      'Climatizzatore automatico bizona',
      'Apple CarPlay',
      'Android Auto',
      'Cruise control adattivo',
      'Frenata automatica di emergenza',
      'Mantenimento corsia',
      'Telecamera posteriore',
    ],
    picsumSeeds: ['toyota-1', 'toyota-2', 'toyota-3'],
  },
  {
    status: 'published',
    status_field: 'disponibile',
    featured: false,
    make: 'Volkswagen',
    model: 'Golf',
    trim: '1.0 TSI Life',
    condition: 'usato',
    firstRegistration: '2020-11-01',
    mileage: 78000,
    fuel: 'benzina',
    transmission: 'manuale',
    displacement: 999,
    powerKw: 81,
    drivetrain: 'anteriore',
    doors: 5,
    seats: 5,
    bodyType: 'berlina',
    exteriorColor: 'Grigio Urano',
    interiorMaterial: 'tessuto',
    price: 17400,
    financingMonthly: 199,
    highlights: ['Tagliandi tracciati', 'Pronta consegna'],
    optionals: [
      'Climatizzatore automatico bizona',
      'Apple CarPlay',
      'Android Auto',
      'Sensori parcheggio posteriori',
      'Cruise control',
      'Cerchi in lega',
    ],
    picsumSeeds: ['vw-1', 'vw-2', 'vw-3', 'vw-4'],
  },
  {
    status: 'published',
    status_field: 'in-arrivo',
    featured: false,
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range Dual Motor',
    condition: 'usato',
    firstRegistration: '2022-07-01',
    mileage: 38000,
    fuel: 'elettrica',
    transmission: 'automatico',
    powerKw: 324,
    drivetrain: 'integrale',
    doors: 4,
    seats: 5,
    bodyType: 'berlina',
    exteriorColor: 'Bianco Perla',
    interiorMaterial: 'pelle',
    price: 36500,
    financingMonthly: 419,
    highlights: ['Autopilot', 'Batteria al 95%', 'In arrivo settimana prossima'],
    optionals: [
      'Apple CarPlay',
      'Sistema audio premium',
      'Telecamera 360°',
      'Park assist',
      'Cruise control adattivo',
      'Mantenimento corsia',
      'Fari LED',
      'Cerchi in lega 19"',
      'Sedili riscaldati anteriori',
    ],
    picsumSeeds: ['tesla-1', 'tesla-2', 'tesla-3'],
  },
  {
    status: 'draft',
    status_field: 'disponibile',
    featured: false,
    make: 'Fiat',
    model: 'Panda',
    trim: '1.0 Hybrid City Life',
    condition: 'km0',
    firstRegistration: '2024-01-01',
    mileage: 100,
    fuel: 'ibrida',
    transmission: 'manuale',
    displacement: 999,
    powerKw: 51,
    drivetrain: 'anteriore',
    doors: 5,
    seats: 4,
    bodyType: 'city-car',
    exteriorColor: 'Bianco Gelato',
    interiorMaterial: 'tessuto',
    price: 12990,
    financingMonthly: 149,
    highlights: ['Km 0', 'Ideale primo veicolo'],
    optionals: ['Climatizzatore automatico bizona', 'Bluetooth'],
    picsumSeeds: ['fiat-1', 'fiat-2'],
  },
  {
    status: 'draft',
    status_field: 'disponibile',
    featured: false,
    make: 'Mercedes-Benz',
    model: 'Classe A',
    trim: 'A 180 d Premium AMG-Line',
    condition: 'aziendale',
    firstRegistration: '2023-05-01',
    mileage: 28000,
    fuel: 'diesel',
    transmission: 'automatico',
    displacement: 1950,
    powerKw: 85,
    drivetrain: 'anteriore',
    doors: 5,
    seats: 5,
    bodyType: 'berlina',
    exteriorColor: 'Nero Cosmo',
    interiorMaterial: 'pelle-alcantara',
    price: 31500,
    financingMonthly: 369,
    highlights: ['Ex-aziendale', 'Pacchetto AMG'],
    optionals: [
      'Sedili riscaldati anteriori',
      'Climatizzatore automatico bizona',
      'Apple CarPlay',
      'Android Auto',
      'Telecamera posteriore',
      'Cerchi in lega 18"',
      'Fari LED',
    ],
    picsumSeeds: ['mb-1', 'mb-2', 'mb-3'],
  },
]

const RT = (txt: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', version: 1, text: txt }],
      },
    ],
    version: 1,
  },
})

async function fetchPicsum(seed: string, w = 1600, h = 1000): Promise<Buffer> {
  const url = `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Picsum failed: ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function main() {
  const payload = await getPayload({ config })

  // 1) Admin user
  const adminEmail = 'admin@example.it'
  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (existingAdmin.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: 'admin12345',
        name: 'Amministratore',
        role: 'admin',
      } as never,
    })
    console.log(`✓ Utente admin: ${adminEmail} (password: admin12345)`)
  } else {
    console.log(`· Utente admin già presente: ${adminEmail}`)
  }

  // 2) siteSettings + financeSettings
  await payload.updateGlobal({
    slug: 'siteSettings',
    data: {
      name: 'AutoShowroom',
      tagline: 'Auto usate, km 0 e aziendali in Italia.',
      phone: '+39 02 1234567',
      whatsapp: '+393331234567',
      email: 'info@example.it',
      companyName: 'AutoShowroom S.r.l.',
      vat: '01234567890',
      rea: 'MI-1234567',
      footerText:
        'AutoShowroom è un nome di fantasia usato per il sito demo. Sostituire con i dati reali del concessionario.',
      colorPrimary: '#3a52c4',
      colorAccent: '#0f172a',
    } as never,
  })
  console.log('✓ siteSettings aggiornati')

  await payload.updateGlobal({
    slug: 'financeSettings',
    data: {
      defaultTan: 6.95,
      defaultTaeg: 8.45,
      defaultDownPaymentPercent: 20,
      defaultMonths: 60,
      availableMonths: [
        { months: 24 }, { months: 36 }, { months: 48 },
        { months: 60 }, { months: 72 }, { months: 84 },
      ],
      disclaimer:
        'Esempio rappresentativo. Calcolo indicativo non vincolante: condizioni soggette a valutazione finanziaria.',
    } as never,
  })
  console.log('✓ financeSettings aggiornati')

  // 3) Marche
  const makesByName: Record<string, number> = {}
  for (const name of MAKES) {
    const slug = slugify(name)
    const existing = await payload.find({
      collection: 'makes',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      makesByName[name] = existing.docs[0].id as number
      continue
    }
    const created = await payload.create({
      collection: 'makes',
      data: { name, slug } as never,
    })
    makesByName[name] = created.id as number
  }
  console.log(`✓ ${MAKES.length} marche presenti`)

  // 4) Optional
  const optionalsByName: Record<string, number> = {}
  for (const o of OPTIONALS) {
    const existing = await payload.find({
      collection: 'optionals',
      where: { name: { equals: o.name } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      optionalsByName[o.name] = existing.docs[0].id as number
      continue
    }
    const created = await payload.create({
      collection: 'optionals',
      data: o as never,
    })
    optionalsByName[o.name] = created.id as number
  }
  console.log(`✓ ${OPTIONALS.length} optional presenti`)

  // 5) Sede
  let locationId: number
  const locExist = await payload.find({
    collection: 'locations',
    where: { name: { equals: 'Sede principale' } },
    limit: 1,
  })
  if (locExist.totalDocs > 0) {
    locationId = locExist.docs[0].id as number
  } else {
    const loc = await payload.create({
      collection: 'locations',
      data: {
        name: 'Sede principale',
        address: 'Via Esempio 12',
        zip: '20121',
        city: 'Milano',
        province: 'MI',
        phone: '+39 02 1234567',
        whatsapp: '+393331234567',
        email: 'info@example.it',
        coordinates: [9.1900, 45.4642] as never,
        openingHours: [
          { days: 'Lun–Ven', hours: '9:00–13:00, 15:00–19:00' },
          { days: 'Sab', hours: '9:00–13:00' },
        ],
      } as never,
    })
    locationId = loc.id as number
  }
  console.log('✓ Sede creata')

  // 6) Pagine CMS
  for (const p of PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      console.log(`· Pagina già presente: ${p.slug}`)
      continue
    }
    await payload.create({
      collection: 'pages',
      data: { ...p, _status: 'published' } as never,
    })
    console.log(`✓ Pagina creata: ${p.slug}`)
  }

  // 7) Veicoli demo
  for (const v of VEHICLES) {
    const slug = slugify(`${v.make} ${v.model} ${v.trim ?? ''} ${v.firstRegistration.slice(0, 7)}`)
    const existing = await payload.find({
      collection: 'vehicles',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: true,
    })
    if (existing.totalDocs > 0) {
      console.log(`· Veicolo già presente: ${slug}`)
      continue
    }

    // Upload immagini galleria
    const gallery: { image: number }[] = []
    for (let i = 0; i < v.picsumSeeds.length; i++) {
      const seed = v.picsumSeeds[i]
      try {
        const buffer = await fetchPicsum(seed)
        const media = await payload.create({
          collection: 'media',
          file: {
            data: buffer,
            mimetype: 'image/jpeg',
            name: `${seed}.jpg`,
            size: buffer.length,
          } as never,
          data: {
            alt: `${v.make} ${v.model} — foto ${i + 1}`,
          } as never,
        })
        gallery.push({ image: media.id as number })
      } catch (err) {
        console.warn(`  ! upload immagine fallito (${seed}):`, err)
      }
    }

    await payload.create({
      collection: 'vehicles',
      data: {
        title: `${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ''}`,
        slug,
        status: v.status_field,
        featured: v.featured,
        make: makesByName[v.make],
        model: v.model,
        trim: v.trim,
        condition: v.condition,
        firstRegistration: v.firstRegistration,
        mileage: v.mileage,
        fuel: v.fuel,
        transmission: v.transmission,
        displacement: v.displacement,
        powerKw: v.powerKw,
        drivetrain: v.drivetrain,
        doors: v.doors,
        seats: v.seats,
        bodyType: v.bodyType,
        exteriorColor: v.exteriorColor,
        interiorMaterial: v.interiorMaterial,
        price: v.price,
        priceStrikethrough: v.priceStrikethrough,
        financingMonthly: v.financingMonthly,
        highlights: v.highlights.map((t) => ({ text: t })),
        optionals: v.optionals
          .map((n) => optionalsByName[n])
          .filter(Boolean),
        gallery,
        location: locationId,
        description: RT(
          `${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ''}: una scelta solida grazie alla manutenzione costante e alla cura nei dettagli. Pronta per essere consegnata in sede o spedita su appuntamento.`,
        ),
        _status: v.status,
      } as never,
    })
    console.log(`✓ Veicolo creato (${v.status}): ${slug}`)
  }

  console.log('\n✓ Seed completato')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
