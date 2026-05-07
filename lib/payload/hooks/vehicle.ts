import type { CollectionBeforeChangeHook } from 'payload'
import { kwToCv, slugify } from '../../utils/format.js'

/**
 * Auto-calcoli per i veicoli:
 *  - title: composto da marca + modello + allestimento (sovrascrivibile)
 *  - slug: derivato dal title (univoco)
 *  - powerCv: derivato da powerKw (sovrascrivibile)
 */
export const vehicleBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
}) => {
  const next = { ...data }

  // Risolvi il nome marca a partire dalla relationship
  let makeName: string | undefined
  if (next.make) {
    const id = typeof next.make === 'object' ? next.make.id : next.make
    if (id) {
      try {
        const make = await req.payload.findByID({
          collection: 'makes',
          id,
          depth: 0,
        })
        makeName = make?.name
      } catch {
        makeName = undefined
      }
    }
  }

  // Genera title se non fornito o se marca/modello/allestimento sono cambiati
  const titleParts = [makeName, next.model, next.trim].filter(Boolean)
  const computedTitle = titleParts.join(' ').trim()
  if (!next.title && computedTitle) {
    next.title = computedTitle
  }

  // Genera slug se vuoto
  if (!next.slug && next.title) {
    next.slug = slugify(next.title)
  } else if (next.slug) {
    next.slug = slugify(next.slug)
  }

  // Calcolo powerCv quando powerKw è valorizzato e powerCv non sovrascritto
  if (typeof next.powerKw === 'number') {
    const previousKw = originalDoc?.powerKw
    const previousCv = originalDoc?.powerCv
    const wasAuto =
      !previousCv || (previousKw && kwToCv(previousKw) === previousCv)
    if (next.powerCv == null || wasAuto) {
      next.powerCv = kwToCv(next.powerKw)
    }
  }

  return next
}
