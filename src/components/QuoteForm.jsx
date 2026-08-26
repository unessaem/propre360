import { useEffect, useRef, useState } from 'react'
import { services } from '../data/services'
import { company } from '../data/company'
import { detailedQuote } from '../lib/whatsapp'
import { useI18n } from '../i18n'
import Icon from './Icons'

const field =
  'w-full rounded-xl border border-edge/10 bg-page/70 px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/20'

const label = 'mb-2 block text-xs font-semibold uppercase tracking-wider text-muted'

export default function QuoteForm() {
  const { t, lang } = useI18n()
  const linkRef = useRef(null)

  const [form, setForm] = useState({
    service: '',
    placeType: '',
    size: '',
    area: '',
    date: '',
    name: '',
    details: '',
  })

  // Les libellés changent avec la langue : on resynchronise les listes.
  useEffect(() => {
    setForm((f) => ({
      ...f,
      service: t.services.items[services[0].id].title,
      placeType: t.quote.placeTypes[0],
    }))
  }, [lang, t])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Le lien WhatsApp est recalculé à chaque frappe : le bouton est un vrai
  // lien <a>, jamais un window.open() (bloqué par les navigateurs).
  const href = detailedQuote(t, form)

  // Touche « Entrée » dans un champ → on déclenche le même lien.
  const handleSubmit = (e) => {
    e.preventDefault()
    linkRef.current?.click()
  }

  return (
    <section id="devis" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-glowA/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {t.quote.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {t.quote.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.quote.lead}</p>

          <ul className="mt-8 space-y-3">
            {t.quote.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-body">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-edge/10 bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t.quote.callLabel}
            </p>
            <a
              href={`tel:${company.phoneHref}`}
              dir="ltr"
              className="mt-2 flex items-center gap-2.5 font-display text-xl font-extrabold text-ink transition hover:text-brand"
            >
              <Icon name="phone" className="h-5 w-5 text-brand" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-edge/10 bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label} htmlFor="service">
                {t.quote.fields.service}
              </label>
              <select id="service" className={field} value={form.service} onChange={set('service')}>
                {services.map((s) => {
                  const title = t.services.items[s.id].title
                  return (
                    <option key={s.id} value={title} className="bg-page">
                      {title}
                    </option>
                  )
                })}
                <option value={t.quote.otherService} className="bg-page">
                  {t.quote.otherService}
                </option>
              </select>
            </div>

            <div>
              <label className={label} htmlFor="placeType">
                {t.quote.fields.placeType}
              </label>
              <select
                id="placeType"
                className={field}
                value={form.placeType}
                onChange={set('placeType')}
              >
                {t.quote.placeTypes.map((p) => (
                  <option key={p} value={p} className="bg-page">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={label} htmlFor="size">
                {t.quote.fields.size}
              </label>
              <input
                id="size"
                className={field}
                placeholder={t.quote.fields.sizePlaceholder}
                value={form.size}
                onChange={set('size')}
              />
            </div>

            <div>
              <label className={label} htmlFor="area">
                {t.quote.fields.area}
              </label>
              <input
                id="area"
                className={field}
                list="quartiers"
                placeholder={t.quote.fields.areaPlaceholder}
                value={form.area}
                onChange={set('area')}
              />
              <datalist id="quartiers">
                {t.zone.neighborhoods.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>

            <div>
              <label className={label} htmlFor="date">
                {t.quote.fields.date}
              </label>
              <input
                id="date"
                type="date"
                dir="ltr"
                className={field}
                value={form.date}
                onChange={set('date')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={label} htmlFor="name">
                {t.quote.fields.name}
              </label>
              <input
                id="name"
                className={field}
                placeholder={t.quote.fields.namePlaceholder}
                value={form.name}
                onChange={set('name')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={label} htmlFor="details">
                {t.quote.fields.details}
              </label>
              <textarea
                id="details"
                rows={3}
                className={`${field} resize-none`}
                placeholder={t.quote.fields.detailsPlaceholder}
                value={form.details}
                onChange={set('details')}
              />
            </div>
          </div>

          {/* Permet la validation au clavier (touche Entrée) — invisible. */}
          <button type="submit" className="sr-only" tabIndex={-1} aria-hidden="true">
            {t.quote.submitHidden}
          </button>

          <a
            ref={linkRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 px-6 py-4 text-base font-bold text-navy-950 shadow-glow transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            {t.quote.submit}
          </a>

          <p className="mt-3 text-center text-xs text-faint">{t.quote.note}</p>
        </form>
      </div>
    </section>
  )
}
