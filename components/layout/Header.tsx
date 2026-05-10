'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/veicoli', label: 'Veicoli' },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/contatti', label: 'Contatti' },
]

function Logo({ name }: { name: string }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 font-display font-bold tracking-tight"
      aria-label={`${name} — homepage`}
    >
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900 text-[15px] font-extrabold text-white ring-1 ring-inset ring-white/10 transition-transform group-hover:scale-105"
      >
        <span className="bg-gradient-to-br from-brand-400 to-brand-600 bg-clip-text text-transparent">
          GR
        </span>
      </span>
      <span className="hidden text-base text-ink-900 sm:inline-block">
        {name}
      </span>
    </Link>
  )
}

export function Header({
  siteName,
  phone,
}: {
  siteName: string
  phone?: string | null
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Chiudi il drawer quando cambia rotta
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Blocca lo scroll body quando drawer aperto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-200 supports-[backdrop-filter]:bg-white/80',
        scrolled
          ? 'border-ink-200 bg-white/95 backdrop-blur-md shadow-card'
          : 'border-transparent bg-white',
      )}
    >
      {/* Striscia rossa decorativa in alto */}
      <div aria-hidden className="h-0.5 w-full bg-brand-600" />

      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-200 sm:px-6 lg:px-8',
          scrolled ? 'h-16' : 'h-20',
        )}
      >
        <Logo name={siteName} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principale">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={cn(
                'relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors',
                isActive(l.href)
                  ? 'text-ink-900'
                  : 'text-ink-600 hover:text-ink-900',
              )}
            >
              {l.label}
              {isActive(l.href) ? (
                <span
                  aria-hidden
                  className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-brand-600"
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {phone ? (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                <Phone className="h-4 w-4" />
              </span>
              <span className="tabular-nums">{phone}</span>
            </a>
          ) : null}
          <Button asChild size="md">
            <Link href="/vendi-la-tua-auto">
              Vendi la tua auto
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-900 transition-colors hover:bg-ink-50 lg:hidden"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[64px] z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              key="drawer"
              id="mobile-drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full z-40 border-b border-ink-200 bg-white shadow-card-hover lg:hidden"
            >
              <nav
                className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
                aria-label="Mobile"
              >
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold transition-colors',
                      isActive(l.href)
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink-900 hover:bg-ink-100',
                    )}
                  >
                    {l.label}
                    <ChevronRight className="h-4 w-4 text-ink-400" />
                  </Link>
                ))}

                <div className="mt-3 grid gap-2 border-t border-ink-200 pt-4">
                  {phone ? (
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-200 px-4 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-50"
                    >
                      <Phone className="h-4 w-4 text-brand-600" />
                      <span className="tabular-nums">{phone}</span>
                    </a>
                  ) : null}
                  <Button asChild size="lg">
                    <Link href="/vendi-la-tua-auto">Vendi la tua auto</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
