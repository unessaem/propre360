import { useI18n } from '../i18n'
import Icon from './Icons'

const icons = ['chat', 'doc', 'sparkle']

export default function Process() {
  const { t, lang } = useI18n()
  // Chiffres arabes-indiens en arabe, occidentaux ailleurs.
  const num = (i) =>
    lang === 'ar' ? ['٠١', '٠٢', '٠٣'][i] : `0${i + 1}`

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {t.process.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {t.process.title}
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {t.process.steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-edge/10 bg-card p-7"
            >
              <span className="absolute end-6 top-5 font-display text-5xl font-extrabold text-ink/[0.06]">
                {num(i)}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-navy-950">
                <Icon name={icons[i]} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
