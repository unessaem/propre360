import { services } from '../data/services'
import { quickQuote } from '../lib/whatsapp'
import { useI18n } from '../i18n'
import Icon from './Icons'
import ImageSlot from './ImageSlot'

function ServiceCard({ service, copy, cta, t }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-edge/10 bg-card transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card">
      <ImageSlot
        src={service.image}
        alt={copy.title}
        icon={service.icon}
        ratio="aspect-[3/2]"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold leading-snug text-ink">
              {copy.title}
            </h3>
            <p className="mt-1 text-sm text-brand">{copy.short}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{copy.description}</p>

        <ul className="mb-6 mt-5 space-y-2">
          {copy.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-body">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              {p}
            </li>
          ))}
        </ul>

        <a
          href={quickQuote(t, copy.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm font-semibold text-brand transition hover:bg-teal-400 hover:text-navy-950"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          {cta}
        </a>
      </div>
    </article>
  )
}

export default function Services() {
  const { t } = useI18n()

  return (
    <section id="services" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {t.services.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.services.lead}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              copy={t.services.items[s.id]}
              cta={t.services.cta}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
