// ─────────────────────────────────────────────────────────────
//  Les 10 services PROPRE 360 (repris du compte Instagram).
//
//  POUR AJOUTER VOS PHOTOS :
//  déposez une image dans  public/images/services/
//  en respectant EXACTEMENT le nom indiqué dans "image".
//  Tant que le fichier n'existe pas, un emplacement stylé s'affiche.
//  Format conseillé : JPG ou WebP, 1200 × 800 px, < 300 Ko.
// ─────────────────────────────────────────────────────────────

export const services = [
  {
    id: 'grand-menage',
    title: 'Grand ménage',
    short: 'Un nettoyage complet de votre espace',
    description:
      'Chaque recoin soigneusement nettoyé pour un intérieur frais, sain et parfaitement entretenu.',
    points: [
      'Nettoyage des surfaces',
      'Entretien du mobilier',
      'Nettoyage des sols',
      'Propreté complète à 360°',
    ],
    image: '/images/services/grand-menage.jpg',
    icon: 'sparkle',
  },
  {
    id: 'nettoyage-regulier',
    title: 'Nettoyage régulier',
    short: 'Un espace toujours propre, sans effort',
    description:
      'Des interventions planifiées, adaptées à votre rythme et à vos besoins, par une équipe de confiance.',
    points: ['Maison', 'Appartement', 'Bureau', 'Espaces professionnels'],
    image: '/images/services/nettoyage-regulier.jpg',
    icon: 'calendar',
  },
  {
    id: 'fin-de-chantier',
    title: 'Nettoyage fin de chantier',
    short: 'Votre chantier devient un espace impeccable',
    description:
      'Après les travaux, notre équipe élimine poussière, déchets et traces pour vous livrer un espace prêt à utiliser.',
    points: [
      'Dépoussiérage complet',
      'Nettoyage des vitres et surfaces',
      'Traitement des sols',
      'Finition professionnelle',
    ],
    image: '/images/services/fin-de-chantier.jpg',
    icon: 'hardhat',
  },
  {
    id: 'sols',
    title: 'Nettoyage & traitement des sols',
    short: 'Des sols impeccables, un résultat professionnel',
    description:
      'Équipements professionnels pour nettoyer, traiter et protéger durablement vos sols.',
    points: ['Villas', 'Bureaux', 'Hôtels', 'Espaces commerciaux'],
    image: '/images/services/sols.jpg',
    icon: 'floor',
  },
  {
    id: 'vitres',
    title: 'Nettoyage des vitres',
    short: 'Une transparence parfaite, une vue impeccable',
    description:
      'Pour maisons, villas, bureaux et espaces commerciaux : des vitres nettes, sans la moindre trace.',
    points: [
      'Vitres impeccables',
      'Plus de lumière naturelle',
      'Finition sans traces',
      'Équipe formée et sécurisée',
    ],
    image: '/images/services/vitres.jpg',
    icon: 'window',
  },
  {
    id: 'canapes-matelas',
    title: 'Nettoyage canapés & matelas',
    short: 'Redonnez une nouvelle vie à vos tissus',
    description:
      'Nettoyage professionnel en profondeur pour éliminer la poussière, les taches et les impuretés.',
    points: [
      'Propreté en profondeur',
      'Hygiène garantie',
      'Tissus préservés',
      'Un intérieur plus sain',
    ],
    image: '/images/services/canapes-matelas.jpg',
    icon: 'sofa',
  },
  {
    id: 'tapis',
    title: 'Lavage professionnel de tapis',
    short: 'Redonnez fraîcheur et éclat à vos tapis',
    description:
      'Nettoyage en profondeur qui élimine poussière et saletés tout en préservant les fibres.',
    points: [
      'Nettoyage en profondeur',
      'Protection des fibres',
      'Résultat professionnel',
      'À domicile ou au bureau',
    ],
    image: '/images/services/tapis.jpg',
    icon: 'rug',
  },
  {
    id: 'cuivre-inox',
    title: 'Traitement cuivre, inox & aluminium',
    short: 'Redonnez de l’éclat à vos surfaces',
    description:
      'Nettoyage, traitement et restauration de vos surfaces métalliques avec des produits professionnels.',
    points: [
      'Éclat retrouvé, brillant et durable',
      'Traitement anti-oxydation',
      'Nettoyage précis sans abîmer',
      'Savoir-faire professionnel',
    ],
    image: '/images/services/cuivre-inox.jpg',
    icon: 'shine',
  },
  {
    id: 'lavage-voiture',
    title: 'Lavage professionnel de voitures',
    short: 'Une propreté impeccable, sans vous déplacer',
    description:
      'Service de lavage professionnel directement chez vous, intérieur et extérieur.',
    points: [
      'Lavage extérieur & haute pression',
      'Nettoyage des jantes',
      'Finition brillante',
      'Service à domicile',
    ],
    image: '/images/services/lavage-voiture.jpg',
    icon: 'car',
  },
  {
    id: 'nuisibles',
    title: 'Lutte contre insectes & nuisibles',
    short: 'Protégez votre espace avec une intervention professionnelle',
    description:
      'Intervention discrète et sécurisée contre les nuisibles, pour un environnement propre et sain.',
    points: [
      'Cafards, fourmis, moustiques',
      'Mouches, araignées et autres insectes',
      'Sécurité pour la famille et les animaux',
      'Service discret et efficace',
    ],
    image: '/images/services/nuisibles.jpg',
    icon: 'shield',
  },
]
