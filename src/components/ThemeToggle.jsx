import { useEffect, useState } from 'react'
import { applyTheme, readStoredTheme, storeTheme, systemTheme } from '../lib/theme'
import { useI18n } from '../i18n'

export default function ThemeToggle({ className = '' }) {
  const { t } = useI18n()
  // Le HTML est pré-généré côté serveur : on part toujours de « dark » pour
  // que le premier rendu client soit identique, puis on lit le vrai réglage.
  const [theme, setTheme] = useState('dark')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTheme(readStoredTheme() ?? systemTheme())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) applyTheme(theme)
  }, [theme, ready])

  // Tant que le visiteur n'a pas choisi, on suit les réglages de son appareil.
  useEffect(() => {
    if (readStoredTheme()) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => setTheme(e.matches ? 'light' : 'dark')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    storeTheme(next)
  }

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? t.header.toDark : t.header.toLight}
      title={isLight ? t.header.toDark : t.header.toLight}
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg border border-edge/15 text-body transition hover:border-edge/35 hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${className}`}
    >
      {/* Soleil et lune se croisent : l'un sort pendant que l'autre entre. */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isLight ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>

      <svg
        viewBox="0 0 24 24"
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isLight ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a6.6 6.6 0 0 0 9.5 9.5z" />
      </svg>
    </button>
  )
}
