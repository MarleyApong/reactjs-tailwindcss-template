#!/usr/bin/env node
/**
 * Script de test pour vérifier la configuration des routes
 * Usage: node test-routes.js
 */

import { routeConfig } from "./src/routes/route.config.js"
import fs from "fs"
import path from "path"

const routesRoot = path.resolve("src/routes")

const routeGroups = {
  public: "/",
  auth: "/auth",
  protected: "/app",
}

console.log("🧪 Test de la configuration des routes\n")

// Parcourir tous les fichiers .tsx
for (const [group, basePath] of Object.entries(routeGroups)) {
  const dir = path.join(routesRoot, group)
  if (!fs.existsSync(dir)) continue

  console.log(`\n📂 Groupe: ${group} (basePath: "${basePath}")`)
  console.log("─".repeat(60))

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx") && f !== "index.tsx")

  files.forEach((file) => {
    const base = path.basename(file, ".tsx")
    const configKey = `${group}/${base}`
    const config = routeConfig[configKey]

    if (config) {
      const finalPath = config.path === "/" ? basePath : `${basePath}/${config.path}`.replace("//", "/")
      console.log(`✅ ${file.padEnd(20)} → ${finalPath}`)
    } else {
      const fallbackPath = `${basePath}/${base}`.replace("//", "/")
      console.log(`⚠️  ${file.padEnd(20)} → ${fallbackPath} (pas de config, fallback)`)
    }
  })
}

console.log("\n\n📊 Résumé de la configuration:")
console.log("─".repeat(60))
console.log(`Nombre total de routes configurées: ${Object.keys(routeConfig).length}`)

// Vérifier les routes configurées qui n'existent pas
console.log("\n🔍 Vérification des routes configurées:")
for (const configKey of Object.keys(routeConfig)) {
  const [group, fileName] = configKey.split("/")
  const filePath = path.join(routesRoot, group, `${fileName}.tsx`)

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${configKey} configuré mais fichier absent: ${filePath}`)
  }
}

console.log("\n✨ Test terminé !\n")
