/** @type {import('tailwindcss').Config} */

// Un token sémantique = une variable CSS définie dans src/index.css.
// Le thème clair et le thème sombre changent uniquement ces variables,
// jamais les classes des composants.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  // Le thème clair est appliqué par la classe .light sur <html>
  // (voir src/lib/theme.js et le script anti-clignotement dans index.html).
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Couleurs de marque : identiques dans les deux thèmes ──────────
        navy: {
          950: '#050c1c',
          900: '#0a152e',
          800: '#0f2043',
          700: '#152c5c',
          600: '#1d3b78',
        },
        teal: {
          400: '#3ec9dd',
          500: '#22a7c2',
          600: '#17849c',
        },

        // ── Tokens sémantiques : basculent avec le thème ──────────────────
        page: token('page'), // fond de page
        card: token('card'), // cartes et panneaux
        band: token('band'), // bandes de section
        edge: token('edge'), // bordures et survols (utilisé avec /10, /15…)
        ink: token('ink'), // titres
        body: token('body'), // texte courant
        muted: token('muted'), // texte secondaire
        faint: token('faint'), // légendes, mentions
        brand: token('brand'), // turquoise lisible sur les deux fonds
        glowA: token('glow-a'), // halo décoratif turquoise
        glowB: token('glow-b'), // halo décoratif bleu
        gradEnd: token('grad-end'), // fin du dégradé du titre
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        card: 'var(--shadow-card)',
      },
    },
  },
  plugins: [],
}
