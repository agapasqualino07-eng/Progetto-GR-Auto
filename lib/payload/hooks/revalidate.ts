import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Wrapper "safe" per revalidatePath e revalidateTag.
 * Se chiamati fuori dal contesto Next.js (es. script di seed standalone),
 * lanciano un Invariant Error. Lo intercettiamo e lo ignoriamo silenziosamente.
 */
function safeRevalidatePath(path: string): void {
  try {
    revalidatePath(path)
  } catch (err) {
    // Ignoriamo: stiamo girando fuori da Next.js (es. seed script)
  }
}

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch (err) {
    // Ignoriamo: stiamo girando fuori da Next.js (es. seed script)
  }
}

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
  paths.forEach((p) => safeRevalidatePath(p))
  safeRevalidateTag('vehicles')
  return doc
}

export const revalidateVehicleAfterDelete: CollectionAfterDeleteHook = ({
  doc,
}) => {
  safeRevalidatePath('/veicoli')
  safeRevalidatePath('/')
  if (doc?.slug) safeRevalidatePath(`/veicoli/${doc.slug}`)
  safeRevalidateTag('vehicles')
  return doc
}

export const revalidatePageAfterChange: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
}) => {
  if (doc?.slug) safeRevalidatePath(`/${doc.slug}`)
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    safeRevalidatePath(`/${previousDoc.slug}`)
  }
  return doc
}