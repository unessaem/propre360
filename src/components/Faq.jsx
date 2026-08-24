import { useState } from 'react'
import { company } from '../data/company'
import Icon from './Icons'

const faqs = [
  {
    q: 'Combien coûte une intervention ?',
    a: 'Chaque devis est établi sur mesure : le prix dépend du service, de la surface et de l’état du lieu. Le devis est gratuit et sans engagement — envoyez-nous un message WhatsApp et vous aurez une réponse rapidement.',
  },
  {
    q: 'Faut-il fournir le matériel ou les produits ?',
    a: 'Non. Nous venons avec notre équipement professionnel et nos produits, adaptés à chaque type de surface.',
  },
  {
    q: 'Intervenez-vous en dehors de Marrakech ?',
    a: `Nous couvrons ${company.area}. Pour une adresse un peu plus éloignée, écrivez-nous : nous vous dirons tout de suite si le déplacement est possible.`,
  },
  {
    q: 'Puis-je réserver un nettoyage régulier ?',
    a: 'Oui. Nous planifions des interventions hebdomadaires, bimensuelles ou mensuelles pour les maisons, appartements, bureaux et espaces professionnels.',
  },
  {
    q: 'Dois-je être présent pendant l’intervention ?',
    a: 'Ce n’est pas obligatoire. Beaucoup de clients nous confient les clés ou nous accueillent au début puis vaquent à leurs occupations. Notre équipe travaille avec discrétion et respect des lieux.',
  },
  {
    q: 'Sous quel délai pouvez-vous intervenir ?',
    a: 'Selon les créneaux disponibles, une intervention peut souvent être planifiée sous quelques jours. Pour une urgence, précisez-le dans votre message WhatsApp.',
  },
]

function Item({ faq, open, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-white">
          {faq.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 text-teal-400 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          <Icon name="plus" className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl pr-12 text-sm leading-relaxed text-slate-400">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="border-t border-white/10 bg-navy-900/40 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
          Questions fréquentes
        </span>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Tout ce qu’on nous demande
        </h2>

        <div className="mt-10">
          {faqs.map((f, i) => (
            <Item
              key={f.q}
              faq={f}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
