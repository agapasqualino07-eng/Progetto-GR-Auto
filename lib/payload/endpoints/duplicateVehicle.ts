import type { Endpoint, PayloadHandler, PayloadRequest } from 'payload'

/**
 * Duplica un veicolo:
 * - rimuove slug, internalCode, gallery (campi unique o specifici dell'auto)
 * - mantiene tutti gli altri campi
 * - salva come bozza, prefissa il titolo con "(copia)"
 * - restituisce { id } del nuovo veicolo
 *
 * Endpoint: POST /api/vehicles/:id/duplicate
 */
const handler: PayloadHandler = async (req: PayloadRequest) => {
  const { user, payload, routeParams } = req

  if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
    return Response.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const id = routeParams?.id as string | undefined
  if (!id) return Response.json({ error: 'ID mancante' }, { status: 400 })

  let original
  try {
    original = await payload.findByID({
      collection: 'vehicles',
      id,
      depth: 0,
      draft: true,
    })
  } catch {
    return Response.json({ error: 'Veicolo non trovato' }, { status: 404 })
  }

  const {
    id: _id,
    slug: _slug,
    internalCode: _internalCode,
    gallery: _gallery,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    _status: _statusValue,
    title,
    ...rest
  } = original as unknown as Record<string, unknown> & {
    title?: string
  }

  const created = await payload.create({
    collection: 'vehicles',
    data: {
      ...rest,
      title: title ? `${title} (copia)` : '(copia)',
      gallery: [],
      _status: 'draft',
    } as never,
    draft: true,
    user,
  })

  return Response.json({ id: created.id }, { status: 201 })
}

export const duplicateVehicleEndpoint: Endpoint = {
  path: '/:id/duplicate',
  method: 'post',
  handler,
}
