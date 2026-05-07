'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { fuelLabels } from '@/lib/utils/labels'
import { valutazioneSchema, type ValutazioneInput } from '@/lib/validations/lead'

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
        <strong>Grazie!</strong> Ti contatteremo entro la giornata con una
        valutazione.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
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
          <Input id="vname" autoComplete="name" {...register('name')} />
        </div>
        <div>
          <Label htmlFor="vemail">Email*</Label>
          <Input
            id="vemail"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="vphone">Telefono*</Label>
        <Input id="vphone" type="tel" autoComplete="tel" {...register('phone')} />
        {errors.phone ? (
          <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
        ) : null}
      </div>

      <hr className="border-ink-200" />
      <div className="text-sm font-semibold">La tua auto</div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="vmake">Marca*</Label>
          <Input id="vmake" {...register('vehicleMake')} />
        </div>
        <div>
          <Label htmlFor="vmodel">Modello*</Label>
          <Input id="vmodel" {...register('vehicleModel')} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="vyear">Anno*</Label>
          <Input id="vyear" type="number" {...register('vehicleYear')} />
          {errors.vehicleYear ? (
            <p className="mt-1 text-xs text-red-600">{errors.vehicleYear.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="vkm">Chilometri*</Label>
          <Input id="vkm" type="number" {...register('vehicleKm')} />
        </div>
        <div>
          <Label htmlFor="vfuel">Alimentazione*</Label>
          <Select id="vfuel" {...register('vehicleFuel')}>
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
          rows={3}
          placeholder="Tagliandi, eventi accidentali, optional..."
          {...register('notes')}
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-ink-700">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
          {...register('consent')}
        />
        <span>
          Acconsento al trattamento dei dati come da{' '}
          <a className="underline" href="/privacy">privacy policy</a>.
        </span>
      </label>

      {serverError ? (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Invio in corso…' : 'Richiedi valutazione'}
      </Button>
    </form>
  )
}
