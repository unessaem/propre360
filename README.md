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
| Variable d'environnement | `SITE_URL = https://propre360.com` (URL canoniques et sitemap) |

Le build enchaîne quatre étapes : optimisation des photos, compilation,
rendu serveur, puis génération des trois pages HTML (`/`, `/en/`, `/ar/`)
avec leur sitemap, leur robots.txt et une page 404.

### Déploiement via Cloudflare Workers (`wrangler deploy`)

Le fichier **`wrangler.jsonc` à la racine est obligatoire**. Sans lui,
`wrangler deploy` lance une auto-configuration qui installe son propre plugin
Vite, déplace la sortie du build, et fait échouer l'étape de pré-rendu avec :

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../dist-ssr/entry-server.js'
```

Ne le supprimez pas. Si vous renommez le projet Cloudflare, mettez à jour le
champ `name` en conséquence.

Il contient aussi la ligne qui déclenche la compilation :

```jsonc
"build": { "command": "npm run build" }
```

Sans elle, `wrangler deploy` échouerait avec :

```
The directory specified by the "assets.directory" field does not exist: /opt/buildhome/repo/dist
```

C'est logique : une fois l'auto-configuration désactivée, plus rien ne
générait le dossier `dist/`.

**Solution de repli** si cette ligne ne suffisait pas : dans le tableau de
bord Cloudflare, remplacez la commande de déploiement `npx wrangler deploy`
par `npm run build && npx wrangler deploy`.

> `not_found_handling` est volontairement réglé sur `404-page` et non sur
> `single-page-application` : le site a de vraies pages séparées par langue,
> pas une application monopage.

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
  components/ImageSlot.jsx    images responsives + emplacements vides
  fonts.js                    polices auto-hébergées
  entry-server.jsx            point d'entrée du pré-rendu
scripts/
  images.js                   génère les variantes WebP / JPEG
  prerender.js                génère les 3 pages HTML, sitemap et robots
```

## 9. Référencement (SEO)

### Le domaine final

Le SEO est calculé au build à partir de `SITE_URL`. **Tant que cette variable
n'est pas définie, toutes les URL canoniques pointent vers `propre360.com`.**
Sur Cloudflare Pages, ajoutez la variable d'environnement :

```
SITE_URL = https://propre360.com
```

### Une URL par langue

Le site génère trois pages indexables séparément :

| URL | Langue | Balise `<title>` |
|---|---|---|
| `/` | Français | Société de nettoyage à Marrakech \| PROPRE 360 — Devis gratuit |
| `/en/` | Anglais | Cleaning Company in Marrakech \| PROPRE 360 — Free Quote |
| `/ar/` | Arabe | شركة تنظيف بمراكش \| PROPRE 360 — عرض سعر مجاني |

Chacune porte son `canonical`, ses liens `hreflang` croisés et un
`x-default` vers le français. C'est indispensable : sans ça, Google
considérerait les trois versions comme du contenu dupliqué.

### Ce qui est généré automatiquement

- `sitemap.xml` avec les trois URL et leurs alternances de langue
- `robots.txt` pointant vers le sitemap
- Données structurées `HouseholdCleaningService` : téléphone, horaires,
  coordonnées GPS de Marrakech, les 9 services, les 12 quartiers desservis,
  et les liens Instagram / Facebook / LinkedIn
- Données structurées `FAQPage` : les 6 questions peuvent apparaître
  directement dépliées dans les résultats Google

### Les mots-clés visés

Le `<h1>` est passé de « Propreté complète, 360° pour vous » à
**« Nettoyage professionnel à Marrakech »**. Le slogan reste juste en dessous.
Un slogan de marque ne se recherche pas ; « nettoyage Marrakech », si.

Mots-clés principaux, repris dans le titre, la description et le contenu :

| Requête | Où elle est couverte |
|---|---|
| société de nettoyage Marrakech | `<title>`, H1, description |
| nettoyage canapé / matelas Marrakech | carte service + FAQ |
| nettoyage tapis / lavage tapis Marrakech | carte service |
| ménage à domicile Marrakech | carte « nettoyage régulier » |
| nettoyage fin de chantier / après travaux Marrakech | carte service |
| désinsectisation / dératisation Marrakech | carte « nuisibles » |
| nettoyage vitres Marrakech | carte service |
| nettoyage villa / riad / bureau Marrakech | bandeau « nous intervenons pour » |
| quartiers (Guéliz, Hivernage, Palmeraie…) | section Zone + `areaServed` |

### Ce qui reste à faire hors du site

Le code ne fait que la moitié du travail. Pour le référencement local :

1. **Google Business Profile** — c'est le levier n°1 à Marrakech. Sans fiche,
   vous n'apparaissez pas dans le bloc carte, qui capte l'essentiel des clics.
2. **Annuaires marocains** — Telecontact (pages jaunes), avec le même nom,
   la même adresse et le même téléphone que sur le site, au caractère près.
3. **Avis clients** — le nombre et la fraîcheur des avis Google pèsent plus
   que n'importe quelle optimisation technique dans les résultats locaux.

### Une remarque honnête sur l'arabe

La recherche montre que les requêtes en arabe pour Marrakech sont largement
dominées par des sites du Golfe : le volume local est faible, les Marocains
cherchent ce type de service en français. La version arabe est excellente
pour le confort de vos visiteurs, mais **n'en attendez pas de trafic Google**.
Concentrez vos efforts SEO sur le français.

---

## 10. Performance

Mesures Lighthouse, mobile, avec compression serveur :

| Indicateur | Avant | Après |
|---|---|---|
| Score performance | 78 | **94** |
| Accessibilité | — | **100** |
| Bonnes pratiques | — | **100** |
| SEO | — | **100** |
| First Contentful Paint | 2,6 s | **1,9 s** |
| Largest Contentful Paint | 4,4 s | **2,9 s** |
| Total Blocking Time | 110 ms | **30 ms** |
| Speed Index | 4,2 s | **1,9 s** |

### Ce qui a été corrigé, par ordre d'impact

**1. Le HTML était vide.** Le navigateur recevait `<div id="root"></div>` et
devait télécharger puis exécuter React avant d'afficher le moindre mot. Le
site est maintenant **pré-généré au build** (`scripts/prerender.js`) : le HTML
livré contient déjà tout le texte. React ne fait plus que « réveiller » la
page. Google, lui, voit désormais 8 000 caractères de contenu au lieu d'une
page blanche.

**2. Le logo pesait 283 Ko** pour être affiché en 44 pixels. Redimensionné en
256 px et converti en WebP : **7 Ko**, soit 40 fois moins.

**3. Les polices venaient de Google Fonts**, ce qui imposait deux connexions
externes bloquantes avant le premier affichage. Elles sont maintenant
**auto-hébergées** (`src/fonts.js`), découpées par alphabet — la police arabe
n'est téléchargée que sur `/ar/` — et les deux polices du premier écran sont
préchargées.

**4. Les images n'avaient qu'une seule taille.** `npm run images` génère
maintenant 5 largeurs en WebP et JPEG ; un mobile télécharge 79 Ko au lieu
de 273 Ko. L'image du héro est préchargée en priorité haute.

### En ajoutant vos photos

```bash
npm run images     # génère les variantes optimisées
```

C'est déjà inclus dans `npm run build`, donc Cloudflare le fait tout seul à
chaque déploiement. Le dossier `public/images/services/opt/` est régénéré
automatiquement : ne le modifiez pas à la main.

> Une image n'apparaît sur le site que si `npm run images` a tourné après son
> ajout. C'est volontaire : le site ne demande jamais un fichier qui n'existe
> pas, ce qui évite les erreurs 404.
