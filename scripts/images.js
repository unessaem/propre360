/**
 * Optimisation des photos.
 *
 * Prend chaque image de  public/images/services/  et produit, dans
 * public/images/services/opt/ , plusieurs largeurs en WebP et en JPEG.
 * Le navigateur choisit ensuite la plus petite taille suffisante pour
 * l'écran du visiteur — un mobile ne télécharge plus une image conçue
 * pour un grand écran.
 *
 *   npm run images
 *
 * À relancer chaque fois que vous ajoutez ou remplacez une photo.
 * Le dossier opt/ est régénéré automatiquement, ne le modifiez pas à la main.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'public/images/services')
const OUT = path.join(SRC, 'opt')

// Largeurs générées. 480 couvre les mobiles, 1600 les grands écrans Retina.
const WIDTHS = [480, 640, 768, 1080, 1600]
const SOURCES = /\.(jpe?g|png|webp)$/i

const MANIFEST = path.join(root, 'src/data/optimized.json')

/** Le manifeste dit au site quelles variantes existent vraiment : sans lui,
 *  le navigateur demanderait des fichiers absents (erreurs 404). */
function writeManifest(map) {
  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true })
  fs.writeFileSync(MANIFEST, JSON.stringify(map, null, 2) + '\n')
}

if (!fs.existsSync(SRC)) {
  console.log('Aucun dossier public/images/services — rien à faire.')
  writeManifest({})
  process.exit(0)
}

fs.mkdirSync(OUT, { recursive: true })

const files = fs.readdirSync(SRC).filter((f) => SOURCES.test(f))
if (files.length === 0) {
  console.log('Aucune photo à optimiser. Déposez vos images dans public/images/services/.')
  writeManifest({})
  process.exit(0)
}

const manifest = {}
let totalIn = 0
let totalOut = 0

for (const file of files) {
  const name = file.replace(SOURCES, '')
  const input = path.join(SRC, file)
  const meta = await sharp(input).metadata()
  totalIn += fs.statSync(input).size
  manifest[name] = []

  for (const w of WIDTHS) {
    if (w > meta.width) continue // on n'agrandit jamais une image
    const base = sharp(input).resize({ width: w, withoutEnlargement: true })

    const webp = path.join(OUT, `${name}-${w}.webp`)
    await base.clone().webp({ quality: 72, effort: 6 }).toFile(webp)
    totalOut += fs.statSync(webp).size

    const jpg = path.join(OUT, `${name}-${w}.jpg`)
    await base.clone().jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(jpg)
    totalOut += fs.statSync(jpg).size

    manifest[name].push(w)
  }
  console.log(`  ${file.padEnd(26)} ${meta.width}×${meta.height} → ${WIDTHS.filter((w) => w <= meta.width).length} largeurs`)
}

writeManifest(manifest)

const ko = (n) => `${Math.round(n / 1024)} Ko`
console.log(`\n  ${files.length} photo(s) · sources ${ko(totalIn)} → variantes ${ko(totalOut)}`)
console.log('  Le navigateur ne télécharge qu\'une seule variante par image.')
