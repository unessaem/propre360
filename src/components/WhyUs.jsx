import Icon from './Icons'

const reasons = [
  {
    icon: 'team',
    title: 'Équipe formée & expérimentée',
    text: 'Des professionnels de confiance, discrets et ponctuels, habitués aux maisons comme aux espaces professionnels.',
  },
  {
    icon: 'tool',
    title: 'Matériel professionnel',
    text: 'Injecteurs-extracteurs, monobrosses, aspirateurs industriels : le bon équipement pour chaque surface.',
  },
  {
    icon: 'leaf',
    title: 'Produits adaptés',
    text: 'Des produits efficaces et respectueux de vos surfaces, de votre famille et de vos animaux.',
  },
  {
    icon: 'clock',
    title: 'Intervention rapide',
    text: 'Organisation efficace, délais tenus, et des créneaux qui s’adaptent à votre emploi du temps.',
  },
  {
    icon: 'lock',
    title: 'Service discret',
    text: 'Nous intervenons chez vous avec respect et confidentialité, sans perturber votre quotidien.',
  },
  {
    icon: 'sparkle',
    title: 'Satisfaction garantie',
    text: 'Un résultat visible dès la première intervention — sinon nous revenons compléter le travail.',
  },
]

export default function WhyUs() {
  return (
    <section
      id="pourquoi"
      className="relative scroll-mt-24 border-y border-edge/10 bg-band py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Pourquoi PROPRE 360
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            La propreté, prise au sérieux
          </h2>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                <Icon name={r.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
