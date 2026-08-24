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
| `lavage-voiture.jpg` | Lavage professionnel de voitures |
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
| Les 10 services (titres, descriptions, puces) | `src/data/services.js` |
| Arguments « Pourquoi PROPRE 360 » | `src/components/WhyUs.jsx` |
| Questions / réponses FAQ | `src/components/Faq.jsx` |
| Champs du formulaire de devis | `src/components/QuoteForm.jsx` |
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

## 6. Comment fonctionne la demande de devis

Aucun serveur, aucune base de données, aucune donnée stockée.

- **Boutons « Devis WhatsApp »** sur chaque carte service → ouvrent WhatsApp avec
  un message court mentionnant le service.
- **Formulaire de devis** → assemble service, type de lieu, surface, quartier,
  date, nom et précisions en un message complet, puis ouvre WhatsApp.

Dans les deux cas le client voit le message avant de l'envoyer.

---

## 7. Structure

```
public/
  logo-propre360.png          logo officiel PROPRE 360
  images/services/            ← vos photos ici
src/
  data/company.js             coordonnées et zone
  data/services.js            les 10 services
  lib/whatsapp.js             construction des liens wa.me
  lib/theme.js                mémorisation du thème clair / sombre
  components/                 sections de la page
  components/ThemeToggle.jsx  bouton jour / nuit
```

## 8. Référencement

Le `<title>`, la meta description et les données structurées `LocalBusiness`
sont dans `index.html`. Pensez à y remplacer `https://propre360.com/` si le
domaine final est différent, et ajoutez le site à Google Business Profile pour
apparaître dans les recherches locales à Marrakech.
