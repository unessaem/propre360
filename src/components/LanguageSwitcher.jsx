import { useEffect, useRef, useState } from 'react'
import { basePath, languageList, useI18n } from '../i18n'
import Icon from './Icons'

export default function LanguageSwitcher() {
  const { lang, switchTo, t } = useI18n()
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)
  const current = languageList.find((l) => l.code === lang)

  // Ferme au clic extérieur et à la touche Échap.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${current.short} — ${t.header.language}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-lg border border-edge/15 px-2.5 text-sm font-semibold text-body transition hover:border-edge/35 hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <Icon name="globe" className="h-4 w-4" />
        <span>{current.short}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 top-12 z-50 min-w-[9.5rem] overflow-hidden rounded-xl border border-edge/15 bg-card py-1 shadow-card"
        >
          {languageList.map((l) => (
            <li key={l.code}>
              {/* Un vrai lien : Google suit les trois versions du site. */}
              <a
                href={basePath[l.code]}
                hrefLang={l.code}
                role="option"
                aria-selected={l.code === lang}
                lang={l.code}
                dir={l.dir}
                onClick={(e) => {
                  e.preventDefault()
                  switchTo(l.code)
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm transition hover:bg-edge/5 ${
                  l.code === lang ? 'font-semibold text-brand' : 'text-body'
                }`}
              >
                {l.name}
                {l.code === lang && <Icon name="check" className="h-3.5 w-3.5" />}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
