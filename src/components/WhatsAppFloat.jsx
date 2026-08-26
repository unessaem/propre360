import { useEffect, useState } from 'react'
import { generalQuote } from '../lib/whatsapp'
import { useI18n } from '../i18n'
import Icon from './Icons'

export default function WhatsAppFloat() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={generalQuote(t)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.wa.float}
      className={`fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] font-bold text-[#062e14] shadow-[0_10px_40px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:brightness-105 sm:h-auto sm:w-auto sm:px-5 sm:py-4 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <Icon name="whatsapp" className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">{t.header.quote}</span>
    </a>
  )
}
