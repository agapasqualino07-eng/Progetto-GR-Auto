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
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') emblaApi?.scrollNext()
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [lightboxOpen, emblaApi])

  if (images.length === 0) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-xl bg-ink-100 text-ink-500">
        Nessuna foto disponibile
      </div>
    )
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl bg-ink-100">
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

        <button
          type="button"
          aria-label="Foto precedente"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink-900 shadow hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Foto successiva"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink-900 shadow hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Apri lightbox"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-ink-900 shadow hover:bg-white"
        >
          <ZoomIn className="h-3.5 w-3.5" />
          {selected + 1} / {images.length}
        </button>
      </div>

      <div className="mt-3 overflow-hidden" ref={thumbsRef}>
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Vai alla foto ${i + 1}`}
              className={cn(
                'relative h-16 w-24 flex-[0_0_auto] overflow-hidden rounded-md border-2 transition-all',
                selected === i
                  ? 'border-brand-600'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <Image src={img.thumb} alt={img.alt} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Chiudi"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
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
