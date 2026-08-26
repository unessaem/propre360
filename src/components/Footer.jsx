import { company, socials } from '../data/company'
import { services } from '../data/services'
import { generalQuote } from '../lib/whatsapp'
import { useI18n } from '../i18n'
import Icon from './Icons'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-edge/10 bg-page">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5">
                <img
                  src="/logo-propre360.png"
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain"
                />
              </span>
              <span>
                <span className="block font-display text-base font-extrabold text-ink">
                  {company.name}
                </span>
                <span className="block text-xs text-brand">{t.hero.title2}</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {t.footer.about}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={generalQuote(t)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-5 py-3 text-sm font-bold text-navy-950 transition hover:brightness-110"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${company.name} ${t.footer.socialOn} ${s.label}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-edge/15 px-4 py-2.5 text-sm font-medium text-body transition hover:border-brand/50 hover:text-brand"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-muted transition hover:text-brand"
                  >
                    {t.services.items[s.id].title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${company.phoneHref}`}
                  dir="ltr"
                  className="flex items-start gap-3 text-body transition hover:text-brand"
                >
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {t.zone.title}
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {t.footer.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-edge/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">
            © {year} {company.name} — {company.website}. {t.footer.rights}
          </p>
          <p className="text-xs text-faint">{t.hero.title1} {t.hero.title2}</p>
        </div>
      </div>
    </footer>
  )
}
