import { useI18n } from '../i18n'
import Icon from './Icons'

const icons = ['team', 'tool', 'leaf', 'clock', 'lock', 'sparkle']

export default function WhyUs() {
  const { t } = useI18n()

  return (
    <section
      id="pourquoi"
      className="relative scroll-mt-24 border-y border-edge/10 bg-band py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {t.why.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {t.why.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((r, i) => (
            <div key={r.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                <Icon name={icons[i]} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
