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

Déposez le contenu de `dist/` chez votre hébergeur, ou connectez le dossier du
projet à **Vercel** ou **Netlify** (détection automatique de Vite, aucune
configuration nécessaire).

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
| Numéro WhatsApp, téléphone, ville, Instagram | `src/data/company.js` |
| Quartiers de la zone d'intervention | `src/data/company.js` |
| Les 10 services (titres, descriptions, puces) | `src/data/services.js` |
| Arguments « Pourquoi PROPRE 360 » | `src/components/WhyUs.jsx` |
| Questions / réponses FAQ | `src/components/Faq.jsx` |
| Champs du formulaire de devis | `src/components/QuoteForm.jsx` |
| Couleurs de la charte | `tailwind.config.js` |

> Le numéro WhatsApp est au format international **sans `+` ni espaces**
> (`212697665425`). C'est le format exigé par les liens `wa.me`.

---

## 5. Comment fonctionne la demande de devis

Aucun serveur, aucune base de données, aucune donnée stockée.

- **Boutons « Devis WhatsApp »** sur chaque carte service → ouvrent WhatsApp avec
  un message court mentionnant le service.
- **Formulaire de devis** → assemble service, type de lieu, surface, quartier,
  date, nom et précisions en un message complet, puis ouvre WhatsApp.

Dans les deux cas le client voit le message avant de l'envoyer.

---

## 6. Structure

```
public/
  logo-propre360.png          logo officiel PROPRE 360
  images/services/            ← vos photos ici
src/
  data/company.js             coordonnées et zone
  data/services.js            les 10 services
  lib/whatsapp.js             construction des liens wa.me
  components/                 sections de la page
```

## 7. Référencement

Le `<title>`, la meta description et les données structurées `LocalBusiness`
sont dans `index.html`. Pensez à y remplacer `https://propre360.com/` si le
domaine final est différent, et ajoutez le site à Google Business Profile pour
apparaître dans les recherches locales à Marrakech.
