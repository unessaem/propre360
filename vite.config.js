import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLE_FILE=1 npm run build  →  génère un unique dist/index.html
const single = process.env.SINGLE_FILE === '1'

export default defineConfig({
  plugins: [react(), ...(single ? [viteSingleFile()] : [])],
  build: {
    outDir: single ? 'dist-single' : 'dist',
    assetsInlineLimit: single ? 100000000 : 4096,
  },
})
