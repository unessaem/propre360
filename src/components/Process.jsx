import Icon from './Icons'

const steps = [
  {
    icon: 'chat',
    title: 'Vous nous écrivez',
    text: 'Un clic sur un bouton WhatsApp : le message est déjà pré-rempli avec le service souhaité.',
  },
  {
    icon: 'doc',
    title: 'Devis gratuit',
    text: 'Nous posons quelques questions sur la surface et le lieu, puis nous vous envoyons un prix clair, sans engagement.',
  },
  {
    icon: 'sparkle',
    title: 'Intervention planifiée',
    text: 'Nous convenons d’une date, l’équipe arrive avec le matériel, et vous retrouvez un espace impeccable.',
  },
]

export default function Process() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
            Comment ça marche
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Trois étapes, aucune paperasse
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-white/10 bg-navy-900/50 p-7"
            >
              <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-white/[0.06]">
                0{i + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-navy-950">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
