import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!_resend) _resend = new Resend(key)
  return _resend
}

export async function sendLeadNotification({
  subject,
  html,
}: {
  subject: string
  html: string
}) {
  const resend = getResend()
  const to = process.env.CONTACT_EMAIL
  if (!resend || !to) {
    // In sviluppo o se le env non sono settate, log e basta.
    console.warn('[email] Resend non configurato:', subject)
    return { skipped: true }
  }
  await resend.emails.send({
    from: 'noreply@notifiche.example.it',
    to,
    subject,
    html,
  })
  return { ok: true }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
