/**
 * Rate limit in-memory semplice (fixed window per IP).
 * Per ~50 veicoli e traffico modesto è più che sufficiente.
 * Se serve scalare: Upstash Redis (gestiamo token già nelle env).
 */

type Bucket = { count: number; resetAt: number }
const store = new Map<string, Bucket>()

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}): { ok: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const b = store.get(key)
  if (!b || now > b.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, resetIn: windowMs }
  }
  if (b.count >= limit) {
    return { ok: false, remaining: 0, resetIn: b.resetAt - now }
  }
  b.count += 1
  return { ok: true, remaining: limit - b.count, resetIn: b.resetAt - now }
}

export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
