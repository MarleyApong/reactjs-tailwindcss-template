import fs from "fs"
import path from "path"
import chokidar from "chokidar"

// Racine des routes et fichier router global
const routesRoot = path.resolve("src/routes")
const routerFile = path.resolve("src/router.ts")

// Groupes de routes et leur basePath
const routeGroups: Record<string, string> = {
  public: "/",
  auth: "/auth",
  protected: "/app",
}

// ------------------------------------------------------------
// 📌 Import config des overrides
// ------------------------------------------------------------
let routeConfig: Record<string, { path?: string; override?: boolean }> = {}
const routeConfigFile = path.resolve("src/routes/route.config.ts")

// Fonction pour recharger la config dynamiquement
function loadRouteConfig() {
  try {
    // Lire et parser le fichier manuellement pour éviter les problèmes de cache
    if (fs.existsSync(routeConfigFile)) {
      const content = fs.readFileSync(routeConfigFile, "utf8")
      
      // Vérifier si le fichier est corrompu (trop court)
      if (content.length < 100) {
        console.warn("⚠️  route.config.ts seems corrupted, will regenerate")
        routeConfig = {}
        return
      }
      
      // Parser ligne par ligne pour extraire les configurations
      const lines = content.split("\n")
      const config: Record<string, { path?: string; override?: boolean }> = {}
      
      for (const line of lines) {
        // Matcher les lignes de config : "group/file": { path: "...", override: ... }
        const match = line.match(/^\s*"([^"]+)":\s*\{\s*path:\s*"([^"]*)"\s*,\s*override:\s*(true|false)\s*\}/)
        if (match) {
          const [, key, path, override] = match
          config[key] = {
            path: path,
            override: override === "true"
          }
        }
      }
      
      if (Object.keys(config).length === 0) {
        console.warn("⚠️  Could not parse any routes from route.config.ts, will regenerate")
        routeConfig = {}
      } else {
        routeConfig = config
        console.log(`✅ Loaded ${Object.keys(config).length} route configurations`)
      }
    } else {
      // Fichier n'existe pas, sera créé par syncRouteConfig
      routeConfig = {}
    }
  } catch (err) {
    console.warn("⚠️  Error loading route.config.ts:", err instanceof Error ? err.message : "unknown error")
    routeConfig = {}
  }
}

// ------------------------------------------------------------
// 🛠️ UTILITAIRES
// ------------------------------------------------------------
function pascalCase(str: string): string {
  // Convertir un nom de fichier en PascalCase pour le nom de composant
  // Règle simple : séparer sur les délimiteurs, puis PascalCase chaque mot
  
  // Séparer sur les délimiteurs courants : -, _, ., espaces
  return str
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function camelCase(str: string): string {
  // Convertir en camelCase (première lettre en minuscule)
  const pascal = pascalCase(str)
  if (!pascal) return ''
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

function getAllFiles(dir: string): string[] {
  let results: string[] = []
  if (!fs.existsSync(dir)) return results

  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath))
    } else if (file.endsWith(".tsx") && file !== "index.tsx") {
      results.push(filePath)
    }
  })
  return results
}

function makeLocalRouteSegment(filePath: string, groupFolder: string) {
  const relative = filePath
    .replace(routesRoot, "")
    .replace(/\\/g, "/")
    .replace(`/${groupFolder}`, "")
    .replace(".tsx", "")

  return relative
    .split("/")
    .filter(Boolean)
    .map((seg) => seg.toLowerCase())
    .join("/")
}

// ------------------------------------------------------------
// 🔄 SYNCHRONISATION DE route.config.ts
// ------------------------------------------------------------
function syncRouteConfig() {
  // Collecter toutes les routes existantes dans les fichiers
  const existingRoutes = new Set<string>()
  const routesByGroup: Record<string, string[]> = { public: [], auth: [], protected: [] }
  
  for (const [group] of Object.entries(routeGroups)) {
    const dir = path.join(routesRoot, group)
    const files = getAllFiles(dir)
    
    files.forEach((file) => {
      const base = path.basename(file, ".tsx")
      const configKey = `${group}/${base}`
      existingRoutes.add(configKey)
      routesByGroup[group].push(configKey)
    })
  }
  
  // Si le fichier n'existe pas, le créer avec toutes les routes
  if (!fs.existsSync(routeConfigFile)) {
    const header = `/**
 * Clef = \`\${group}/\${fileName}\` (sans l'extension .tsx)
 * Exemple : 'protected/dashboard' => route dans protected/dashboard.tsx
 * 
 * 🎯 RÈGLES DES PATHS :
 * 
 * 1. **Path RELATIF** (sans "/" au début) : 
 *    → Ajouté au basePath du groupe
 *    Exemple : "auth/login": { path: "login" } → URL finale : /auth/login
 * 
 * 2. **Path ABSOLU** (avec "/" au début) :
 *    → Priorité absolue, ignore le basePath du groupe
 *    Exemple : "auth/login": { path: "/login" } → URL finale : /login (pas /auth/login)
 * 
 * 3. **Path "/"** : Route index du groupe
 * 
 * 🔧 PROPRIÉTÉ \`override\` :
 * - \`false\` (défaut) : Utilise la structure de fichiers (path ignoré si non absolu)
 * - \`true\` : Force l'utilisation du path personnalisé défini ici
 * 
 * ⚠️ Ce fichier est AUTO-GÉNÉRÉ mais vos modifications sont préservées !
 * - Nouvelles routes → ajoutées automatiquement avec override: false
 * - Routes supprimées → retirées automatiquement
 * - Vos overrides → toujours préservés
 * 
 * ⚠️ ATTENTION : Si vous supprimez ce fichier, il sera recréé automatiquement
 *    mais TOUTES vos modifications personnalisées seront perdues !
 * 
 * 💡 NOTE : Les modifications de ce fichier nécessitent un redémarrage du serveur
 *    pour être prises en compte (Ctrl+C puis \`npm run dev\`)
 */
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
`
    
    let content = header
    const groupComments: Record<string, string> = {
      public: "Routes publiques (basePath: \"/\")",
      auth: "Routes d'authentification (basePath: \"/auth\")",
      protected: "Routes protégées (basePath: \"/app\")",
    }
    
    for (const [group, routes] of Object.entries(routesByGroup)) {
      if (routes.length > 0) {
        content += `  // ------------------------------\n`
        content += `  // ${groupComments[group]}\n`
        content += `  // ------------------------------\n`
        
        for (const configKey of routes) {
          const base = configKey.split("/")[1]
          const defaultPath = base === "home" ? "/" : base.toLowerCase()
          content += `  "${configKey}": { path: "${defaultPath}", override: false },\n`
        }
        content += `\n`
      }
    }
    
    content += `  // Exemples d'overrides personnalisés :\n`
    content += `  // "protected/settings": { path: "mon-compte/parametres", override: true }, // → /app/mon-compte/parametres\n`
    content += `  // "public/about": { path: "/a-propos", override: true }, // → /a-propos (absolu)\n`
    content += `}\n`
    
    fs.writeFileSync(routeConfigFile, content)
    console.log(`✨ Created: route.config.ts`)
    return
  }
  
  // Fichier existe : ne modifier QUE pour ajouter/retirer des routes
  const currentContent = fs.readFileSync(routeConfigFile, "utf8")
  const lines = currentContent.split("\n")
  const newLines: string[] = []
  const configuredRoutes = new Set<string>()
  
  // Parser ligne par ligne
  for (const line of lines) {
    // Détecter les lignes de configuration de routes
    const match = line.match(/^\s*"([^"]+)":\s*\{/)
    
    if (match) {
      const configKey = match[1]
      configuredRoutes.add(configKey)
      
      // Garder la ligne SI la route existe toujours dans les fichiers
      if (existingRoutes.has(configKey)) {
        newLines.push(line)
      }
      // Sinon on supprime la ligne (ne pas l'ajouter)
    } else {
      // Ligne de commentaire ou autre : garder telle quelle
      newLines.push(line)
    }
  }
  
  // Ajouter les nouvelles routes (celles qui existent dans les fichiers mais pas dans la config)
  const newRoutesToAdd = Array.from(existingRoutes).filter(k => !configuredRoutes.has(k))
  
  if (newRoutesToAdd.length > 0) {
    // Trouver où insérer (avant la ligne de fermeture "}")
    let insertIndex = newLines.length - 1
    while (insertIndex > 0 && !newLines[insertIndex].trim().startsWith("}")) {
      insertIndex--
    }
    
    // Grouper les nouvelles routes par groupe
    const newByGroup: Record<string, string[]> = { public: [], auth: [], protected: [] }
    for (const configKey of newRoutesToAdd) {
      const [group, base] = configKey.split("/")
      const defaultPath = base === "home" ? "/" : base.toLowerCase()
      newByGroup[group].push(`  "${configKey}": { path: "${defaultPath}", override: false }, // 🆕 Auto-ajouté`)
    }
    
    // Insérer les nouvelles routes
    const toInsert: string[] = []
    for (const [group, routes] of Object.entries(newByGroup)) {
      if (routes.length > 0) {
        toInsert.push(``)
        toInsert.push(`  // 🆕 Nouvelles routes ${group}`)
        toInsert.push(...routes)
      }
    }
    
    newLines.splice(insertIndex, 0, ...toInsert)
    
    fs.writeFileSync(routeConfigFile, newLines.join("\n"))
    console.log(`✅ Updated: route.config.ts (+${newRoutesToAdd.length} nouvelles routes)`)
  } else if (configuredRoutes.size > existingRoutes.size) {
    // Des routes ont été supprimées
    fs.writeFileSync(routeConfigFile, newLines.join("\n"))
    const deleted = configuredRoutes.size - existingRoutes.size
    console.log(`✅ Updated: route.config.ts (-${deleted} routes supprimées)`)
  }
}



// ------------------------------------------------------------
// 🧩 GÉNÉRATION DES INDEX
// ------------------------------------------------------------
function generateIndexFile(group: string, basePath: string) {
  const dir = path.join(routesRoot, group)
  const files = getAllFiles(dir)

  const imports: string[] = [
    `import { createRoute } from '@tanstack/react-router'`,
    `import { rootRoute } from '@/routes/root'`,
  ]
  const routeDefs: string[] = []

  // Parent route avec basePath
  // Pour 'public', on utilise un id sans path pour éviter les conflits
  // Les routes enfants définissent leurs propres paths absolus
  const parentDef = group === 'public' 
    ? `export const ${group}Route = createRoute({
  getParentRoute: () => rootRoute,
  id: '_${group}',
})`
    : `export const ${group}Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '${basePath}',
})`

  files.forEach((file) => {
    const rel = path.relative(dir, file).replace(/\\/g, "/")
    const base = path.basename(file, ".tsx")
    const compName = pascalCase(base.replace("$", "Param"))
    const routeVar = `${camelCase(base.replace("$", "Param"))}Route`
    const importPath = "./" + rel.replace(".tsx", "")
    imports.push(`import ${compName} from '${importPath}'`)

    const local = makeLocalRouteSegment(file, group)
    
    // Construction de la clé de config : utilise le nom du fichier, pas le segment généré
    const configKey = `${group}/${base}`
    const config = routeConfig[configKey]
    
    // Vérifier si l'override est activé
    const useOverride = config?.override === true
    
    // Cherche d'abord dans routeConfig, sinon utilise le segment local généré
    let childPath: string
    let isAbsolutePath = false
    
    if (useOverride && config?.path !== undefined) {
      // Override activé : utilise le path personnalisé
      childPath = config.path
      // Si le path commence par "/", c'est un chemin absolu (priorité sur basePath du groupe)
      isAbsolutePath = childPath.startsWith("/")
    } else {
      // Fallback : utilise le segment local (structure de fichiers)
      childPath = local === "" ? "/" : local
    }
    
    // Normalisation selon le type de path
    if (group === 'public') {
      // Les routes publiques sont toujours absolues
      if (!childPath.startsWith("/")) {
        childPath = "/" + childPath
      }
    } else if (!isAbsolutePath) {
      // Routes relatives : retire le "/" de début (sauf pour "/")
      if (childPath !== "/" && childPath.startsWith("/")) {
        childPath = childPath.substring(1)
      }
    }
    // Si isAbsolutePath === true, on garde le path tel quel (avec le "/" au début)
    
    const overrideLabel = useOverride ? ' 🔧 override' : ''
    const absoluteLabel = isAbsolutePath ? ' (absolu)' : ''
    console.log(`📍 [${group}] ${base}.tsx → configKey="${configKey}" → path="${childPath}"${overrideLabel}${absoluteLabel}`)

    // Si le path est absolu, la route est attachée directement à rootRoute
    const parentRoute = isAbsolutePath ? 'rootRoute' : `${group}Route`
    
    routeDefs.push(`export const ${routeVar} = createRoute({
  getParentRoute: () => ${parentRoute},
  path: '${childPath}',
  component: ${compName},
})`)
  })

  const generatedSection = [
    "// === AUTO-GENERATED ROUTES START ===",
    "",
    ...imports,
    "",
    parentDef,
    "",
    ...routeDefs,
    "",
    "// === AUTO-GENERATED ROUTES END ===",
  ].join("\n")

  const indexPath = path.join(dir, "index.tsx")
  let existing = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : ""

  if (existing.includes("// === AUTO-GENERATED ROUTES START ===")) {
    existing = existing.replace(
      /\/\/ === AUTO-GENERATED ROUTES START ===[\s\S]*?\/\/ === AUTO-GENERATED ROUTES END ===/,
      generatedSection
    )
  } else {
    existing = generatedSection + "\n\n" + existing
  }

  fs.writeFileSync(indexPath, existing)
  console.log(`✅ Updated: routes/${group}/index.tsx`)
}

// ------------------------------------------------------------
// 🧠 GÉNÉRATION DU ROUTER GLOBAL
// ------------------------------------------------------------
function generateRouterFile() {
  const imports: string[] = [
    `import { createRouter } from '@tanstack/react-router'`,
    `import { rootRoute } from '@/routes/root'`,
  ]
  const treeChildren: string[] = []
  const absoluteRoutes: string[] = []

  for (const [group] of Object.entries(routeGroups)) {
    const dir = path.join(routesRoot, group)
    if (!fs.existsSync(dir)) continue

    const files = getAllFiles(dir)
    const relativeRoutes: string[] = []
    
    files.forEach((f) => {
      const base = path.basename(f, ".tsx")
      const routeVar = `${camelCase(base.replace("$", "Param"))}Route`
      const configKey = `${group}/${base}`
      
      // Vérifier si c'est une route absolue
      const configPath = routeConfig[configKey]?.path
      const isAbsolute = configPath?.startsWith("/") && group !== 'public'
      
      if (isAbsolute) {
        absoluteRoutes.push(routeVar)
      } else {
        relativeRoutes.push(routeVar)
      }
    })

    const allRouteVars = files.map((f) => {
      const name = path.basename(f, ".tsx")
      return `${camelCase(name.replace("$", "Param"))}Route`
    })

    imports.push(`import { ${group}Route, ${allRouteVars.join(", ")} } from '@/routes/${group}'`)
    
    if (relativeRoutes.length > 0) {
      treeChildren.push(`${group}Route.addChildren([${relativeRoutes.join(", ")}])`)
    } else {
      treeChildren.push(`${group}Route`)
    }
  }

  // Construire l'arbre de routes
  const allChildren = [...treeChildren, ...absoluteRoutes].filter(Boolean)

  const content = `${imports.join("\n")}

export const routeTree = rootRoute.addChildren([
  ${allChildren.join(",\n  ")}
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
`

  fs.writeFileSync(routerFile, content)
  console.log(`✅ Updated: router.ts`)
}

// ------------------------------------------------------------
// ✨ INITIALISATION DES NOUVELLES ROUTES
// ------------------------------------------------------------
function ensureComponentFile(filePath: string) {
  if (!fs.existsSync(filePath)) return
  const stat = fs.statSync(filePath)
  if (stat.isDirectory()) return

  const content = fs.readFileSync(filePath, "utf8").trim()
  if (content.length > 0) return

  const base = path.basename(filePath, ".tsx")
  const compName = pascalCase(base.replace("$", "Param"))

  const template = `export default function ${compName}() {
  return <div>${compName}</div>
}
`

  fs.writeFileSync(filePath, template)
  console.log(`✨ Initialized new route component: ${filePath}`)
}

// ------------------------------------------------------------
// 👀 WATCHER
// ------------------------------------------------------------
function rebuildAll() {
  loadRouteConfig() // 🔄 Recharger la config
  syncRouteConfig() // 🔄 Synchroniser route.config.ts d'abord
  loadRouteConfig() // 🔄 Recharger après sync
  for (const [group, basePath] of Object.entries(routeGroups)) {
    generateIndexFile(group, basePath)
  }
  generateRouterFile()
  console.log("🚀 Routes regenerated.\n")
}

console.log("👀 Watching routes...")
rebuildAll()

chokidar.watch(routesRoot, { ignoreInitial: true }).on("all", (event: string, filePath: string) => {
  // Ignorer les changements sur route.config.ts lui-même
  if (filePath.includes("route.config.ts")) return
  if (!filePath.endsWith(".tsx")) return

  if (event === "add") {
    ensureComponentFile(filePath)
    console.log(`➕ Added: ${filePath}`)
    rebuildAll()
  } else if (event === "unlink") {
    console.log(`➖ Removed: ${filePath}`)
    rebuildAll()
  }
})
