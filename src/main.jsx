import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './fonts'
import './index.css'

const root = document.getElementById('root')

// Le HTML est pré-généré au build : on hydrate au lieu de tout reconstruire.
if (root.hasChildNodes()) {
  hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
