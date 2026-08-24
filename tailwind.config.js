/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(34, 167, 194, 0.55)',
        card: '0 20px 50px -20px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}
