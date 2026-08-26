/**
 * Pré-rendu au moment du build.
 *
 * Sans lui, le HTML livré au navigateur est une coquille vide : le texte
 * n'apparaît qu'une fois React téléchargé, analysé et exécuté. C'est ce qui
 * pesait le plus lourd sur le score mobile (LCP) — et Google indexait une
 * page sans contenu.
 *
 * Génère :
 *   dist/index.html      français
 *   dist/en/index.html   anglais
 *   dist/ar/index.html   arabe
 *
 * Chaque page contient le HTML complet, ses propres balises title et
 * description, ses liens hreflang et ses données structurées.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const SITE = process.env.SITE_URL || 'https://propre360.com'
const LANGS = ['fr', 'en', 'ar']
const DIRS = { fr: 'ltr', en: 'ltr', ar: 'rtl' }
const PATHS = { fr: '/', en: '/en/', ar: '/ar/' }

const { render, languages: dicts } = await import(path.join(root, 'dist-ssr/entry-server.js'))

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Précharge les polices réellement utilisées au premier écran. */
function fontPreloads(lang) {
  const assets = path.join(dist, 'assets')
  if (!fs.existsSync(assets)) return ''
  const files = fs.readdirSync(assets)
  const wanted = lang === 'ar'
    ? [/^cairo-arabic-400/, /^cairo-arabic-800/]
    : [/^inter-latin-400/, /^plus-jakarta-sans-latin-800/]
  return files
    .filter((f) => f.endsWith('.woff2') && wanted.some((re) => re.test(f)))
    .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin>`)
    .join('\n    ')
}

/** Précharge l'image du héro : c'est l'élément LCP de la page. */
function heroPreload() {
  const opt = path.join(dist, 'images/services/opt')
  if (!fs.existsSync(opt)) return ''
  const variants = fs.readdirSync(opt).filter((f) => /^hero-\d+\.webp$/.test(f))
  if (variants.length === 0) return ''
  const srcset = variants
    .map((f) => `/images/services/opt/${f} ${f.match(/-(\d+)\.webp$/)[1]}w`)
    .sort()
    .join(', ')
  return `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset}" imagesizes="(min-width: 1024px) 45vw, 100vw" fetchpriority="high">`
}

function structuredData(lang, t) {
  const services = Object.values(t.services.items).map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.title, description: s.description },
  }))

  const business = {
    '@context': 'https://schema.org',
    '@type': 'HouseholdCleaningService',
    '@id': `${SITE}/#business`,
    name: 'PROPRE 360',
    description: t.seo.description,
    url: SITE + PATHS[lang],
    telephone: '+212697665425',
    image: `${SITE}/images/services/hero.jpg`,
    logo: `${SITE}/logo-propre360.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marrakech',
      addressRegion: 'Marrakech-Safi',
      addressCountry: 'MA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 31.6295, longitude: -7.9811 },
    areaServed: [
      { '@type': 'City', name: 'Marrakech' },
      ...t.zone.neighborhoods.map((n) => ({ '@type': 'Place', name: n })),
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.title,
      itemListElement: services,
    },
    sameAs: [
      'https://www.instagram.com/propre360/',
      'https://www.facebook.com/Propre360/',
      'https://www.linkedin.com/company/propre360/',
    ],
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: t.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [business, faq]
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n    ')
}

function head(lang) {
  const t = dicts[lang]
  const url = SITE + PATHS[lang]
  const alternates = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${PATHS[l]}">`
  ).join('\n    ')

  return `<title>${esc(t.seo.title)}</title>
    <meta name="description" content="${esc(t.seo.description)}">
    <meta name="keywords" content="${esc(t.seo.keywords)}">
    <link rel="canonical" href="${url}">
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE}/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="PROPRE 360">
    <meta property="og:locale" content="${t.seo.ogLocale}">
    <meta property="og:title" content="${esc(t.seo.title)}">
    <meta property="og:description" content="${esc(t.seo.description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${SITE}/images/services/hero.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="1500">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(t.seo.title)}">
    <meta name="twitter:description" content="${esc(t.seo.description)}">
    <meta name="twitter:image" content="${SITE}/images/services/hero.jpg">
    <meta name="geo.region" content="MA-MAR">
    <meta name="geo.placename" content="Marrakech">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="preload" as="image" href="/logo-propre360.webp" type="image/webp" fetchpriority="high">
    ${heroPreload()}
    ${fontPreloads(lang)}
    ${structuredData(lang, t)}`
}

for (const lang of LANGS) {
  const body = render(lang)

  let html = template
    .replace('<html lang="fr">', `<html lang="${lang}" dir="${DIRS[lang]}">`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  // On remplace tout le bloc <title>…</head> par le head propre à la langue.
  html = html.replace(/<title>[\s\S]*?(?=\n\s*<!-- Applique le thème)/, head(lang) + '\n\n    ')

  // Les ressources sont référencées en absolu : /en/ et /ar/ y accèdent aussi.
  html = html.replace(/(src|href)="\.\//g, '$1="/')

  const out = lang === 'fr' ? path.join(dist, 'index.html') : path.join(dist, lang, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log(`  ${PATHS[lang].padEnd(6)} ${(body.length / 1024).toFixed(0)} Ko de HTML pré-généré`)
}

// Plan de site
const urls = LANGS.map((l) => {
  const alts = LANGS.map(
    (a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${SITE}${PATHS[a]}"/>`
  ).join('\n')
  return `  <url>
    <loc>${SITE}${PATHS[l]}</loc>
${alts}
    <changefreq>monthly</changefreq>
    <priority>${l === 'fr' ? '1.0' : '0.8'}</priority>
  </url>`
}).join('\n')

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
)

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
)

console.log('  sitemap.xml et robots.txt générés')
