import { company } from '../data/company'

/** Construit un lien wa.me avec un message pré-rempli. */
export function waLink(message) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Message court des boutons de chaque service, dans la langue affichée. */
export function quickQuote(t, serviceTitle) {
  return waLink(t.wa.quick(serviceTitle))
}

/** Message générique (héro, en-tête, bouton flottant). */
export function generalQuote(t) {
  return waLink(t.wa.general)
}

/** Message détaillé construit à partir du formulaire de devis. */
export function detailedQuote(t, form) {
  const d = t.wa.detailed
  const lines = [
    d.intro,
    '',
    `• ${d.service} : ${form.service || d.toDefine}`,
    `• ${d.placeType} : ${form.placeType || d.empty}`,
    `• ${d.size} : ${form.size || d.empty}`,
    `• ${d.area} : ${form.area || d.empty}`,
    `• ${d.date} : ${form.date || d.toAgree}`,
    `• ${d.name} : ${form.name || d.empty}`,
  ]
  if (form.details?.trim()) {
    lines.push('', `${d.details} : ${form.details.trim()}`)
  }
  lines.push('', d.thanks)
  return waLink(lines.join('\n'))
}
