import { company } from '../data/company'

/** Construit un lien wa.me avec un message pré-rempli. */
export function waLink(message) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Message court utilisé par les boutons de chaque service. */
export function quickQuote(serviceTitle) {
  return waLink(
    `Bonjour ${company.name}, je souhaite un devis gratuit pour : ${serviceTitle}. Merci !`
  )
}

/** Message générique (héro, en-tête, bouton flottant). */
export function generalQuote() {
  return waLink(
    `Bonjour ${company.name}, je souhaite obtenir un devis gratuit pour un service de nettoyage à ${company.city}.`
  )
}

/** Message détaillé construit à partir du formulaire de devis. */
export function detailedQuote(form) {
  const lines = [
    `Bonjour ${company.name}, je souhaite un devis gratuit.`,
    '',
    `• Service : ${form.service || 'À définir'}`,
    `• Type de lieu : ${form.placeType || 'Non précisé'}`,
    `• Surface / pièces : ${form.size || 'Non précisé'}`,
    `• Quartier : ${form.area || 'Non précisé'}`,
    `• Date souhaitée : ${form.date || 'À convenir'}`,
    `• Nom : ${form.name || 'Non précisé'}`,
  ]
  if (form.details?.trim()) {
    lines.push('', `Précisions : ${form.details.trim()}`)
  }
  lines.push('', 'Merci !')
  return waLink(lines.join('\n'))
}
