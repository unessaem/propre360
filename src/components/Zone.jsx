import { generalQuote } from '../lib/whatsapp'
import { useI18n } from '../i18n'
import Icon from './Icons'

export default function Zone() {
  const { t } = useI18n()

  return (
    <section
      id="zone"
      className="relative scroll-mt-24 border-y border-edge/10 bg-band py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {t.zone.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {t.zone.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{t.zone.lead}</p>

          <a
            href={generalQuote(t)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-glow transition hover:brightness-110"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {t.zone.cta}
          </a>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {t.zone.neighborhoods.map((n) => (
            <span
              key={n}
              className="inline-flex items-center gap-2 rounded-xl border border-edge/10 bg-page/60 px-4 py-2.5 text-sm text-body"
            >
              <Icon name="pin" className="h-3.5 w-3.5 text-brand" />
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
