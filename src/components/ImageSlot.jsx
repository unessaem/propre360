import { useState } from 'react'
import Icon from './Icons'

/**
 * Emplacement photo.
 * - Si le fichier existe dans /public, la photo s'affiche.
 * - Sinon, un emplacement stylé indique le nom de fichier attendu.
 *
 * → Il n'y a donc RIEN à modifier dans le code pour ajouter vos photos :
 *   déposez simplement le fichier au bon nom dans public/images/services/
 */
export default function ImageSlot({
  src,
  alt,
  icon = 'image',
  className = '',
  ratio = 'aspect-[3/2]',
}) {
  const [failed, setFailed] = useState(false)
  const fileName = src?.split('/').pop()

  if (!failed && src) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
      </div>
    )
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${ratio} ${className}`}
      role="img"
      aria-label={`Emplacement photo : ${alt}`}
    >
      <div className="photo-slot absolute inset-0" />
      <div className="photo-slot-hatch absolute inset-0 opacity-[0.35]" />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-card text-brand">
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/90">
          Emplacement photo
        </span>
        {fileName && (
          <code className="rounded bg-page/70 px-2 py-1 text-[10px] text-muted">
            {fileName}
          </code>
        )}
      </div>
    </div>
  )
}
