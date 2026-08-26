import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import fr from './fr'
import en from './en'
import ar from './ar'

export const languages = { fr, en, ar }
export const languageList = [fr, en, ar]
export const DEFAULT_LANG = 'fr'
const STORAGE_KEY = 'propre360-lang'

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return languages[v] ? v : null
  } catch {
    return null
  }
}

function detect() {
  if (typeof navigator === 'undefined') return DEFAULT_LANG
  for (const l of navigator.languages || [navigator.language]) {
    const code = String(l).slice(0, 2).toLowerCase()
    if (languages[code]) return code
  }
  return DEFAULT_LANG
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => readStored() ?? detect())

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = languages[lang].dir
  }, [lang])

  const change = useCallback((code) => {
    if (!languages[code]) return
    setLang(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* stockage indisponible : le choix vaut pour la session */
    }
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang: change,
      t: languages[lang],
      dir: languages[lang].dir,
      isRTL: languages[lang].dir === 'rtl',
    }),
    [lang, change]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** `const { t, lang, isRTL } = useI18n()` — t est le dictionnaire courant. */
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n doit être utilisé dans <I18nProvider>')
  return ctx
}
