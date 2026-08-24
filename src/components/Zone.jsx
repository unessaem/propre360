import { company, neighborhoods } from '../data/company'
import { generalQuote } from '../lib/whatsapp'
import Icon from './Icons'

export default function Zone() {
  return (
    <section
      id="zone"
      className="relative scroll-mt-24 border-y border-white/10 bg-navy-900/40 py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
            Zone d’intervention
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {company.area}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
            Nous nous déplaçons dans tout {company.city} et sa périphérie, avec
            notre matériel et nos produits. Votre quartier n’est pas dans la
            liste ? Écrivez-nous, nous vous dirons tout de suite si nous pouvons
            intervenir.
          </p>

          <a
            href={generalQuote()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-glow transition hover:brightness-110"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Vérifier ma zone sur WhatsApp
          </a>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {neighborhoods.map((n) => (
            <span
              key={n}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-navy-950/60 px-4 py-2.5 text-sm text-slate-300"
            >
              <Icon name="pin" className="h-3.5 w-3.5 text-teal-400" />
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
