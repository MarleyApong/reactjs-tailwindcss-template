# 🚀 React + TypeScript + Vite Template

Template React moderne avec architecture feature-based, système de routage automatique et internationalisation type-safe.

## ✨ Caractéristiques

### 🏗️ Architecture
- **Feature-based architecture** : Organisation par domaine métier (`features/`, `shared/`)
- **Type-safe** : TypeScript strict avec autocomplétion complète
- **Composants réutilisables** : Séparation claire entre features et shared
- **Bonnes pratiques** : Structure scalable pour projets d'entreprise

### 🚦 Routage
- **TanStack Router** : Routing type-safe et performant
- **Génération automatique** : Routes créées depuis la structure de fichiers
- **Configuration flexible** : Personnalisation via `route.config.ts`
- **Hot reload** : Watcher en temps réel pour les changements de routes
- **Groupes de routes** : `public/`, `auth/`, `protected/` avec basePaths configurables

### 🌍 Internationalisation
- **Sans dépendance externe** : Système i18n custom 100% natif
- **Type-safe** : Autocomplétion des clés de traduction
- **Auto-détection** : Scan automatique des clés utilisées avec `t()`
- **Multi-langues** : Support FR/EN avec possibilité d'extension
- **Génération automatique** : Types TypeScript générés depuis les traductions

### ⚡ Performance
- **Vite** : Build ultra-rapide avec Rolldown
- **React 19** : Dernière version avec React Compiler activé
- **TailwindCSS 4** : Styling moderne et optimisé
- **Code splitting** : Optimisation automatique du bundle

### 📚 Documentation
- **Documentation intégrée** : Page `/docs` avec navigation sidebar
- **Guides complets** : Architecture, Routing, i18n, Getting Started
- **Dark mode** : Support complet light/dark
- **Responsive** : Interface adaptée mobile/desktop

## 🚀 Installation

```bash
# Cloner le template
git clone https://github.com/MarleyApong/reactjs-tailwindcss-template.git
cd reactjs-tailwindcss-template

# Ou installation simple
npm install

# Lancer le dev server
npm run dev
```

Le serveur démarre sur `http://localhost:5179` avec hot reload activé.

## 📜 Scripts disponibles

### Développement
```bash
npm run dev              # Lance Vite + watcher de routes en parallèle
npm run dev:vite         # Lance uniquement Vite
npm run watch:routes     # Lance uniquement le watcher de routes
```

### Build & Preview
```bash
npm run build            # Build de production avec TypeScript check
npm run preview          # Prévisualiser le build de production
```

### Qualité du code
```bash
npm run lint             # Vérifier le code avec ESLint
npm run format           # Formater le code avec Prettier
npm run format:check     # Vérifier le formatage sans modifier
```

### Internationalisation
```bash
npm run parse            # Scan basique des traductions
npm run parse:verbose    # Scan avec détails
npm run parse:sort       # Trier les clés alphabétiquement
npm run parse:clean      # Nettoyer les clés inutilisées
npm run parse:all        # Toutes les options combinées (recommandé)
```

### Release
```bash
npm run release:dev      # Release en développement (prerelease)
npm run release:prod     # Release en production
```

## 📁 Structure du projet

```
src/
├── features/              # Features métier (domaines)
│   └── docs/             # Feature documentation
│       ├── components/   # Composants de la feature
│       └── index.ts      # Exports publics
│
├── routes/               # Routes de l'application
│   ├── public/          # Routes publiques (/)
│   │   ├── home.tsx     # Page d'accueil
│   │   ├── docs.tsx     # Documentation
│   │   └── index.tsx    # Auto-généré
│   ├── auth/            # Routes auth (/auth)
│   │   ├── login.tsx    # Connexion
│   │   ├── register.tsx # Inscription
│   │   └── index.tsx    # Auto-généré
│   ├── protected/       # Routes protégées (/app)
│   │   ├── dashboard.tsx
│   │   └── index.tsx    # Auto-généré
│   ├── root.tsx         # Layout racine
│   └── route.config.ts  # Configuration des routes
│
├── shared/              # Ressources partagées
│   └── i18n/           # Système d'internationalisation
│       ├── locales/    # Traductions (fr.ts, en.ts)
│       ├── index.tsx   # Provider + hook
│       ├── index.ts    # Exports publics
│       └── types.ts    # Types auto-générés
│
├── components/         # Composants de démo (à supprimer)
├── assets/            # Images, fonts, etc.
├── App.tsx            # Composant App principal
├── main.tsx           # Point d'entrée
└── router.ts          # Configuration du router
```

## 🎯 Utilisation

### Créer une nouvelle route

```tsx
// src/routes/public/contact.tsx
export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Contactez-nous</h1>
    </div>
  )
}
// → Accessible sur /contact automatiquement !
```

### Utiliser les traductions

```tsx
import { useTranslation } from "@/shared/i18n/index.tsx"

export default function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useTranslation()
  
  return (
    <div>
      <h1>{t("home.title")}</h1>
      <button onClick={() => changeLanguage("en")}>
        English
      </button>
    </div>
  )
}

// Puis générer les types
// npm run parse:all
```

### Créer une feature

```
src/features/products/
├── components/
│   ├── ProductCard.tsx
│   └── ProductList.tsx
├── hooks/
│   └── useProducts.ts
├── types/
│   └── product.types.ts
└── index.ts  # Exports publics uniquement
```

## 🛠️ Technologies

- **React 19.1** - Bibliothèque UI avec React Compiler
- **TypeScript 5.9** - Typage statique
- **Vite (Rolldown)** - Build tool ultra-rapide
- **TanStack Router 1.134** - Routing type-safe
- **TailwindCSS 4.1** - Framework CSS utility-first
- **ESLint + Prettier** - Qualité et formatage du code

## 📖 Documentation

Visitez `/docs` dans l'application pour la documentation complète :
- **Architecture** : Structure du projet et bonnes pratiques
- **Routing** : Système de routage automatique
- **i18n** : Internationalisation type-safe
- **Getting Started** : Guide de démarrage rapide

## 🤝 Contribution

1. Utiliser `shared/` pour les composants réutilisables
2. Créer des `features/` pour les domaines métier
3. Ne pas importer entre features (uniquement depuis shared)
4. Lancer `npm run parse:all` régulièrement
5. Respecter TypeScript strict

## 📝 License

MIT
