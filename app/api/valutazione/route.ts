import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload/getPayload'
import { valutazioneSchema } from '@/lib/validations/lead'
import { clientIp, rateLimit } from '@/lib/utils/rateLimit'
import { escapeHtml, sendLeadNotification } from '@/lib/utils/email'
import { fuelLabels } from '@/lib/utils/labels'

export async function POST(req: Request) {
  const ip = clientIp(req)
  const rl = rateLimit({ key: `valuta:${ip}`, limit: 5, windowMs: 60_000 })
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

  const parsed = valutazioneSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dati non validi', issues: parsed.error.flatten() },
      { status: 400 },
    )
  }

  if (parsed.data.hp_field) return NextResponse.json({ ok: true })

  const payload = await getPayload()
  const data = parsed.data
  const summary = `${data.vehicleMake} ${data.vehicleModel} (${data.vehicleYear}) · ${data.vehicleKm.toLocaleString('it-IT')} km · ${fuelLabels[data.vehicleFuel] ?? data.vehicleFuel}`

  await payload.create({
    collection: 'leads',
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: 'valutazione',
      status: 'nuovo',
      message: [summary, data.notes].filter(Boolean).join('\n\n'),
      vehicleSnapshot: {
        make: data.vehicleMake,
        model: data.vehicleModel,
        year: data.vehicleYear,
        km: data.vehicleKm,
        fuel: data.vehicleFuel,
        notes: data.notes,
      },
    } as never,
  })

  const html = `
    <h2>Richiesta valutazione usato</h2>
    <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Telefono:</strong> ${escapeHtml(data.phone)}</p>
    <hr/>
    <p><strong>Auto da valutare:</strong><br/>${escapeHtml(summary)}</p>
    ${data.notes ? `<p><strong>Note:</strong><br/>${escapeHtml(data.notes).replace(/\n/g, '<br/>')}</p>` : ''}
  `

  await sendLeadNotification({
    subject: `Valutazione usato — ${data.name}`,
    html,
  })

  return NextResponse.json({ ok: true })
}
