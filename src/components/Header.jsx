import { useEffect, useState } from 'react'
import { company } from '../data/company'
import { generalQuote } from '../lib/whatsapp'
import Icon from './Icons'
import ThemeToggle from './ThemeToggle'

const nav = [
  { href: '#services', label: 'Services' },
  { href: '#pourquoi', label: 'Pourquoi nous' },
  { href: '#zone', label: 'Zone' },
  { href: '#devis', label: 'Devis' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-edge/10 bg-page/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-glow">
            <img
              src="/logo-propre360.png"
              alt={`${company.name} logo`}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-sm font-extrabold tracking-wide text-ink">
              {company.name}
            </span>
            <span className="block text-[11px] text-brand">
              Nettoyage {company.city}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-body transition hover:bg-edge/5 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={`tel:${company.phoneHref}`}
            className="hidden items-center gap-2 rounded-xl border border-edge/15 px-4 py-2.5 text-sm font-medium text-body transition hover:border-edge/30 hover:text-ink md:flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {company.phoneDisplay}
          </a>
          <a
            href={generalQuote()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-4 py-2.5 text-sm font-semibold text-navy-950 shadow-glow transition hover:brightness-110"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            <span className="hidden sm:inline">Devis gratuit</span>
            <span className="sm:hidden">Devis</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge/15 text-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-edge/10 bg-page/95 px-5 py-3 backdrop-blur-xl lg:hidden">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-body hover:bg-edge/5"
            >
              {n.label}
            </a>
          ))}
          <a
            href={`tel:${company.phoneHref}`}
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-brand"
          >
            <Icon name="phone" className="h-4 w-4" />
            {company.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  )
}
