# 📚 Documentation : router.ts

## 📖 Vue d'ensemble

Le fichier `src/router.ts` est le **point d'entrée du routing** de l'application. Il est **auto-généré** par `watch-routes.ts` et contient l'arbre complet des routes TanStack Router.

## 🎯 Objectif

Créer l'arbre de routes avec :
- Toutes les routes importées depuis les groupes (`public`, `auth`, `protected`)
- La structure hiérarchique des routes
- L'export du `routeTree` utilisé par `App.tsx`

## 📝 Structure du fichier

```typescript
// 1️⃣ Imports des routes depuis les fichiers _root.tsx
import { publicRoute, publicHomeRoute, publicDocsRoute } from '@/routes/public/_root'
import { authRoute, authLoginRoute } from '@/routes/auth/_root'
import { protectedRoute, protectedDashboardRoute } from '@/routes/protected/_root'

// 2️⃣ Construction de l'arbre
export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([publicHomeRoute, publicDocsRoute]),
  authRoute.addChildren([authLoginRoute]),
  protectedRoute.addChildren([protectedDashboardRoute]),
])

// 3️⃣ Export du router
export const router = createRouter({ routeTree })
```

## 🏗️ Composants principaux

### 1. rootRoute

La **route racine** de l'application (définie dans `src/routes/root.tsx`).

```typescript
import { rootRoute } from '@/routes/root'
```

**Rôle** :
- Point d'entrée de l'arbre de routes
- Affiche les routes enfants via `<Outlet />`
- Toutes les routes sont attachées directement ou indirectement à `rootRoute`

### 2. Routes de groupe

Importées depuis `src/routes/{group}/_root.tsx` (fichiers générés automatiquement) :

```typescript
import { publicRoute, publicHomeRoute, publicDocsRoute } from '@/routes/public/_root'
import { authRoute, authLoginRoute, authRegisterRoute } from '@/routes/auth/_root'
import { protectedRoute, protectedDashboardRoute, protectedSettingsRoute } from '@/routes/protected/_root'
```

**Nommage des variables** :
- Route groupe : `{group}Route` (ex: `publicRoute`, `authRoute`)
- Routes enfants : `{group}{File}Route` (ex: `publicHomeRoute`, `authLoginRoute`)

> **Note** : Les fichiers `_root.tsx` sont **générés automatiquement** par `watch-routes.ts`. Ne pas les modifier manuellement.

### 3. Arbre de routes

Toutes les routes sont enfants de leur groupe :

```typescript
export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([publicHomeRoute, publicDocsRoute]),
  authRoute.addChildren([authLoginRoute, authRegisterRoute]),
  protectedRoute.addChildren([protectedDashboardRoute, protectedSettingsRoute]),
])
```

### 4. Instance du router

Export de l'instance TanStack Router :

```typescript
export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

**Usage dans `App.tsx`** :
```typescript
import { routeTree } from "@/router"

const router = createRouter({ routeTree })
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
  "public/home": { path: "/", override: true },
  "public/docs": { path: "docs", override: false },
  "auth/login": { path: "login", override: false },
  "auth/register": { path: "register", override: false },
  "protected/dashboard": { path: "dashboard", override: false },
  "protected/settings": { path: "settings", override: false },
}
```

### Router généré

```typescript
import { createRouter } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root'
import { publicRoute, publicDocsRoute, publicHomeRoute } from '@/routes/public/_root'
import { authRoute, authLoginRoute, authRegisterRoute } from '@/routes/auth/_root'
import { protectedRoute, protectedDashboardRoute, protectedSettingsRoute } from '@/routes/protected/_root'

export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([publicDocsRoute, publicHomeRoute]),
  authRoute.addChildren([authLoginRoute, authRegisterRoute]),
  protectedRoute.addChildren([protectedDashboardRoute, protectedSettingsRoute]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

### Arbre de routes résultant

```
rootRoute (/)
├─ publicRoute (_public)
│  ├─ publicHomeRoute (/)           → URL: /
│  └─ publicDocsRoute (/docs)       → URL: /docs
├─ authRoute (/auth)
│  ├─ authLoginRoute (/login)       → URL: /auth/login
│  └─ authRegisterRoute (/register) → URL: /auth/register
└─ protectedRoute (/app)
   ├─ protectedDashboardRoute (/dashboard) → URL: /app/dashboard
   └─ protectedSettingsRoute (/settings)   → URL: /app/settings
```

## ⚠️ Avertissements

### 🚨 Fichier auto-généré

**NE PAS MODIFIER MANUELLEMENT** ce fichier !

Toute modification sera **écrasée** lors de la prochaine génération.

**Alternatives** :
- Modifier `route.config.ts` pour changer les paths
- Modifier les pages dans `routes/{group}/`
- Modifier le générateur dans `scripts/watch-routes.ts`

### 🚨 Duplication de paths

Attention aux **routes en double** avec le même path absolu :

```typescript
// ❌ Conflit ! Deux routes avec path="/"
"public/home": { path: "/", override: true },
"public/index": { path: "/", override: true },
```

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

### Problème : Arbre de routes incorrect

**Solution** :
- Redémarrer le serveur après modification de `route.config.ts`
- Vérifier les logs du watcher

## 🔗 Fichiers liés

- [`watch-routes.md`](./watch-routes.md) : Documentation du générateur
- [`route.config.md`](./route.config.md) : Configuration des paths
- [TanStack Router Documentation](https://tanstack.com/router/latest) : Documentation officielle

## 💡 Bonnes pratiques

1. ✅ **Ne jamais éditer router.ts** : C'est un fichier généré
2. ✅ **Redémarrer après config** : Les changements de config nécessitent un restart
3. ✅ **Utiliser TypeScript** : Le router est typé, profitez-en !

## 🚀 Aller plus loin

### Route loaders

TanStack Router supporte les loaders pour charger des données :

```typescript
export const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: 'dashboard',
  component: Dashboard,
  loader: async () => {
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
      throw redirect({ to: "/auth/login", search: { redirect: location.href } })
    }
  },
})
```

### Layout wrappers

Créer des layouts via `_layout.tsx` :

```typescript
// src/routes/protected/_layout.tsx
export default function ProtectedLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}
```

### Dynamic route parameters

```typescript
// src/routes/protected/$userId.tsx → URL: /app/:userId
export default function UserPage() {
  const { userId } = useParams({ strict: false })
  return <div>User: {userId}</div>
}
```

## 📚 Ressources

- [TanStack Router Guide](https://tanstack.com/router/latest/docs/framework/react/guide/routes)
- [Route Trees](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees)
- [File-Based vs Code-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
