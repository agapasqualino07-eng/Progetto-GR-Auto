import { NextResponse } from 'next/server'
import type { Vehicle } from '@/payload-types'
import { getPayload } from '@/lib/payload/getPayload'
import { leadSchema } from '@/lib/validations/lead'
import { clientIp, rateLimit } from '@/lib/utils/rateLimit'
import { escapeHtml, sendLeadNotification } from '@/lib/utils/email'

const TYPE_LABEL: Record<string, string> = {
  info: 'Richiesta informazioni',
  'test-drive': 'Test drive',
  valutazione: 'Valutazione usato',
  finanziamento: 'Finanziamento',
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  const rl = rateLimit({ key: `lead:${ip}`, limit: 5, windowMs: 60_000 })
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche istante.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload non valido' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dati non validi', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  // Honeypot: se compilato, fingiamo successo (per non dare hint allo spammer)
  if (parsed.data.hp_field) {
    return NextResponse.json({ ok: true })
  }

  const payload = await getPayload()

  // Snapshot del veicolo (resilienza se in futuro lo cancellano)
  let vehicleSnapshot: Record<string, unknown> | null = null
  let vehicleId: string | number | null = null
  if (parsed.data.vehicleId) {
    try {
      const v = (await payload.findByID({
        collection: 'vehicles',
        id: parsed.data.vehicleId as string,
        depth: 1,
      })) as Vehicle
      vehicleId = v.id
      vehicleSnapshot = {
        id: v.id,
        title: v.title,
        slug: v.slug,
        price: v.price,
        mileage: v.mileage,
        firstRegistration: v.firstRegistration,
        fuel: v.fuel,
        transmission: v.transmission,
      }
    } catch {
      // veicolo cancellato o id errato: salviamo comunque il lead senza riferimento
    }
  }

  await payload.create({
    collection: 'leads',
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      type: parsed.data.type,
      status: 'nuovo',
      source: parsed.data.source,
      vehicle: vehicleId ?? undefined,
      vehicleSnapshot: vehicleSnapshot ?? undefined,
    } as never,
  })

  // Email transazionale al concessionario
  const html = `
    <h2>${TYPE_LABEL[parsed.data.type]}</h2>
    <p><strong>Nome:</strong> ${escapeHtml(parsed.data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
    ${parsed.data.phone ? `<p><strong>Telefono:</strong> ${escapeHtml(parsed.data.phone)}</p>` : ''}
    ${parsed.data.message ? `<p><strong>Messaggio:</strong><br/>${escapeHtml(parsed.data.message).replace(/\n/g, '<br/>')}</p>` : ''}
    ${vehicleSnapshot ? `<p><strong>Veicolo:</strong> ${escapeHtml(String(vehicleSnapshot.title))} — €${vehicleSnapshot.price}</p>` : ''}
    ${parsed.data.source ? `<p><small>Pagina: ${escapeHtml(parsed.data.source)}</small></p>` : ''}
  `

  await sendLeadNotification({
    subject: `Nuovo lead: ${TYPE_LABEL[parsed.data.type]} — ${parsed.data.name}`,
    html,
  })

  return NextResponse.json({ ok: true })
}
