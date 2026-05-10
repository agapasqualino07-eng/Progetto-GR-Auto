'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type Img = { url: string; thumb: string; alt: string }

export function Gallery({ images }: { images: Img[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const [selected, setSelected] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const i = emblaApi.selectedScrollSnap()
    setSelected(i)
    thumbsApi?.scrollTo(i)
  }, [emblaApi, thumbsApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!lightboxOpen) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') emblaApi?.scrollNext()
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev()
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [lightboxOpen, emblaApi])

  if (images.length === 0) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-2xl border border-dashed border-ink-300 bg-ink-50 text-ink-500">
        Nessuna foto disponibile
      </div>
    )
  }

  return (
    <div>
      {/* Main carousel */}
      <div className="group relative overflow-hidden rounded-2xl bg-ink-100 shadow-card">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[16/10] min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prev/Next buttons */}
        <button
          type="button"
          aria-label="Foto precedente"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink-900 shadow-card backdrop-blur transition-all hover:scale-105 hover:bg-white sm:left-4 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Foto successiva"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink-900 shadow-card backdrop-blur transition-all hover:scale-105 hover:bg-white sm:right-4 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Counter + zoom */}
        <button
          type="button"
          aria-label="Apri lightbox"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-ink-900/85 px-3 py-1.5 text-xs font-semibold text-white shadow-card backdrop-blur transition-colors hover:bg-ink-900"
        >
          <ZoomIn className="h-3.5 w-3.5" />
          <span className="tabular-nums">
            {selected + 1} / {images.length}
          </span>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 overflow-hidden" ref={thumbsRef}>
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Vai alla foto ${i + 1}`}
              aria-current={selected === i ? 'true' : undefined}
              className={cn(
                'relative h-16 w-24 flex-[0_0_auto] overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-28',
                selected === i
                  ? 'border-brand-600 opacity-100 ring-2 ring-brand-500/30'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <Image
                src={img.thumb}
                alt={img.alt}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galleria a tutto schermo"
          className="fixed inset-0 z-50 grid place-items-center bg-ink-900/95 p-4 backdrop-blur sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Chiudi"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="tabular-nums">
              {selected + 1} / {images.length}
            </span>
          </div>
          <button
            type="button"
            aria-label="Foto precedente"
            onClick={(e) => {
              e.stopPropagation()
              emblaApi?.scrollPrev()
            }}
            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Foto successiva"
            onClick={(e) => {
              e.stopPropagation()
              emblaApi?.scrollNext()
            }}
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={images[selected].url}
                alt={images[selected].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
