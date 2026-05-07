import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Invalida la cache statica per la pagina del veicolo e il catalogo
 * ogni volta che un veicolo cambia o viene cancellato.
 */
export const revalidateVehicle: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
}) => {
  const paths = new Set<string>(['/veicoli', '/'])

  if (doc?.slug) paths.add(`/veicoli/${doc.slug}`)
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    paths.add(`/veicoli/${previousDoc.slug}`)
  }

  paths.forEach((p) => revalidatePath(p))
  revalidateTag('vehicles')
  return doc
}

export const revalidateVehicleAfterDelete: CollectionAfterDeleteHook = ({
  doc,
}) => {
  revalidatePath('/veicoli')
  revalidatePath('/')
  if (doc?.slug) revalidatePath(`/veicoli/${doc.slug}`)
  revalidateTag('vehicles')
  return doc
}

export const revalidatePageAfterChange: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
}) => {
  if (doc?.slug) revalidatePath(`/${doc.slug}`)
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    revalidatePath(`/${previousDoc.slug}`)
  }
  return doc
}
