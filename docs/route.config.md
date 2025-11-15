# 📚 Documentation : route.config.ts

## 📖 Vue d'ensemble

Le fichier `route.config.ts` est la **configuration centralisée** du système de routing. Il permet de **redéfinir les chemins d'URL** des routes sans modifier la structure de fichiers.

## 🎯 Objectif

Découpler la **structure de fichiers** de la **structure d'URL** :
- Le fichier `auth/login.tsx` peut être accessible via `/login` (au lieu de `/auth/login`)
- Le fichier `protected/settings.tsx` peut être accessible via `/mon-compte` (au lieu de `/app/settings`)

## 📝 Structure du fichier

```typescript
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
  // Clé : "groupe/nomDuFichier" (sans .tsx)
  "auth/login": { 
    path: "/login",      // Chemin d'URL personnalisé
    override: true       // Active la redéfinition
  },
}
```

## 🔑 Format des clés

La clé suit le format : `"${group}/${fileName}"`

| Partie | Description | Exemple |
|--------|-------------|---------|
| `group` | Nom du dossier dans `routes/` | `public`, `auth`, `protected` |
| `fileName` | Nom du fichier sans `.tsx` | `login`, `dashboard`, `home` |

**Exemples** :
- `"public/home"` → fichier `src/routes/public/home.tsx`
- `"auth/login"` → fichier `src/routes/auth/login.tsx`
- `"protected/dashboard"` → fichier `src/routes/protected/dashboard.tsx`

## 🎨 Propriétés

### `path` (optionnel)

Définit le chemin d'URL de la route.

**Types de paths** :

#### 1. Path RELATIF (sans `/` au début)

Ajouté au `basePath` du groupe :

```typescript
"auth/login": { path: "login", override: false }
// → URL finale : /auth/login
//   (basePath du groupe "auth" est "/auth")

"protected/dashboard": { path: "dashboard", override: false }
// → URL finale : /app/dashboard
//   (basePath du groupe "protected" est "/app")
```

#### 2. Path ABSOLU (avec `/` au début)

**Ignore** le `basePath` du groupe :

```typescript
"auth/login": { path: "/login", override: true }
// → URL finale : /login
//   (ignore le basePath "/auth")

"protected/settings": { path: "/mon-compte", override: true }
// → URL finale : /mon-compte
//   (ignore le basePath "/app")
```

#### 3. Path INDEX (`"/"`)

Route index du groupe :

```typescript
"public/home": { path: "/", override: false }
// → URL finale : /
//   (route racine)
```

### `override` (optionnel, défaut: `false`)

Active ou désactive la redéfinition du path.

| Valeur | Comportement |
|--------|--------------|
| `false` | Utilise la **structure de fichiers** (path ignoré sauf si absolu) |
| `true` | Force l'utilisation du **path personnalisé** |

**Exemples** :

```typescript
// Override désactivé : utilise la structure de fichiers
"auth/login": { path: "/custom", override: false }
// → URL finale : /auth/login (path ignoré)

// Override activé : utilise le path personnalisé
"auth/login": { path: "/custom", override: true }
// → URL finale : /custom
```

## 🏗️ Groupes de routes

Chaque groupe a un `basePath` par défaut :

| Groupe | basePath | Usage | Exemple d'URL |
|--------|----------|-------|---------------|
| `public` | `/` | Routes publiques | `/`, `/about` |
| `auth` | `/auth` | Routes d'authentification | `/auth/login` |
| `protected` | `/app` | Routes protégées | `/app/dashboard` |

## 📋 Exemples complets

### Exemple 1 : Configuration par défaut

```typescript
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
  // Routes publiques
  "public/home": { path: "/", override: false },
  
  // Routes d'auth
  "auth/login": { path: "login", override: false },
  "auth/register": { path: "register", override: false },
  
  // Routes protégées
  "protected/dashboard": { path: "dashboard", override: false },
  "protected/settings": { path: "settings", override: false },
}
```

**URLs générées** :
- `/` (home)
- `/auth/login`
- `/auth/register`
- `/app/dashboard`
- `/app/settings`

### Exemple 2 : Redéfinition avec paths absolus

```typescript
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
  // Login accessible directement à la racine
  "auth/login": { path: "/login", override: true },
  
  // Register sous /auth
  "auth/register": { path: "register", override: false },
  
  // Settings accessible via un chemin personnalisé
  "protected/settings": { path: "/mon-compte", override: true },
}
```

**URLs générées** :
- `/login` (au lieu de `/auth/login`)
- `/auth/register` (inchangé)
- `/mon-compte` (au lieu de `/app/settings`)

### Exemple 3 : Chemins imbriqués

```typescript
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
  // Chemin imbriqué relatif
  "protected/settings": { path: "account/settings", override: true },
  // → URL finale : /app/account/settings
  
  // Chemin imbriqué absolu
  "protected/profile": { path: "/user/profile", override: true },
  // → URL finale : /user/profile
}
```

## 🔄 Synchronisation automatique

Le fichier est **auto-généré** et **synchronisé** par `watch-routes.ts` :

### Création initiale

Si le fichier n'existe pas, il est créé avec **toutes les routes** de la structure de fichiers :

```typescript
// Scan automatique de src/routes/
"public/home": { path: "home", override: false }, // Auto-généré
"auth/login": { path: "login", override: false }, // Auto-généré
```

### Ajout de nouvelles routes

Quand un nouveau fichier `.tsx` est créé :

```typescript
// Nouvelle route détectée
"public/about": { path: "about", override: false }, // 🆕 Auto-ajouté
```

### Suppression de routes

Quand un fichier `.tsx` est supprimé, la ligne correspondante est **automatiquement retirée** du fichier.

### Préservation des modifications

**Vos modifications sont toujours préservées** :

```typescript
// Avant sync
"auth/login": { path: "/login", override: true }, // Votre config

// Après sync (ajout d'une nouvelle route)
"auth/login": { path: "/login", override: true }, // ✅ Préservé !
"auth/forgot": { path: "forgot", override: false }, // 🆕 Auto-ajouté
```

## ⚠️ Avertissements

### 🚨 Redémarrage nécessaire

Les modifications de ce fichier **nécessitent un redémarrage** du serveur :

1. Modifier `route.config.ts`
2. Sauvegarder
3. **Arrêter le serveur** (Ctrl+C)
4. **Relancer** (`npm run dev`)

### 🚨 Suppression du fichier

Si vous **supprimez** `route.config.ts` :
- Il sera **recréé automatiquement** avec les valeurs par défaut
- **TOUTES vos personnalisations seront PERDUES** !

### 🚨 Override doit être activé

Pour que le `path` personnalisé soit pris en compte, `override` doit être `true` :

```typescript
// ❌ Path ignoré (override: false)
"auth/login": { path: "/login", override: false }
// → URL : /auth/login

// ✅ Path utilisé (override: true)
"auth/login": { path: "/login", override: true }
// → URL : /login
```

**Exception** : Les paths absolus dans le groupe `public` sont toujours utilisés.

## 🎯 Cas d'usage

### Cas 1 : Routes multilingues

```typescript
"public/home": { path: "/", override: false },
"public/home-fr": { path: "/fr", override: true },
"public/home-en": { path: "/en", override: true },
```

### Cas 2 : URLs SEO-friendly

```typescript
"protected/settings": { path: "/mon-compte/parametres", override: true },
"protected/profile": { path: "/mon-compte/profil", override: true },
```

### Cas 3 : Migration d'URLs

```typescript
// Ancien : /auth/login
// Nouveau : /connexion
"auth/login": { path: "/connexion", override: true },
```

### Cas 4 : Raccourcis

```typescript
// Accès rapide depuis la racine
"auth/login": { path: "/login", override: true },
"auth/register": { path: "/register", override: true },
```

## 📊 Récapitulatif

| Scenario | override | path | URL finale |
|----------|----------|------|------------|
| Par défaut | `false` | `"login"` | `/auth/login` |
| Relatif custom | `true` | `"signin"` | `/auth/signin` |
| Absolu | `true` | `"/login"` | `/login` |
| Index | `false` | `"/"` | `/` |

## 🔗 Fichiers liés

- [`watch-routes.md`](./watch-routes.md) : Documentation du watcher
- [`router.md`](./router.md) : Documentation du router
- [`ROUTING-GUIDE.md`](../ROUTING-GUIDE.md) : Guide utilisateur complet

## 💡 Bonnes pratiques

1. ✅ **Commenter les overrides** : Expliquez pourquoi vous redéfinissez un path
2. ✅ **Grouper par fonctionnalité** : Gardez les routes liées ensemble
3. ✅ **Tester après modification** : Vérifiez que les URLs fonctionnent
4. ✅ **Sauvegarder régulièrement** : Ce fichier contient vos personnalisations
5. ❌ **Ne jamais supprimer** : Vous perdriez toutes vos configs

## 🐛 Troubleshooting

### Problème : Le path ne change pas

**Solution** : Vérifiez que `override: true` et redémarrez le serveur.

### Problème : Route en double

**Solution** : Vérifiez qu'il n'y a pas deux routes avec le même path absolu.

### Problème : Configuration écrasée

**Solution** : Ne supprimez jamais `route.config.ts`. Restaurez depuis votre backup si nécessaire.
