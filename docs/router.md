# 📚 Documentation : router.ts

## 📖 Vue d'ensemble

Le fichier `router.ts` est le **point d'entrée du routing** de l'application. Il est **auto-généré** par `watch-routes.ts` et contient l'arbre complet des routes TanStack Router.

## 🎯 Objectif

Créer une instance de router avec :
- Toutes les routes importées depuis les groupes (`public`, `auth`, `protected`)
- L'arbre de routes structuré (routes absolues + routes de groupe)
- La configuration TanStack Router pour l'application

## 📝 Structure du fichier

```typescript
// 1️⃣ Imports des routes de groupe
import { publicRoute, publicRoutes } from "./routes/public"
import { authRoute, authRoutes } from "./routes/auth"
import { protectedRoute, protectedRoutes } from "./routes/protected"

// 2️⃣ Route racine
const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

// 3️⃣ Séparation routes absolues / routes de groupe
const absoluteRoutes: RouteConfig[] = [
  // Routes avec path absolu (override: true)
]

const groupRoutes: RouteConfig[] = [
  // Routes attachées aux groupes
]

// 4️⃣ Construction de l'arbre
const routeTree = rootRoute.addChildren([
  ...groupRoutes,
  ...absoluteRoutes,
])

// 5️⃣ Export du router
export const router = createRouter({ routeTree })
```

## 🏗️ Composants principaux

### 1. rootRoute

La **route racine** de l'application.

```typescript
const rootRoute = createRootRoute({
  component: () => <Outlet />,
})
```

**Rôle** :
- Point d'entrée de l'arbre de routes
- Affiche les routes enfants via `<Outlet />`
- Toutes les routes sont attachées directement ou indirectement à `rootRoute`

### 2. Routes de groupe

Importées depuis `src/routes/{group}/index.tsx` :

```typescript
import { publicRoute, publicRoutes } from "./routes/public"
import { authRoute, authRoutes } from "./routes/auth"
import { protectedRoute, protectedRoutes } from "./routes/protected"
```

**Structure de chaque import** :
- `publicRoute` : Route parent du groupe (ex: `path: "/"`)
- `publicRoutes` : Liste des routes enfants (ex: `home`, `about`)

### 3. Séparation des routes

Le fichier sépare les routes en deux catégories :

#### Routes absolues

Routes avec `path` absolu (commençant par `/`) et `override: true` :

```typescript
const absoluteRoutes: RouteConfig[] = [
  authLoginRoute,   // path: "/login"
  protectedSettingsRoute, // path: "/mon-compte"
]
```

**Caractéristiques** :
- Attachées **directement** à `rootRoute`
- Ignorent le `basePath` du groupe
- Accessibles depuis la racine du site

#### Routes de groupe

Routes respectant la hiérarchie des groupes :

```typescript
const groupRoutes: RouteConfig[] = [
  publicRoute.addChildren([...publicRoutes]),
  authRoute.addChildren([...authRoutes]),
  protectedRoute.addChildren([...protectedRoutes]),
]
```

**Caractéristiques** :
- Attachées à leur **route parent de groupe**
- Héritent du `basePath` du groupe
- Structure hiérarchique préservée

### 4. Arbre de routes

L'arbre final combine les deux types :

```typescript
const routeTree = rootRoute.addChildren([
  ...groupRoutes,      // Routes hiérarchiques
  ...absoluteRoutes,   // Routes absolues
])
```

**Ordre** :
1. Routes de groupe (avec hiérarchie)
2. Routes absolues (plates)

### 5. Instance du router

Export de l'instance TanStack Router :

```typescript
export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
```

**Usage** :
```typescript
import { router } from "./router"

<RouterProvider router={router} />
```

## 🔄 Génération automatique

Le fichier est **régénéré** par `watch-routes.ts` dans ces cas :

| Événement | Action |
|-----------|--------|
| Nouveau fichier `.tsx` créé | Ajoute la route à `router.ts` |
| Fichier `.tsx` supprimé | Retire la route de `router.ts` |
| Modification de `route.config.ts` | Régénère l'arbre avec les nouveaux paths |
| Démarrage du watcher | Génération initiale complète |

## 📋 Exemple complet

### Configuration

**route.config.ts** :
```typescript
export const routeConfig = {
  "public/home": { path: "/", override: false },
  "auth/login": { path: "/login", override: true },
  "auth/register": { path: "register", override: false },
  "protected/dashboard": { path: "dashboard", override: false },
  "protected/settings": { path: "/mon-compte", override: true },
}
```

### Router généré

```typescript
import { publicRoute, publicRoutes } from "./routes/public"
import { authRoute, authRoutes } from "./routes/auth"
import { protectedRoute, protectedRoutes } from "./routes/protected"
import { createRootRoute, createRouter } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"
import type { RouteConfig } from "@tanstack/react-router"

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

// Routes absolues (override: true avec path absolu)
const absoluteRoutes: RouteConfig[] = [
  authLoginRoute,           // /login
  protectedSettingsRoute,   // /mon-compte
]

// Routes de groupe
const groupRoutes: RouteConfig[] = [
  publicRoute.addChildren([
    publicHomeRoute,        // /
  ]),
  authRoute.addChildren([
    authRegisterRoute,      // /auth/register
  ]),
  protectedRoute.addChildren([
    protectedDashboardRoute, // /app/dashboard
  ]),
]

const routeTree = rootRoute.addChildren([
  ...groupRoutes,
  ...absoluteRoutes,
])

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
```

### Arbre de routes résultant

```
rootRoute (/)
├─ publicRoute (/)
│  └─ publicHomeRoute (/)         → URL: /
├─ authRoute (/auth)
│  └─ authRegisterRoute (register) → URL: /auth/register
├─ protectedRoute (/app)
│  └─ protectedDashboardRoute (dashboard) → URL: /app/dashboard
├─ authLoginRoute (/login)        → URL: /login
└─ protectedSettingsRoute (/mon-compte) → URL: /mon-compte
```

## 🎨 Logique de séparation

### Condition pour route absolue

Une route est considérée comme **absolue** si :
1. `path` commence par `/`
2. `override === true` dans `route.config.ts`

```typescript
// Exemple de détection dans watch-routes.ts
const isAbsolutePath = childPath.startsWith("/") && override === true

const parentRoute = isAbsolutePath 
  ? 'rootRoute'           // → Route absolue
  : `${group}Route`       // → Route de groupe
```

### Génération du code

**Routes absolues** :
```typescript
// Attachées à rootRoute
export const authLoginRoute = createRoute({
  getParentRoute: () => rootRoute,  // ✅ Directement sous rootRoute
  path: "/login",
  component: AuthLogin,
})
```

**Routes de groupe** :
```typescript
// Attachées à groupRoute
export const authRegisterRoute = createRoute({
  getParentRoute: () => authRoute,  // ✅ Sous authRoute
  path: "register",                 // Path relatif
  component: AuthRegister,
})
```

## 🔗 Liens avec les autres fichiers

### Imports depuis `routes/{group}/index.tsx`

Chaque groupe exporte :

```typescript
// src/routes/public/index.tsx
export const publicRoute = createRoute({...})
export const publicRoutes = [homeRoute, aboutRoute]

// src/routes/auth/index.tsx
export const authRoute = createRoute({...})
export const authRoutes = [loginRoute, registerRoute]
```

### Utilisation dans `main.tsx`

```typescript
import { router } from "./router"
import { RouterProvider } from "@tanstack/react-router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
)
```

## ⚠️ Avertissements

### 🚨 Fichier auto-généré

**NE PAS MODIFIER MANUELLEMENT** ce fichier !

Toute modification sera **écrasée** lors de la prochaine génération.

**Alternatives** :
- Modifier `route.config.ts` pour changer les paths
- Modifier les fichiers de groupe dans `routes/{group}/index.tsx`
- Modifier le générateur dans `scripts/watch-routes.ts`

### 🚨 Ordre d'import

L'ordre des imports est important :

```typescript
// ✅ BON : Imports avant createRouter
import { publicRoute } from "./routes/public"
import { createRouter } from "@tanstack/react-router"

// ❌ MAUVAIS : createRouter avant imports
import { createRouter } from "@tanstack/react-router"
import { publicRoute } from "./routes/public"
```

### 🚨 Duplication de paths

Attention aux **routes en double** avec le même path absolu :

```typescript
// ❌ Conflit ! Deux routes avec path="/"
"public/home": { path: "/", override: true },
"public/index": { path: "/", override: true },
```

Le watcher affiche un **warning** en cas de duplication détectée.

## 🐛 Troubleshooting

### Problème : Route non trouvée

**Symptôme** : 404 sur une route qui existe dans les fichiers.

**Causes possibles** :
1. Le watcher n'a pas détecté le changement
2. Le fichier n'est pas dans `routes/{group}/`
3. Le fichier ne s'appelle pas `*.tsx`

**Solution** :
- Redémarrer le serveur (`npm run dev`)
- Vérifier les logs du watcher
- Vérifier la structure des dossiers

### Problème : Route inaccessible

**Symptôme** : La route existe mais affiche une erreur.

**Causes possibles** :
1. Import manquant dans `router.ts`
2. Composant non exporté
3. Erreur dans le composant

**Solution** :
- Vérifier que le composant est bien exporté :
  ```typescript
  export function MyComponent() { ... }
  ```
- Vérifier les logs de la console navigateur

### Problème : Arbre de routes incorrect

**Symptôme** : La hiérarchie des routes ne correspond pas à la config.

**Causes possibles** :
1. `route.config.ts` non pris en compte (besoin de redémarrer)
2. Erreur dans la logique de génération

**Solution** :
- Redémarrer le serveur après modification de `route.config.ts`
- Vérifier les logs du watcher pour voir la détection des routes absolues

## 📊 Récapitulatif

| Type de route | Parent | Path | Exemple |
|---------------|--------|------|---------|
| Absolue | `rootRoute` | Absolu (`/...`) | `/login`, `/mon-compte` |
| Groupe | `{group}Route` | Relatif | `dashboard` → `/app/dashboard` |
| Index | `rootRoute` ou `{group}Route` | `/` | `/` ou `/app` |

## 🔗 Fichiers liés

- [`watch-routes.md`](./watch-routes.md) : Documentation du générateur
- [`route.config.md`](./route.config.md) : Configuration des paths
- [TanStack Router Documentation](https://tanstack.com/router/latest) : Documentation officielle

## 💡 Bonnes pratiques

1. ✅ **Ne jamais éditer router.ts** : C'est un fichier généré
2. ✅ **Comprendre la séparation absolues/groupe** : Important pour la structure
3. ✅ **Vérifier les logs** : Le watcher indique les routes absolues détectées
4. ✅ **Redémarrer après config** : Les changements de config nécessitent un restart
5. ✅ **Utiliser TypeScript** : Le router est typé, profitez-en !

## 🚀 Aller plus loin

### Route loaders

TanStack Router supporte les loaders pour charger des données :

```typescript
export const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "dashboard",
  component: Dashboard,
  loader: async () => {
    // Charger les données
    return { data: await fetchDashboard() }
  },
})
```

### Route guards

Protéger les routes avec `beforeLoad` :

```typescript
export const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login", search: { redirect: location.href } })
    }
  },
})
```

### Nested layouts

Créer des layouts imbriqués :

```typescript
// Layout pour /app
export const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: () => (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  ),
})
```

### Paramètres de route

Définir des routes dynamiques :

```typescript
export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/$userId",
  component: UserProfile,
})
```

## 📚 Ressources

- [TanStack Router Guide](https://tanstack.com/router/latest/docs/framework/react/guide/routes)
- [Route Trees](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees)
- [File-Based vs Code-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
