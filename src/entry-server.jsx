import { renderToString } from 'react-dom/server'
import App from './App'
export { languages } from './i18n'

/** Génère le HTML d'une langue au moment du build (voir scripts/prerender.js). */
export function render(lang) {
  return renderToString(<App lang={lang} />)
}
