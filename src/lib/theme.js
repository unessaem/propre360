export const STORAGE_KEY = 'propre360-theme'

/** Lit le choix enregistré, ou null si aucun (→ on suit le système). */
export function readStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    // navigation privée, cookies bloqués… : on ignore et on suit le système.
    return null
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* rien à faire : le thème restera actif pour la session en cours */
  }
}

export function systemTheme() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

/** Applique le thème au document. Le sombre est la valeur par défaut. */
export function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('light', theme === 'light')
  root.style.colorScheme = theme
}
