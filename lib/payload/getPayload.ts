import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'

/**
 * Helper per ottenere l'istanza Payload all'interno di Server Components / API.
 * Usa il pattern memoized di Payload 3 con la Local API.
 */
export async function getPayload() {
  return getPayloadInstance({ config })
}
