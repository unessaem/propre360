// ─────────────────────────────────────────────────────────────
//  Structure des services : identifiant, image et icône.
//
//  Les TEXTES (titre, description, points) sont dans les fichiers
//  de traduction : src/i18n/fr.js, en.js et ar.js, sous
//  services.items.<id>. Pour ajouter un service, créez son entrée
//  ici puis la même clé dans les trois langues.
//
//  POUR AJOUTER VOS PHOTOS :
//  déposez une image dans  public/images/services/
//  en respectant EXACTEMENT le nom indiqué dans "image".
//  Tant que le fichier n'existe pas, un emplacement stylé s'affiche.
//  Format conseillé : JPG ou WebP, 1200 × 800 px, < 300 Ko.
// ─────────────────────────────────────────────────────────────

export const services = [
  { id: 'grand-menage', image: '/images/services/grand-menage.jpg', icon: 'sparkle' },
  { id: 'nettoyage-regulier', image: '/images/services/nettoyage-regulier.jpg', icon: 'calendar' },
  { id: 'fin-de-chantier', image: '/images/services/fin-de-chantier.jpg', icon: 'hardhat' },
  { id: 'sols', image: '/images/services/sols.jpg', icon: 'floor' },
  { id: 'vitres', image: '/images/services/vitres.jpg', icon: 'window' },
  { id: 'canapes-matelas', image: '/images/services/canapes-matelas.jpg', icon: 'sofa' },
  { id: 'tapis', image: '/images/services/tapis.jpg', icon: 'rug' },
  { id: 'cuivre-inox', image: '/images/services/cuivre-inox.jpg', icon: 'shine' },
  { id: 'nuisibles', image: '/images/services/nuisibles.jpg', icon: 'shield' },
]
