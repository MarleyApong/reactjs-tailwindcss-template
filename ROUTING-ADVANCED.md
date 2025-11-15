# 🎓 Cas d'Usage Avancés - Système de Routing

## 1. Routes avec paramètres dynamiques

### Créer une route avec ID

```bash
# Crée le fichier (le $ indique un paramètre)
touch src/routes/public/$postId.tsx
```

```typescript
// public/$postId.tsx
import { useParams } from '@tanstack/react-router'

export default function PostDetail() {
  const { postId } = useParams({ from: '/public/$postId' })
  
  return <div>Post #{postId}</div>
}
```

```typescript
// route.config.ts
"public/$postId": { path: "posts/$postId" } // → /posts/123
```

## 2. Routes imbriquées / Nested

### Structure de dossiers

```
protected/
├── projects/
│   ├── index.tsx      ← /app/projects
│   ├── new.tsx        ← /app/projects/new
│   └── $id.tsx        ← /app/projects/123
```

⚠️ **Limitation actuelle** : Le système ne supporte pas encore les dossiers imbriqués.

**Workaround** : Utilise des underscores

```
protected/
├── projects.tsx         ← /app/projects
├── projects_new.tsx     ← /app/projects/new
└── projects_$id.tsx     ← /app/projects/123
```

```typescript
// route.config.ts
"protected/projects": { path: "projects" },
"protected/projects_new": { path: "projects/new" },
"protected/projects_$id": { path: "projects/$id" },
```

## 3. Layouts partagés

### Pattern actuel

Crée un composant Layout réutilisable :

```typescript
// components/DashboardLayout.tsx
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

```typescript
// protected/dashboard.tsx
import { DashboardLayout } from '@/components/DashboardLayout'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
    </DashboardLayout>
  )
}
```

## 4. Redirections

### Redirect dans le composant

```typescript
// auth/index.tsx
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export default function AuthIndex() {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate({ to: '/auth/login' })
  }, [])
  
  return null
}
```

### Redirect via route config

```typescript
// À implémenter dans le watcher si besoin
export const routeConfig = {
  "auth/index": { 
    path: "/",
    redirect: "/auth/login" // ← À supporter
  }
}
```

## 5. Routes protégées avec guards

### Pattern recommandé

```typescript
// routes/protected/index.tsx
import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />
  }
  
  return <Outlet />
}
```

Toutes les routes dans `protected/` passeront par ce guard.

## 6. Routes avec query params

```typescript
// public/search.tsx
import { useSearch } from '@tanstack/react-router'

export default function Search() {
  const { q, category } = useSearch({ from: '/search' })
  
  return (
    <div>
      Recherche: {q} dans {category}
    </div>
  )
}

// Usage: /search?q=react&category=tutorials
```

## 7. Préchargement de données (Loaders)

```typescript
// protected/dashboard.tsx
import { useLoaderData } from '@tanstack/react-router'

// Loader (à définir dans index.tsx)
export const dashboardLoader = async () => {
  const data = await fetch('/api/dashboard')
  return data.json()
}

export default function Dashboard() {
  const data = useLoaderData({ from: '/app/dashboard' })
  
  return <div>{JSON.stringify(data)}</div>
}
```

**Note** : Nécessite de modifier le watcher pour supporter les loaders.

## 8. Routes avec permissions

```typescript
// route.config.ts avec métadonnées
export const routeConfig = {
  "protected/admin": { 
    path: "admin",
    meta: { requiredRole: 'admin' } // ← Custom meta
  }
}
```

```typescript
// protected/admin.tsx
export const adminMeta = { requiredRole: 'admin' }

export default function Admin() {
  // Vérification dans le layout parent
  return <div>Admin Panel</div>
}
```

## 9. Routes multilingues

```typescript
// route.config.ts
"public/home": { path: "/" }, // Français par défaut

// Pour l'anglais, crée une route dédiée
"public/home-en": { path: "en" },
```

**Ou utilise un paramètre** :

```typescript
"public/$lang": { path: "$lang" } // → /fr, /en, /es

// $lang.tsx
export default function LangRedirect() {
  const { lang } = useParams()
  // Gère la langue et redirige
}
```

## 10. Routes conditionnelles (Feature flags)

```typescript
// route.config.ts
export const routeConfig = {
  "public/beta-feature": { 
    path: "beta",
    enabled: process.env.VITE_BETA_ENABLED === 'true'
  }
}
```

**Modification nécessaire dans le watcher** :

```typescript
if (routeConfig[configKey]?.enabled === false) {
  return // Skip cette route
}
```

## 11. Génération de sitemap

Utilise `route.config.ts` comme source :

```typescript
// scripts/generate-sitemap.ts
import { routeConfig } from '@/routes/route.config'

const sitemap = Object.entries(routeConfig)
  .map(([key, config]) => {
    const [group] = key.split('/')
    const basePath = routeGroups[group]
    const fullPath = `${basePath}/${config.path}`.replace('//', '/')
    return `https://monsite.com${fullPath}`
  })

console.log(sitemap)
```

## 12. Analytics et tracking

```typescript
// scripts/watch-routes.ts
// Après génération
function generateRouterFile() {
  // ... code existant
  
  // Ajoute tracking
  const content = `
    ${imports.join('\n')}
    
    export const router = createRouter({ 
      routeTree,
      onRouteChange: (location) => {
        // Analytics
        if (typeof window !== 'undefined') {
          window.gtag?.('event', 'page_view', {
            page_path: location.pathname
          })
        }
      }
    })
  `
}
```

## 📚 Ressources

- [TanStack Router Docs](https://tanstack.com/router)
- [Guide complet](./ROUTING-GUIDE.md)
- [Résumé du fix](./ROUTING-FIX-SUMMARY.md)

---

**Maintenu par** : Ton équipe  
**Dernière mise à jour** : 10 novembre 2025
