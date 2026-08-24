import { useRef, useState } from 'react'
import { services } from '../data/services'
import { neighborhoods, company } from '../data/company'
import { detailedQuote } from '../lib/whatsapp'
import Icon from './Icons'

const placeTypes = [
  'Maison / Villa',
  'Riad',
  'Appartement',
  'Bureau',
  'Commerce',
  'Hôtel / Maison d’hôtes',
  'Chantier / Après travaux',
  'Véhicule',
]

const field =
  'w-full rounded-xl border border-white/10 bg-navy-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20'

const label = 'mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400'

export default function QuoteForm() {
  const [form, setForm] = useState({
    service: services[0].title,
    placeType: placeTypes[0],
    size: '',
    area: '',
    date: '',
    name: '',
    details: '',
  })

  const linkRef = useRef(null)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Le lien WhatsApp est recalculé à chaque frappe : le bouton est un vrai
  // lien <a>, jamais un window.open() (qui est bloqué par les navigateurs
  // et dans les aperçus en iframe).
  const href = detailedQuote(form)

  // Touche « Entrée » dans un champ → on déclenche le même lien.
  const handleSubmit = (e) => {
    e.preventDefault()
    linkRef.current?.click()
  }

  return (
    <section id="devis" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
            Devis gratuit
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Recevez votre prix en quelques minutes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Remplissez ce formulaire : rien n’est envoyé automatiquement. Votre
            navigateur ouvre WhatsApp avec un message complet déjà rédigé — vous
            n’avez plus qu’à appuyer sur « envoyer ».
          </p>

          <ul className="mt-8 space-y-3">
            {[
              'Devis gratuit et sans engagement',
              'Réponse rapide sur WhatsApp',
              'Prix adapté à votre surface et à vos besoins',
              'Aucun compte à créer, aucune donnée stockée',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-slate-300">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-white/10 bg-navy-900/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Ou appelez-nous directement
            </p>
            <a
              href={`tel:${company.phoneHref}`}
              className="mt-2 flex items-center gap-2.5 font-display text-xl font-extrabold text-white transition hover:text-teal-400"
            >
              <Icon name="phone" className="h-5 w-5 text-teal-400" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-navy-900/60 p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label} htmlFor="service">
                Service souhaité
              </label>
              <select id="service" className={field} value={form.service} onChange={set('service')}>
                {services.map((s) => (
                  <option key={s.id} value={s.title} className="bg-navy-950">
                    {s.title}
                  </option>
                ))}
                <option value="Plusieurs services / autre demande" className="bg-navy-950">
                  Plusieurs services / autre demande
                </option>
              </select>
            </div>

            <div>
              <label className={label} htmlFor="placeType">
                Type de lieu
              </label>
              <select id="placeType" className={field} value={form.placeType} onChange={set('placeType')}>
                {placeTypes.map((p) => (
                  <option key={p} value={p} className="bg-navy-950">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={label} htmlFor="size">
                Surface / nombre de pièces
              </label>
              <input
                id="size"
                className={field}
                placeholder="ex. 120 m² ou 4 pièces"
                value={form.size}
                onChange={set('size')}
              />
            </div>

            <div>
              <label className={label} htmlFor="area">
                Quartier
              </label>
              <input
                id="area"
                className={field}
                list="quartiers"
                placeholder="ex. Guéliz"
                value={form.area}
                onChange={set('area')}
              />
              <datalist id="quartiers">
                {neighborhoods.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>

            <div>
              <label className={label} htmlFor="date">
                Date souhaitée
              </label>
              <input
                id="date"
                type="date"
                className={`${field} [color-scheme:dark]`}
                value={form.date}
                onChange={set('date')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={label} htmlFor="name">
                Votre nom
              </label>
              <input
                id="name"
                className={field}
                placeholder="Nom et prénom"
                value={form.name}
                onChange={set('name')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={label} htmlFor="details">
                Précisions (facultatif)
              </label>
              <textarea
                id="details"
                rows={3}
                className={`${field} resize-none`}
                placeholder="Étage, accès, type de sol, urgence…"
                value={form.details}
                onChange={set('details')}
              />
            </div>
          </div>

          {/* Permet la validation au clavier (touche Entrée) — invisible. */}
          <button type="submit" className="sr-only" tabIndex={-1} aria-hidden="true">
            Envoyer
          </button>

          <a
            ref={linkRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 px-6 py-4 text-base font-bold text-navy-950 shadow-glow transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            Envoyer ma demande sur WhatsApp
          </a>

          <p className="mt-3 text-center text-xs text-slate-500">
            WhatsApp s’ouvre avec votre message pré-rempli. Vous gardez le
            contrôle avant l’envoi.
          </p>
        </form>
      </div>
    </section>
  )
}
