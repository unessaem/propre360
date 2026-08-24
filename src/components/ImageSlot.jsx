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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
      </div>
    )
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${ratio} ${className}`}
      role="img"
      aria-label={`Emplacement photo : ${alt}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,167,194,0.28),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(29,59,120,0.5),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-400/40 bg-navy-900/60 text-teal-400">
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-400/90">
          Emplacement photo
        </span>
        {fileName && (
          <code className="rounded bg-navy-950/70 px-2 py-1 text-[10px] text-slate-300/80">
            {fileName}
          </code>
        )}
      </div>
    </div>
  )
}
