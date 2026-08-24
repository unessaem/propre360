import { company, audiences } from '../data/company'
import { services } from '../data/services'
import { generalQuote } from '../lib/whatsapp'
import Icon from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-navy-950">
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
                <span className="block font-display text-base font-extrabold text-white">
                  {company.name}
                </span>
                <span className="block text-xs text-teal-400">
                  {company.tagline}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Nettoyage professionnel à {company.city} : {audiences.join(', ').toLowerCase()}.
              Devis gratuit sur WhatsApp.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={generalQuote()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 px-5 py-3 text-sm font-bold text-navy-950 transition hover:brightness-110"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/35 hover:text-white"
              >
                <Icon name="instagram" className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Nos services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-slate-400 transition hover:text-teal-400"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="flex items-start gap-3 text-slate-300 transition hover:text-teal-400"
                >
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                {company.area}
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                Lundi – Samedi, sur rendez-vous
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} {company.name} — {company.website}. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-500">{company.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
