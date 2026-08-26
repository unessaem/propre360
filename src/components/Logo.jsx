import { company } from '../data/company'

/**
 * Logo PROPRE 360.
 * WebP en premier (7 Ko), PNG en secours pour les navigateurs anciens (22 Ko).
 * Les dimensions sont déclarées : le navigateur réserve la place, aucun
 * décalage de mise en page au chargement.
 */
export default function Logo({ className = 'h-full w-full object-contain' }) {
  return (
    <picture>
      <source srcSet="/logo-propre360.webp" type="image/webp" />
      <img
        src="/logo-propre360.png"
        alt={`${company.name} — logo`}
        width={256}
        height={206}
        fetchPriority="high"
        className={className}
      />
    </picture>
  )
}
