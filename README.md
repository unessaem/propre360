# PROPRE 360 — Site vitrine

Landing page React + Vite + Tailwind pour **PROPRE 360**, société de nettoyage
professionnel à Marrakech. Demande de devis 100 % WhatsApp.

---

## 1. Démarrer

```bash
npm install
npm run dev          # http://localhost:5173
```

## 2. Mettre en ligne

```bash
npm run build        # génère le dossier dist/
```

Déposez le contenu de `dist/` chez votre hébergeur, ou connectez le dépôt GitHub
à **Cloudflare Pages** (gratuit, bande passante illimitée, usage commercial
autorisé) :

| Réglage | Valeur |
|---|---|
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variable d'environnement | `NODE_VERSION = 22` (obligatoire : Vite 8 exige Node 20.19+) |

⚠️ N'utilisez pas le plan gratuit de Vercel : il est réservé à un usage non
commercial, ce qui exclut un site d'entreprise.

Version en un seul fichier HTML (pratique pour un hébergement basique) :

```bash
SINGLE_FILE=1 npm run build   # génère dist-single/index.html
```

---

## 3. Ajouter vos photos ← l'étape qui vous concerne

Déposez vos images dans **`public/images/services/`** avec exactement ces noms :

| Fichier | Emplacement sur le site |
|---|---|
| `hero.jpg` | Grande image en haut de page |
| `grand-menage.jpg` | Grand ménage |
| `nettoyage-regulier.jpg` | Nettoyage régulier |
| `fin-de-chantier.jpg` | Nettoyage fin de chantier |
| `sols.jpg` | Nettoyage & traitement des sols |
| `vitres.jpg` | Nettoyage des vitres |
| `canapes-matelas.jpg` | Nettoyage canapés & matelas |
| `tapis.jpg` | Lavage professionnel de tapis |
| `cuivre-inox.jpg` | Traitement cuivre, inox & aluminium |
| `nuisibles.jpg` | Lutte contre insectes & nuisibles |

**Aucune modification de code n'est nécessaire.** Tant qu'un fichier est absent,
un emplacement stylé s'affiche à sa place ; dès qu'il existe, la photo apparaît.

- Cartes services : **1200 × 800 px** (format 3:2)
- Image hero : **1200 × 1500 px** (format 4:5)
- Poids conseillé : moins de 300 Ko (compressez sur squoosh.app)

Pour utiliser une autre extension (`.webp`, `.png`), modifiez le champ `image`
du service dans `src/data/services.js`.

---

## 4. Modifier les textes et le numéro

| Ce que vous voulez changer | Fichier |
|---|---|
| Numéro WhatsApp, téléphone, ville | `src/data/company.js` |
| Réseaux sociaux (Instagram, Facebook, LinkedIn) | `src/data/company.js` → tableau `socials` |
| Couleurs des thèmes clair et sombre | `src/index.css` → blocs `:root` et `:root.light` |
| Quartiers de la zone d'intervention | `src/data/company.js` |
| Textes des 9 services (titres, descriptions, puces) | `src/i18n/fr.js`, `en.js`, `ar.js` → `services.items` |
| Liste et images des services | `src/data/services.js` |
| Arguments « Pourquoi PROPRE 360 » | `src/i18n/*.js` → `why.items` |
| Questions / réponses FAQ | `src/i18n/*.js` → `faq.items` |
| Libellés du formulaire de devis | `src/i18n/*.js` → `quote` |
| Couleurs de la charte | `tailwind.config.js` |

> Le numéro WhatsApp est au format international **sans `+` ni espaces**
> (`212697665425`). C'est le format exigé par les liens `wa.me`.

---

## 5. Mode jour / nuit

Le bouton soleil-lune est dans l'en-tête, à gauche du numéro de téléphone.

- Au premier passage, le site suit **les réglages de l'appareil du visiteur**.
- Dès qu'il clique, son choix est retenu (`localStorage`) et prime sur le système.
- Un script placé dans `index.html` applique le thème **avant le premier
  affichage** : pas de flash blanc au chargement.

Aucune couleur n'est écrite en dur dans les composants. Tout passe par des
variables CSS définies dans `src/index.css` :

```css
:root        { /* thème sombre — valeur par défaut */ }
:root.light  { /* thème clair */ }
```

Pour ajuster une teinte, modifiez la variable, jamais les classes. Les
composants utilisent des noms sémantiques : `bg-page`, `bg-card`, `bg-band`,
`border-edge/10`, `text-ink`, `text-body`, `text-muted`, `text-faint`,
`text-brand`.

Le turquoise de la marque est volontairement assombri en mode clair
(`--c-brand`) pour rester lisible sur fond blanc. Contrastes mesurés :
titres 17:1, texte courant 10:1, accent 5:1 — au-delà du seuil WCAG AA.

---

## 6. Multilingue — français, anglais, arabe

Le sélecteur de langue (icône globe) est dans l'en-tête.

- Au premier passage, le site détecte **la langue du navigateur** du visiteur.
- Dès qu'il choisit, son choix est mémorisé (`localStorage`).
- Comme pour le thème, la langue et la direction du texte sont appliquées
  **avant le premier affichage**, via le script de `index.html`.

**Tous les textes du site sont dans `src/i18n/`** — trois fichiers de même
structure. Pour corriger une phrase, modifiez la ligne correspondante dans les
trois fichiers. Aucun texte n'est écrit en dur dans les composants.

### L'arabe et l'écriture de droite à gauche

L'arabe ne se contente pas d'une traduction, il inverse toute la mise en page.
Trois choses ont été traitées :

- **Direction** : `dir="rtl"` sur `<html>`, et les composants utilisent des
  classes logiques (`start-*`, `end-*`, `ps-*`, `pe-*`, `text-start`) qui se
  retournent automatiquement. La flèche du bouton « nos services » est mise en
  miroir par la classe `flip-rtl`.
- **Typographie** : la police **Cairo** remplace Inter en arabe. Les majuscules
  et l'interlettrage sont neutralisés — l'arabe n'a pas de majuscules, et
  l'espacement des lettres casse les ligatures.
- **Ce qui ne doit PAS s'inverser** : le numéro de téléphone, le champ date et
  les noms de fichiers portent `dir="ltr"` pour rester lisibles.

### Ajouter une quatrième langue

1. Copiez `src/i18n/fr.js` en `es.js` et traduisez les valeurs.
2. Dans `src/i18n/index.jsx`, importez-le et ajoutez-le à `languages`.
3. Ajoutez son code dans le script de `index.html` (objet `langs`).

---

## 7. Comment fonctionne la demande de devis

Aucun serveur, aucune base de données, aucune donnée stockée.

- **Boutons « Devis WhatsApp »** sur chaque carte service → ouvrent WhatsApp avec
  un message court mentionnant le service.
- **Formulaire de devis** → assemble service, type de lieu, surface, quartier,
  date, nom et précisions en un message complet, puis ouvre WhatsApp.

Dans les deux cas le client voit le message avant de l'envoyer.

---

## 8. Structure

```
public/
  logo-propre360.png          logo officiel PROPRE 360
  images/services/            ← vos photos ici
src/
  data/company.js             coordonnées et réseaux sociaux
  data/services.js            les 9 services (structure)
  lib/whatsapp.js             construction des liens wa.me
  lib/theme.js                mémorisation du thème clair / sombre
  i18n/fr.js en.js ar.js      TOUS les textes du site
  i18n/index.jsx              contexte de langue, direction, mémorisation
  components/                 sections de la page
  components/ThemeToggle.jsx  bouton jour / nuit
  components/LanguageSwitcher.jsx  sélecteur FR / EN / ع
```

## 9. Référencement

Le `<title>`, la meta description et les données structurées `LocalBusiness`
sont dans `index.html`. Pensez à y remplacer `https://propre360.com/` si le
domaine final est différent, et ajoutez le site à Google Business Profile pour
apparaître dans les recherches locales à Marrakech.
