import { useState } from 'react'
import { useI18n } from '../i18n'
import Icon from './Icons'

function Item({ faq, open, onToggle }) {
  return (
    <div className="border-b border-edge/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-start"
      >
        <span className="font-display text-base font-semibold text-ink">{faq.q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-edge/15 text-brand transition-transform duration-300 ${
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
          <p className="max-w-3xl pe-12 text-sm leading-relaxed text-muted">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="border-t border-edge/10 bg-band py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {t.faq.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {t.faq.title}
        </h2>

        <div className="mt-10">
          {t.faq.items.map((f, i) => (
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
