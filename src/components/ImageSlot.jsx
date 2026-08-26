import { useState } from 'react'
import { useI18n } from '../i18n'
import optimized from '../data/optimized.json'
import Icon from './Icons'

/**
 * Emplacement photo.
 *
 * - Si les variantes optimisées existent (npm run images), le navigateur
 *   choisit la plus petite taille suffisante : un mobile ne charge pas
 *   une image prévue pour un grand écran.
 * - Si le fichier n'existe pas du tout, un emplacement stylé s'affiche.
 *
 * → Rien à modifier dans le code pour ajouter vos photos : déposez le
 *   fichier au bon nom dans public/images/services/, lancez `npm run images`.
 */
export default function ImageSlot({
  src,
  alt,
  icon = 'image',
  className = '',
  ratio = 'aspect-[3/2]',
  priority = false,
  sizes = '(min-width: 1024px) 45vw, 100vw',
}) {
  const { t } = useI18n()
  const [failed, setFailed] = useState(false)

  const fileName = src?.split('/').pop()
  const name = fileName?.replace(/\.[a-z0-9]+$/i, '')
  // On ne propose une variante que si elle a réellement été générée :
  // pas de requête vers un fichier inexistant.
  const widths = optimized[name] || []
  const optBase = `/images/services/opt/${name}`
  const srcSet = (ext) => widths.map((w) => `${optBase}-${w}.${ext} ${w}w`).join(', ')

  if (!failed && src && widths.length > 0) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <picture>
          <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
          <source type="image/jpeg" srcSet={srcSet('jpg')} sizes={sizes} />
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding={priority ? 'sync' : 'async'}
            width={1200}
            height={priority ? 1500 : 800}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
      </div>
    )
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${ratio} ${className}`}
      role="img"
      aria-label={`${t.slot.aria} : ${alt}`}
    >
      <div className="photo-slot absolute inset-0" />
      <div className="photo-slot-hatch absolute inset-0 opacity-[0.35]" />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-card text-brand">
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          {t.slot.label}
        </span>
        {fileName && (
          <code dir="ltr" className="rounded bg-page/70 px-2 py-1 text-[10px] text-muted">
            {fileName}
          </code>
        )}
      </div>
    </div>
  )
}
