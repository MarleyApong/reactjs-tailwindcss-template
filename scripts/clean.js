#!/usr/bin/env node

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { existsSync } from "node:fs"
import { rm } from "node:fs/promises"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

const itemsToClean = [
  // Dépendances
  "node_modules",
  "package-lock.json",

  // Build artifacts
  "dist",
  ".vite",

  // Cache et temp
  ".cache",
  ".tmp",
  ".temp",

  // TypeScript
  "tsconfig.tsbuildinfo",

  // Coverage et tests
  "coverage",
  ".nyc_output",
]

async function clean() {
  console.log("🧹 Nettoyage du projet...\n")

  let cleaned = 0
  let skipped = 0

  for (const item of itemsToClean) {
    const itemPath = join(rootDir, item)

    if (existsSync(itemPath)) {
      try {
        await rm(itemPath, { recursive: true, force: true })
        console.log(`✅ Supprimé: ${item}`)
        cleaned++
      } catch (error) {
        console.error(`❌ Erreur lors de la suppression de ${item}:`, error.message)
      }
    } else {
      console.log(`⏭️  Ignoré: ${item} (n'existe pas)`)
      skipped++
    }
  }

  console.log(`\n✨ Nettoyage terminé!`)
  console.log(`   • ${cleaned} élément(s) supprimé(s)`)
  console.log(`   • ${skipped} élément(s) ignoré(s)`)

  if (cleaned > 0) {
    console.log(
      "\n💡 Pour réinstaller les dépendances, exécutez: npm install\n"
    )
  }
}

clean().catch((error) => {
  console.error("❌ Erreur fatale:", error)
  process.exit(1)
})
