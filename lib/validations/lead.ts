import { z } from 'zod'

const phoneRegex = /^[+0-9 ()\-]{6,}$/

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Inserisci il tuo nome').max(100),
  email: z.string().trim().email('Email non valida'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || phoneRegex.test(v),
      'Numero di telefono non valido',
    ),
  message: z.string().trim().max(2000).optional(),
  type: z.enum(['info', 'test-drive', 'valutazione', 'finanziamento']),
  vehicleId: z.union([z.number(), z.string()]).optional(),
  consent: z
    .boolean()
    .refine((v) => v, { message: 'Necessario per inviare la richiesta' }),
  // Honeypot: deve restare vuoto
  hp_field: z.string().max(0).optional().or(z.literal('')),
  source: z.string().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>

export const valutazioneSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phoneRegex),
  vehicleMake: z.string().trim().min(1).max(100),
  vehicleModel: z.string().trim().min(1).max(100),
  vehicleYear: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 1),
  vehicleKm: z.coerce.number().int().min(0).max(2_000_000),
  vehicleFuel: z.string().trim().min(1).max(40),
  notes: z.string().trim().max(2000).optional(),
  consent: z.boolean().refine((v) => v),
  hp_field: z.string().max(0).optional().or(z.literal('')),
})

export type ValutazioneInput = z.infer<typeof valutazioneSchema>
