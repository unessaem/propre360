import { services } from '../data/services'
import { quickQuote } from '../lib/whatsapp'
import Icon from './Icons'
import ImageSlot from './ImageSlot'

function ServiceCard({ service }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 transition duration-300 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-card">
      <ImageSlot
        src={service.image}
        alt={service.title}
        icon={service.icon}
        ratio="aspect-[3/2]"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-teal-400">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold leading-snug text-white">
              {service.title}
            </h3>
            <p className="mt-1 text-sm text-teal-400/90">{service.short}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          {service.description}
        </p>

        <ul className="mb-6 mt-5 space-y-2">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
              {p}
            </li>
          ))}
        </ul>

        <a
          href={quickQuote(service.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-teal-400/40 bg-teal-400/10 px-4 py-3 text-sm font-semibold text-teal-400 transition hover:bg-teal-400 hover:text-navy-950"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          Devis WhatsApp
        </a>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
            Nos prestations
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            10 services, une seule exigence : l’impeccable
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Du grand ménage au traitement des surfaces métalliques, chaque
            prestation est réalisée avec un matériel professionnel et une équipe
            formée. Choisissez votre service, le devis part directement sur
            WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
