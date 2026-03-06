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

// Configuration des routes
let routeConfig: Record<string, { path?: string; override?: boolean }> = {}
const routeConfigFile = path.resolve("src/routes/route.config.ts")

// ------------------------------------------------------------
// 📌 UTILITAIRES
// ------------------------------------------------------------

function writeFileWithRetry(filePath: string, content: string, maxRetries = 3, delayMs = 100) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      fs.writeFileSync(filePath, content)
      return true
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as any).code === "EBUSY" &&
        i < maxRetries - 1
      ) {
        const delay = delayMs * (i + 1)
        console.log(`⏳ File locked, retrying in ${delay}ms... (${i + 1}/${maxRetries})`)
        const start = Date.now()
        while (Date.now() - start < delay) {}
        continue
      }
      throw err
    }
  }
  return false
}

function pascalCase(str: string): string {
  return str
    ?.split(/[-_.\s]+/)
    ?.filter(Boolean)
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join("")
}

function camelCase(str: string): string {
  const pascal = pascalCase(str)
  if (!pascal) return ""
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
    } else if (file.endsWith(".tsx") && !file.startsWith("_")) {
      results.push(filePath)
    }
  })
  return results
}

function hasLayoutInDir(dir: string): boolean {
  return fs.existsSync(path.join(dir, "_layout.tsx"))
}

/**
 * Generates a unique route variable name including the full path
 */
function getRouteVarName(filePath: string, groupFolder: string): string {
  const base = path.basename(filePath, ".tsx")
  const dir = path.dirname(filePath)
  const groupDir = path.join(routesRoot, groupFolder)
  const relativePath = path.relative(groupDir, dir).replace(/\\/g, "/")

  const parts: string[] = [groupFolder]

  if (relativePath !== ".") {
    const segments = relativePath.split("/").filter(Boolean)
    parts.push(...segments)
  }

  if (base === "index") {
    parts.push("Index")
  } else {
    parts.push(base)
  }

  return camelCase(parts.join("-")) + "Route"
}

/**
 * Generates a unique component name including the full path.
 * For dynamic routes ($param), includes the full path to avoid duplicate names.
 */
function getComponentName(filePath: string, groupFolder: string): string {
  const base = path.basename(filePath, ".tsx")
  const dir = path.dirname(filePath)
  const groupDir = path.join(routesRoot, groupFolder)
  const relativePath = path.relative(groupDir, dir).replace(/\\/g, "/")

  // Helper to convert segment to PascalCase (handles $param by removing $ and converting)
  const processSegment = (seg: string): string => {
    if (seg.startsWith("$")) {
      return pascalCase(seg.slice(1)) // Remove $ and convert
    }
    return pascalCase(seg)
  }

  if (base === "index" && relativePath === ".") {
    return pascalCase(groupFolder) + "Index"
  }

  if (base === "index") {
    const segments = relativePath.split("/").filter(Boolean)
    return segments.map(processSegment).join("") + "Index"
  }

  // Handle dynamic routes ($param) - include full path for uniqueness
  if (base.startsWith("$")) {
    const paramName = base.slice(1) // Remove $
    if (relativePath === ".") {
      return pascalCase(paramName) + "Page"
    }
    const segments = relativePath.split("/").filter(Boolean)
    return segments.map(processSegment).join("") + pascalCase(paramName) + "Page"
  }

  return pascalCase(base)
}

/**
 * Generates the route path (file-based routing).
 * index.tsx takes the path of its parent directory.
 */
function makeRoutePath(filePath: string, groupFolder: string): string {
  const base = path.basename(filePath, ".tsx")
  const dir = path.dirname(filePath)
  const groupDir = path.join(routesRoot, groupFolder)
  const relativePath = path.relative(groupDir, dir).replace(/\\/g, "/")

  // Helper to preserve dynamic params (starting with $)
  const processSegment = (segment: string): string => {
    // Keep dynamic params as-is (preserve case)
    if (segment.startsWith("$")) {
      return segment
    }
    return segment.toLowerCase()
  }

  // index.tsx at group root → "/"
  if (base === "index" && relativePath === ".") {
    return "/"
  }

  // index.tsx in a subdirectory → subdirectory path
  if (base === "index") {
    const segments = relativePath.split("/").filter(Boolean)
    const path = segments.map(processSegment).join("/")
    return path ? `/${path}` : "/"
  }

  // Regular file at group root → file name
  if (relativePath === ".") {
    return `/${processSegment(base)}`
  }

  // Regular file in subdirectory → full path
  const segments = relativePath.split("/").filter(Boolean)
  return `/${segments.map(processSegment).join("/")}/${processSegment(base)}`
}

interface RouteInfo {
  filePath: string
  componentName: string
  routeVarName: string
  localPath: string
  configKey: string
  finalPath: string
  isAbsolute: boolean
  parentDir: string
  hasLayoutInParent: boolean
}

interface LayoutInfo {
  dirPath: string
  componentName: string
  importPath: string
  relativePath: string
}

/**
 * Analyzes the structure to collect routes and layouts
 */
function analyzeStructure(groupFolder: string): {
  routes: RouteInfo[]
  layouts: Map<string, LayoutInfo>
} {
  const routes: RouteInfo[] = []
  const layouts = new Map<string, LayoutInfo>()

  const groupDir = path.join(routesRoot, groupFolder)
  if (!fs.existsSync(groupDir)) return { routes, layouts }

  // STEP 1: Collect all layouts
  function collectLayouts(currentDir: string) {
    if (!fs.existsSync(currentDir)) return

    const relativePath = path.relative(groupDir, currentDir).replace(/\\/g, "/")
    const normalizedPath = relativePath === "." ? "" : relativePath

    if (hasLayoutInDir(currentDir)) {
      const segments = normalizedPath.split("/").filter(Boolean)
      const componentName =
        segments.length > 0
          ? segments.map((seg) => pascalCase(seg)).join("") + "Layout"
          : pascalCase(groupFolder) + "Layout"

      const importPath = "./" + (normalizedPath === "" ? "" : normalizedPath + "/") + "_layout"

      layouts.set(normalizedPath, {
        dirPath: currentDir,
        componentName,
        importPath,
        relativePath: normalizedPath,
      })
    }

    const items = fs.readdirSync(currentDir)
    for (const item of items) {
      const itemPath = path.join(currentDir, item)
      const stat = fs.statSync(itemPath)
      if (stat.isDirectory()) {
        collectLayouts(itemPath)
      }
    }
  }

  // STEP 2: Collect all routes
  function collectRoutes(currentDir: string) {
    if (!fs.existsSync(currentDir)) return

    const items = fs.readdirSync(currentDir)

    for (const item of items) {
      const itemPath = path.join(currentDir, item)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        collectRoutes(itemPath)
      } else if (item.endsWith(".tsx") && !item.startsWith("_")) {
        const componentName = getComponentName(itemPath, groupFolder)
        const routeVarName = getRouteVarName(itemPath, groupFolder)
        const localPath = makeRoutePath(itemPath, groupFolder)

        const relativePath = path
          .relative(groupDir, itemPath)
          .replace(/\\/g, "/")
          .replace(".tsx", "")
        const parentDir = path.dirname(relativePath)
        const normalizedParentDir = parentDir === "." ? "" : parentDir

        const configKey = `${groupFolder}/${relativePath}`
        const config = routeConfig[configKey]

        let finalPath = localPath
        let isAbsolute = false

        if (config?.override && config?.path !== undefined) {
          finalPath = config.path
          isAbsolute = finalPath.startsWith("/")
        }

        // Normalization for the public group
        if (groupFolder === "public" && !isAbsolute) {
          if (finalPath !== "/" && !finalPath.startsWith("/")) {
            finalPath = "/" + finalPath
          }
          isAbsolute = true
        }

        // Check if the parent directory has a layout
        const hasLayoutInParent = layouts.has(normalizedParentDir)

        routes.push({
          filePath: itemPath,
          componentName,
          routeVarName,
          localPath,
          configKey,
          finalPath,
          isAbsolute,
          parentDir: normalizedParentDir,
          hasLayoutInParent,
        })
      }
    }
  }

  collectLayouts(groupDir)
  collectRoutes(groupDir)

  return { routes, layouts }
}

// ------------------------------------------------------------
// 🔄 ROUTE CONFIG SYNCHRONIZATION
// ------------------------------------------------------------
function loadRouteConfig() {
  try {
    if (fs.existsSync(routeConfigFile)) {
      const content = fs.readFileSync(routeConfigFile, "utf8")

      if (content.length < 100) {
        console.warn("⚠️  route.config.ts seems corrupted, will regenerate")
        routeConfig = {}
        return
      }

      const lines = content.split("\n")
      const config: Record<string, { path?: string; override?: boolean }> = {}

      for (const line of lines) {
        const match = line.match(
          /^\s*"([^"]+)":\s*\{\s*path:\s*"([^"]*)"\s*,\s*override:\s*(true|false)\s*\}/,
        )
        if (match) {
          const [, key, pathValue, override] = match
          config[key] = {
            path: pathValue,
            override: override === "true",
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
      routeConfig = {}
    }
  } catch (err) {
    console.warn(
      "⚠️  Error loading route.config.ts:",
      err instanceof Error ? err.message : "unknown error",
    )
    routeConfig = {}
  }
}

function syncRouteConfig() {
  const existingRoutes = new Set<string>()
  const routesByGroup: Record<string, string[]> = Object.keys(routeGroups).reduce(
    (acc, group) => {
      acc[group] = []
      return acc
    },
    {} as Record<string, string[]>,
  )

  for (const [group] of Object.entries(routeGroups)) {
    const dir = path.join(routesRoot, group)
    const files = getAllFiles(dir)

    files.forEach((file) => {
      const rel = path.relative(dir, file).replace(/\\/g, "/")
      const relativeConfigPath = rel.replace(".tsx", "")
      const configKey = `${group}/${relativeConfigPath}`
      existingRoutes.add(configKey)
      routesByGroup[group].push(configKey)
    })
  }

  if (!fs.existsSync(routeConfigFile)) {
    const header = `/**
 * Route configuration — auto-generated with preservation of manual changes
 *
 * 🎯 PATH RULES:
 * 1. RELATIVE path (no leading "/") : appended to the group basePath
 * 2. ABSOLUTE path (with leading "/") : ignores the group basePath
 * 3. override: true required to activate custom paths
 *
 * 💡 Restart required after editing (Ctrl+C then npm run dev)
 */
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
`

    let content = header

    for (const [group, routeKeys] of Object.entries(routesByGroup)) {
      if (routeKeys.length > 0) {
        content += `  // ${group} routes (basePath: "${routeGroups[group]}")\n`

        for (const configKey of routeKeys) {
          const filePath = path.join(routesRoot, configKey + ".tsx")
          const localPath = makeRoutePath(filePath, group.split("/")[0])
          content += `  "${configKey}": { path: "${localPath}", override: false },\n`
        }
        content += `\n`
      }
    }

    content += `}\n`

    fs.writeFileSync(routeConfigFile, content)
    console.log(`✨ Created: route.config.ts`)
    return
  }

  const currentContent = fs.readFileSync(routeConfigFile, "utf8")
  const lines = currentContent.split("\n")
  const newLines: string[] = []
  const configuredRoutes = new Set<string>()

  for (const line of lines) {
    const match = line.match(/^\s*"([^"]+)":\s*\{/)

    if (match) {
      const configKey = match[1]
      configuredRoutes.add(configKey)

      if (existingRoutes.has(configKey)) {
        newLines.push(line)
      }
    } else {
      newLines.push(line)
    }
  }

  const newRoutesToAdd = Array.from(existingRoutes).filter((k) => !configuredRoutes.has(k))

  if (newRoutesToAdd.length > 0) {
    let insertIndex = newLines.length - 1
    while (insertIndex > 0 && !newLines[insertIndex].trim().startsWith("}")) {
      insertIndex--
    }

    const newByGroup: Record<string, string[]> = Object.keys(routeGroups).reduce(
      (acc, group) => {
        acc[group] = []
        return acc
      },
      {} as Record<string, string[]>,
    )

    for (const configKey of newRoutesToAdd) {
      const [group] = configKey.split("/")
      const filePath = path.join(routesRoot, configKey + ".tsx")
      const localPath = makeRoutePath(filePath, group)
      newByGroup[group].push(
        `  "${configKey}": { path: "${localPath}", override: false }, // 🆕 Auto-added`,
      )
    }

    const toInsert: string[] = []
    for (const [group, routeLines] of Object.entries(newByGroup)) {
      if (routeLines.length > 0) {
        toInsert.push(``)
        toInsert.push(`  // 🆕 New ${group} routes`)
        toInsert.push(...routeLines)
      }
    }

    newLines.splice(insertIndex, 0, ...toInsert)

    fs.writeFileSync(routeConfigFile, newLines.join("\n"))
    console.log(`✅ Updated: route.config.ts (+${newRoutesToAdd.length} new routes)`)
  } else if (configuredRoutes.size > existingRoutes.size) {
    fs.writeFileSync(routeConfigFile, newLines.join("\n"))
    const deleted = configuredRoutes.size - existingRoutes.size
    console.log(`✅ Updated: route.config.ts (-${deleted} removed routes)`)
  }
}

// ------------------------------------------------------------
// 🧩 _root.tsx GENERATION
// ------------------------------------------------------------
function generateIndexFile(group: string, basePath: string) {
  const dir = path.join(routesRoot, group)
  if (!fs.existsSync(dir)) return

  const { routes, layouts } = analyzeStructure(group)

  const imports: string[] = [
    `import { createRoute } from '@tanstack/react-router'`,
    `import { rootRoute } from '@/routes/root'`,
  ]

  const defs: string[] = []
  const exportedItems: string[] = []

  // Import root layout if present
  const rootLayout = layouts.get("")
  if (rootLayout) {
    imports.push(`import ${rootLayout.componentName} from '${rootLayout.importPath}'`)
  }

  // Create the group parent route (with or without layout)
  const groupRouteVarName = camelCase(group) + "Route"

  if (group === "public") {
    if (rootLayout) {
      defs.push(`export const ${groupRouteVarName} = createRoute({
  getParentRoute: () => rootRoute,
  id: '_${group}',
  component: ${rootLayout.componentName},
})`)
    } else {
      defs.push(`export const ${groupRouteVarName} = createRoute({
  getParentRoute: () => rootRoute,
  id: '_${group}',
})`)
    }
  } else {
    if (rootLayout) {
      defs.push(`export const ${groupRouteVarName} = createRoute({
  getParentRoute: () => rootRoute,
  path: '${basePath}',
  component: ${rootLayout.componentName},
})`)
    } else {
      defs.push(`export const ${groupRouteVarName} = createRoute({
  getParentRoute: () => rootRoute,
  path: '${basePath}',
})`)
    }
  }

  exportedItems.push(groupRouteVarName)

  // Process all routes
  for (const route of routes) {
    const relativePath = path.relative(dir, route.filePath).replace(/\\/g, "/")
    const importPath = "./" + relativePath.replace(".tsx", "")
    imports.push(`import ${route.componentName} from '${importPath}'`)

    // Parent is ALWAYS the group route
    const parentRoute = groupRouteVarName

    // Compute final path
    let finalPath = route.finalPath

    // For index.tsx at group root, force path: '/'
    if (route.finalPath === "" || route.finalPath === "/") {
      finalPath = "/"
    }

    // Clean double slashes (avoids '//dashboard')
    finalPath = finalPath.replace(/\/+/g, "/")
    if (finalPath.length > 1 && finalPath.endsWith("/")) {
      finalPath = finalPath.slice(0, -1)
    }

    const overrideLabel = routeConfig[route.configKey]?.override ? " 🔧" : ""
    const absoluteLabel = route.isAbsolute ? " (absolute)" : ""
    console.log(
      `📍 [${group}] ${relativePath} → parent="${parentRoute}" → path="${finalPath}"${overrideLabel}${absoluteLabel}`,
    )

    defs.push(`export const ${route.routeVarName} = createRoute({
  getParentRoute: () => ${parentRoute},
  path: '${finalPath}',
  component: ${route.componentName},
})`)

    exportedItems.push(route.routeVarName)
  }

  const generatedSection = [
    "// === AUTO-GENERATED ROUTES START ===",
    "",
    ...imports,
    "",
    ...defs,
    "",
    "// === AUTO-GENERATED ROUTES END ===",
  ].join("\n")

  const rootPath = path.join(dir, "_root.tsx")
  let existing = fs.existsSync(rootPath) ? fs.readFileSync(rootPath, "utf8") : ""

  if (existing.includes("// === AUTO-GENERATED ROUTES START ===")) {
    existing = existing.replace(
      /\/\/ === AUTO-GENERATED ROUTES START ===[\s\S]*?\/\/ === AUTO-GENERATED ROUTES END ===/,
      generatedSection,
    )
  } else {
    existing = generatedSection + "\n\n" + existing
  }

  try {
    writeFileWithRetry(rootPath, existing)
    console.log(`✅ Updated: routes/${group}/_root.tsx`)
  } catch (err) {
    console.error(
      `❌ Failed to update routes/${group}/_root.tsx:`,
      err instanceof Error ? err.message : "unknown error",
    )
  }
}

// ------------------------------------------------------------
// 🧠 GLOBAL ROUTER GENERATION
// ------------------------------------------------------------
function generateRouterFile() {
  const imports: string[] = [
    `import { createRouter } from '@tanstack/react-router'`,
    `import { rootRoute } from '@/routes/root'`,
  ]

  const treeChildren: string[] = []

  for (const [group] of Object.entries(routeGroups)) {
    const dir = path.join(routesRoot, group)
    if (!fs.existsSync(dir)) continue

    const { routes } = analyzeStructure(group)

    const allExports: string[] = []

    // Add the group route
    const groupRouteVarName = `${camelCase(group)}Route`
    allExports.push(groupRouteVarName)

    // Add all child routes
    for (const route of routes) {
      allExports.push(route.routeVarName)
    }

    if (allExports.length > 0) {
      imports.push(`import { ${allExports.join(", ")} } from '@/routes/${group}/_root'`)

      // Build tree — all routes are children of the group route
      const routeNames = routes.map((r) => r.routeVarName)

      if (routeNames.length > 0) {
        treeChildren.push(`${groupRouteVarName}.addChildren([${routeNames.join(", ")}])`)
      } else {
        treeChildren.push(groupRouteVarName)
      }
    }
  }

  const content = `${imports.join("\n")}

export const routeTree = rootRoute.addChildren([
  ${treeChildren.join(",\n  ")}
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
`

  try {
    writeFileWithRetry(routerFile, content)
    console.log(`✅ Updated: router.ts`)
  } catch (err) {
    console.error(
      `❌ Failed to update router.ts:`,
      err instanceof Error ? err.message : "unknown error",
    )
  }
}

// ------------------------------------------------------------
// ✨ NEW ROUTE INITIALIZATION
// ------------------------------------------------------------
function ensureComponentFile(filePath: string) {
  if (!fs.existsSync(filePath)) return
  const stat = fs.statSync(filePath)
  if (stat.isDirectory()) return

  const content = fs.readFileSync(filePath, "utf8").trim()
  if (content.length > 0) return

  let group = ""
  for (const g of Object.keys(routeGroups)) {
    if (filePath.includes(path.join(routesRoot, g))) {
      group = g
      break
    }
  }

  if (!group) return

  const compName = getComponentName(filePath, group)

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
  loadRouteConfig()
  syncRouteConfig()
  loadRouteConfig()
  for (const [group, basePath] of Object.entries(routeGroups)) {
    generateIndexFile(group, basePath)
  }
  generateRouterFile()
  console.log("🚀 Routes regenerated.\n")
}

console.log("👀 Watching routes...")
rebuildAll()

chokidar.watch(routesRoot, { ignoreInitial: true }).on("all", (event: string, filePath: string) => {
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

chokidar.watch(routeConfigFile, { ignoreInitial: true }).on("change", () => {
  console.log("🔄 route.config.ts changed, regenerating routes...")
  rebuildAll()
})
