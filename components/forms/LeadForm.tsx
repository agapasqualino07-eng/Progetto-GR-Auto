'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { leadSchema, type LeadInput } from '@/lib/validations/lead'

type Props = {
  type: LeadInput['type']
  vehicleId?: number | string
  source?: string
  withMessage?: boolean
  submitLabel?: string
  successText?: string
}

export function LeadForm({
  type,
  vehicleId,
  source,
  withMessage = true,
  submitLabel = 'Invia richiesta',
  successText = 'Grazie! Ti ricontattiamo a breve.',
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      type,
      vehicleId,
      source:
        source ?? (typeof window === 'undefined' ? '' : window.location.pathname),
      consent: false,
      hp_field: '',
    },
  })

  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error ?? 'Errore di invio')
      }
      reset({
        ...data,
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      })
    } catch (e) {
      setServerError(
        e instanceof Error ? e.message : 'Errore inaspettato. Riprova.',
      )
    }
  })

  if (isSubmitSuccessful && !serverError) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
          <strong className="font-display font-bold">{successText}</strong>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot anti-spam */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        {...register('hp_field')}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nome e cognome*</Label>
          <Input
            id="name"
            className="mt-1.5"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-brand-600">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            className="mt-1.5"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-brand-600">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Telefono</Label>
        <Input
          id="phone"
          className="mt-1.5"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
        />
        {errors.phone ? (
          <p className="mt-1 text-xs text-brand-600">{errors.phone.message}</p>
        ) : null}
      </div>

      {withMessage ? (
        <div>
          <Label htmlFor="message">Messaggio</Label>
          <Textarea
            id="message"
            className="mt-1.5"
            rows={4}
            {...register('message')}
          />
        </div>
      ) : null}

      <label className="flex items-start gap-2.5 text-sm text-ink-700">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-2 focus:ring-brand-500/40"
          {...register('consent')}
        />
        <span>
          Ho letto la{' '}
          <a className="font-semibold text-brand-600 hover:underline" href="/privacy">
            privacy policy
          </a>{' '}
          e acconsento al trattamento dei dati per essere ricontattato/a.
        </span>
      </label>
      {errors.consent ? (
        <p className="-mt-2 text-xs text-brand-600">
          {errors.consent.message}
        </p>
      ) : null}

      {serverError ? (
        <p className="rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-brand-800">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Invio in corso…' : submitLabel}
      </Button>
    </form>
  )
}
