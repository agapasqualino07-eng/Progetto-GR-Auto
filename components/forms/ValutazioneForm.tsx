'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { fuelLabels } from '@/lib/utils/labels'
import {
  valutazioneSchema,
  type ValutazioneInput,
} from '@/lib/validations/lead'

export function ValutazioneForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ValutazioneInput>({
    resolver: zodResolver(valutazioneSchema),
    defaultValues: { consent: false, hp_field: '' },
  })

  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null)
    try {
      const res = await fetch('/api/valutazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error ?? 'Errore di invio')
      }
      reset()
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
          <div>
            <strong className="block font-display font-bold">Grazie!</strong>
            <span className="text-sm">
              Ti contatteremo entro la giornata con una valutazione.
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
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
          <Label htmlFor="vname">Nome*</Label>
          <Input
            id="vname"
            className="mt-1.5"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-brand-600">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="vemail">Email*</Label>
          <Input
            id="vemail"
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
        <Label htmlFor="vphone">Telefono*</Label>
        <Input
          id="vphone"
          className="mt-1.5"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
        />
        {errors.phone ? (
          <p className="mt-1 text-xs text-brand-600">{errors.phone.message}</p>
        ) : null}
      </div>

      <div className="border-t border-ink-100 pt-5">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
          La tua auto
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="vmake">Marca*</Label>
          <Input
            id="vmake"
            className="mt-1.5"
            placeholder="es. BMW, Audi…"
            {...register('vehicleMake')}
          />
        </div>
        <div>
          <Label htmlFor="vmodel">Modello*</Label>
          <Input
            id="vmodel"
            className="mt-1.5"
            placeholder="es. Serie 3, A4…"
            {...register('vehicleModel')}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="vyear">Anno*</Label>
          <Input
            id="vyear"
            className="mt-1.5"
            type="number"
            placeholder="2020"
            {...register('vehicleYear')}
          />
          {errors.vehicleYear ? (
            <p className="mt-1 text-xs text-brand-600">
              {errors.vehicleYear.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="vkm">Chilometri*</Label>
          <Input
            id="vkm"
            className="mt-1.5"
            type="number"
            placeholder="80000"
            {...register('vehicleKm')}
          />
        </div>
        <div>
          <Label htmlFor="vfuel">Alimentazione*</Label>
          <Select id="vfuel" className="mt-1.5" {...register('vehicleFuel')}>
            <option value="">Seleziona…</option>
            {Object.entries(fuelLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="vnotes">Note</Label>
        <Textarea
          id="vnotes"
          className="mt-1.5"
          rows={3}
          placeholder="Tagliandi, eventi accidentali, optional…"
          {...register('notes')}
        />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-ink-700">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-2 focus:ring-brand-500/40"
          {...register('consent')}
        />
        <span>
          Acconsento al trattamento dei dati come da{' '}
          <a className="font-semibold text-brand-600 hover:underline" href="/privacy">
            privacy policy
          </a>
          .
        </span>
      </label>
      {errors.consent ? (
        <p className="-mt-3 text-xs text-brand-600">{errors.consent.message}</p>
      ) : null}

      {serverError ? (
        <p className="rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-brand-800">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Invio in corso…' : 'Richiedi valutazione gratuita'}
      </Button>
    </form>
  )
}
