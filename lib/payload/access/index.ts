import type { Access, FieldAccess } from 'payload'
import type { User } from '@/payload-types'

type Req = { user: User | null }

export const isAuthenticated: Access = ({ req }: Req) => Boolean(req.user)

export const isAdmin: Access = ({ req }: Req) => req.user?.role === 'admin'

export const isAdminFieldLevel: FieldAccess = ({ req }: Req) =>
  req.user?.role === 'admin'

export const isAdminOrEditor: Access = ({ req }: Req) =>
  req.user?.role === 'admin' || req.user?.role === 'editor'

/** Tutti possono leggere, ma solo i pubblicati per utenti non autenticati. */
export const publishedOrAuthenticated: Access = ({ req }: Req) => {
  if (req.user) return true
  return {
    _status: { equals: 'published' },
  }
}
