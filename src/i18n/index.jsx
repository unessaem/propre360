import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import fr from './fr'
import en from './en'
import ar from './ar'

export const languages = { fr, en, ar }
export const languageList = [fr, en, ar]
export const DEFAULT_LANG = 'fr'
const STORAGE_KEY = 'propre360-lang'

/**
 * Chaque langue a sa propre URL — c'est ce qui permet à Google d'indexer
 * les trois versions séparément :
 *   /        → français
 *   /en/     → anglais
 *   /ar/     → arabe
 */
export const basePath = { fr: '/', en: '/en/', ar: '/ar/' }

/** Langue déduite de l'URL. C'est elle qui fait autorité. */
export function langFromPath(pathname = '/') {
  const seg = pathname.split('/').filter(Boolean)[0]
  return languages[seg] ? seg : DEFAULT_LANG
}

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return languages[v] ? v : null
  } catch {
    return null
  }
}

const I18nContext = createContext(null)

export function I18nProvider({ children, lang: forcedLang }) {
  // Rendu serveur et hydratation partent de la même valeur : aucune
  // divergence possible entre le HTML pré-généré et le premier rendu client.
  const [lang] = useState(
    () =>
      forcedLang ??
      (typeof window === 'undefined' ? DEFAULT_LANG : langFromPath(window.location.pathname))
  )

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = languages[lang].dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* stockage indisponible */
    }
  }, [lang])

  // Premier passage sans langue dans l'URL : on redirige vers la version
  // enregistrée ou celle du navigateur, une seule fois.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (langFromPath(window.location.pathname) !== DEFAULT_LANG) return
    if (window.location.pathname !== '/') return
    let target = readStored()
    if (!target) {
      for (const l of navigator.languages || [navigator.language || 'fr']) {
        const c = String(l).slice(0, 2).toLowerCase()
        if (languages[c]) {
          target = c
          break
        }
      }
    }
    if (target && target !== DEFAULT_LANG) {
      window.location.replace(basePath[target])
    }
  }, [])

  const switchTo = useCallback((code) => {
    if (!languages[code]) return
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* stockage indisponible */
    }
    window.location.assign(basePath[code])
  }, [])

  const value = useMemo(
    () => ({
      lang,
      switchTo,
      t: languages[lang],
      dir: languages[lang].dir,
      isRTL: languages[lang].dir === 'rtl',
    }),
    [lang, switchTo]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** `const { t, lang, isRTL } = useI18n()` — t est le dictionnaire courant. */
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n doit être utilisé dans <I18nProvider>')
  return ctx
}
