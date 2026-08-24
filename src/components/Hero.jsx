import { company, audiences } from '../data/company'
import { generalQuote } from '../lib/whatsapp'
import Icon from './Icons'
import ImageSlot from './ImageSlot'

const stats = [
  { value: '10', label: 'services de propreté' },
  { value: '360°', label: 'chaque angle traité' },
  { value: '24 h', label: 'réponse sur WhatsApp' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-36">
      {/* fonds */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-glowA/15 blur-[120px]" />
        <div className="absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-glowB/40 blur-[120px]" />
        <div
          className="absolute inset-0 text-edge opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            opacity: 0.06,
            maskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {company.area}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Propreté complète,
            <span className="block bg-gradient-to-r from-brand via-brand to-gradEnd bg-clip-text text-transparent">
              360° pour vous.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            Nettoyage professionnel à {company.city} pour maisons, riads, bureaux
            et commerces. Équipe formée, matériel professionnel, résultat
            impeccable — et un devis gratuit en quelques minutes sur WhatsApp.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={generalQuote()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 px-7 py-4 text-base font-bold text-navy-950 shadow-glow transition hover:brightness-110"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              Demander un devis gratuit
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-edge/15 px-7 py-4 text-base font-semibold text-ink transition hover:border-edge/35 hover:bg-edge/5"
            >
              Voir nos 10 services
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-edge/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visuel principal */}
        <div className="relative">
          <div className="group overflow-hidden rounded-[2rem] border border-edge/10 bg-card shadow-card">
            <ImageSlot
              src="/images/services/hero.jpg"
              alt="Équipe PROPRE 360 en intervention"
              icon="team"
              ratio="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]"
            />
          </div>

          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-edge/10 bg-card/95 p-4 backdrop-blur-xl sm:left-8 sm:right-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              Nous intervenons pour
            </p>
            <p className="mt-1.5 text-sm text-body">
              {audiences.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
