import type { Access, FieldAccess } from 'payload'

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) =>
  (req.user as { role?: string } | null)?.role === 'admin'

export const isAdminFieldLevel: FieldAccess = ({ req }) =>
  (req.user as { role?: string } | null)?.role === 'admin'

export const isAdminOrEditor: Access = ({ req }) => {
  const role = (req.user as { role?: string } | null)?.role
  return role === 'admin' || role === 'editor'
}

/** Tutti possono leggere, ma solo i pubblicati per utenti non autenticati. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return {
    _status: { equals: 'published' },
  }
}
