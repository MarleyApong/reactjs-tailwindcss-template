# 🗺️ Guide du Système de Routing

## Vue d'ensemble

Ce système combine les avantages du **code-based routing** (TanStack Router) avec la flexibilité de personnaliser les chemins sans modifier la structure de fichiers.

## 📂 Structure

```
src/routes/
├── route.config.ts    ← Configuration centralisée des chemins
├── root.tsx           ← Route racine
├── public/            ← Routes publiques (basePath: "/")
│   ├── index.tsx      ← Généré automatiquement
│   └── home.tsx       ← Ta page
├── auth/              ← Routes d'auth (basePath: "/auth")
│   ├── index.tsx      ← Généré automatiquement
│   ├── login.tsx
│   ├── register.tsx
│   └── hello.tsx
└── protected/         ← Routes protégées (basePath: "/app")
    ├── index.tsx      ← Généré automatiquement
    ├── dashboard.tsx
    ├── me.tsx
    ├── profile.tsx
    └── settings.tsx
```

## 🔧 Comment ça fonctionne

### 1. Créer une nouvelle route

**Crée simplement un fichier `.tsx` dans le bon dossier :**

```bash
# Route publique
touch src/routes/public/about.tsx

# Route protégée
touch src/routes/protected/projects.tsx

# Route d'auth
touch src/routes/auth/forgot-password.tsx
```

Le watcher va :
1. Détecter le nouveau fichier
2. Le remplir avec un composant de base
3. Régénérer automatiquement les routes

### 2. Personnaliser le chemin

**Édite `route.config.ts` :**

```typescript
export const routeConfig: Record<string, { path?: string }> = {
  // Utilise le nom du fichier (sans .tsx)
  "public/about": { path: "/a-propos" },
  "protected/projects": { path: "/mes-projets" },
  "auth/forgot-password": { path: "/mot-de-passe-oublie" },
}
```

### 3. Résultat

| Fichier | ConfigKey | Path configuré | URL finale |
|---------|-----------|----------------|------------|
| `public/home.tsx` | `public/home` | `/` | `/` |
| `public/about.tsx` | `public/about` | `/a-propos` | `/a-propos` |
| `auth/login.tsx` | `auth/login` | `/login` | `/auth/login` |
| `protected/dashboard.tsx` | `protected/dashboard` | `/dashboard` | `/app/dashboard` |
| `protected/projects.tsx` | `protected/projects` | `/mes-projets` | `/app/mes-projets` |

## 🎯 Règles importantes

### ConfigKey = `${group}/${fileName}`
- ✅ `"public/home"` → fichier `public/home.tsx`
- ✅ `"auth/login"` → fichier `auth/login.tsx`
- ❌ `"public/index"` → n'existe plus !

### Les paths sont relatifs au basePath du groupe
- `public/` → basePath = `/`
- `auth/` → basePath = `/auth`
- `protected/` → basePath = `/app`

### Exemples de paths

```typescript
// Path simple
"public/home": { path: "/" }           // → URL: /
"public/about": { path: "/about" }     // → URL: /about

// Path avec basePath
"auth/login": { path: "/login" }       // → URL: /auth/login
"protected/dashboard": { path: "/" }   // → URL: /app/

// Path complexe
"protected/settings": { path: "/mon-compte/parametres" }  
// → URL: /app/mon-compte/parametres
```

## 🚀 Commandes

```bash
# Lancer le watcher (mode dev)
npm run watch:routes

# Si tu veux voir les logs détaillés
npm run watch:routes | grep "📍"
```

## 💡 Avantages

✅ **Pas de rechargement complet** : Contrairement au file-based de Vite  
✅ **Chemins personnalisables** : Change l'URL sans bouger les fichiers  
✅ **Auto-génération** : Les routes sont créées automatiquement  
✅ **Type-safe** : TanStack Router génère les types  
✅ **Centralisé** : Toute la config dans `route.config.ts`

## 🐛 Debug

Le watcher affiche des logs pour chaque route générée :

```
📍 [public] home.tsx → configKey="public/home" → path="/"
📍 [auth] login.tsx → configKey="auth/login" → path="/login"
📍 [protected] dashboard.tsx → configKey="protected/dashboard" → path="/dashboard"
```

Si un chemin ne correspond pas, vérifie :
1. Le nom du fichier (sans `.tsx`)
2. La clé dans `route.config.ts`
3. Les logs du watcher

## 📝 Exemple complet

### Ajouter une page "À propos"

**1. Crée le fichier :**
```bash
echo 'export default function About() { return <div>About</div> }' > src/routes/public/about.tsx
```

**2. Configure le path (optionnel) :**
```typescript
// route.config.ts
"public/about": { path: "/a-propos" }
```

**3. C'est tout !**
- URL accessible : `/a-propos`
- Le watcher régénère tout automatiquement
- Pas de rechargement de page en dev

---

## 🎨 Améliorations possibles

- [ ] Support des routes dynamiques (`$id.tsx`)
- [ ] Support des layouts imbriqués
- [ ] Support des route loaders
- [ ] Validation du schema de `route.config.ts`
- [ ] Hot reload plus granulaire
