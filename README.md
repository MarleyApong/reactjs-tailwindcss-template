# React + TypeScript + Vite Template

![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.x-FF4154?logo=reactquery&logoColor=white)

A modern React starter template featuring file-based routing with TanStack Router, a custom type-safe internationalization system, and a feature-based architecture — ready for production.

---

## Overview

This template gives you a fully configured React application without any boilerplate decisions to make. It combines the best of file-based routing (automatic route generation) with the flexibility of code-based routing (custom URL paths via configuration), all in TypeScript.

**What makes this template different:**
- Routes are generated automatically from your file structure — just create a `.tsx` file and it becomes a route
- A custom i18n system with full TypeScript autocomplete — no external dependencies, no runtime overhead
- Rolldown-powered Vite for near-instant builds and HMR
- React 19 with React Compiler for automatic memoization

---

## Features

### File-Based Routing
- Automatic route generation from `src/routes/` directory structure
- Three route groups: `public/` (basePath `/`), `auth/` (basePath `/auth`), `protected/` (basePath `/app`)
- Custom URL paths via `route.config.ts` without changing file structure
- Layout wrappers via `_layout.tsx` files (e.g. authentication guards)
- Dynamic route parameters with `$param.tsx` naming
- Hot reload — the watcher regenerates routes on file add/delete

### Type-Safe Internationalization
- Zero external dependencies — pure TypeScript implementation
- Auto-generated types from your translation files — full IDE autocomplete for `t("key")`
- Multi-language support (French and English included, easily extensible)
- CLI parser scans your codebase and syncs translation keys automatically

### Developer Experience
- **Vite with Rolldown** — ultra-fast builds and HMR
- **React 19** with React Compiler (automatic memoization)
- **TailwindCSS 4** — utility-first styling with latest engine
- **TypeScript strict mode** — catch errors at compile time
- **ESLint + Prettier** — consistent code style enforced
- **Path aliases** — `@/` maps to `src/` for clean imports

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/MarleyApong/reactjs-tailwindcss-template.git my-app
cd my-app

# Install dependencies
npm install

# Start the development server (Vite + route watcher in parallel)
npm run dev
```

The dev server starts at `http://localhost:5179`.

---

## Project Structure

```
reactjs-tailwindcss-template/
├── docs/                          # Documentation
│   ├── watch-routes.md            # Route watcher documentation
│   ├── route.config.md            # route.config.ts documentation
│   └── router.md                  # router.ts documentation
│
├── scripts/
│   ├── watch-routes.ts            # Route watcher (generates _root.tsx + router.ts)
│   └── i18n/
│       └── i18n-parser.js         # Translation key scanner
│
├── src/
│   ├── features/                  # Domain-specific features
│   │   └── docs/                  # Built-in documentation feature
│   │       ├── components/
│   │       └── index.ts           # Public API export
│   │
│   ├── routes/                    # File-based routes
│   │   ├── root.tsx               # Root route (manual, do not delete)
│   │   ├── route.config.ts        # URL path configuration (auto-synced)
│   │   ├── public/                # Public routes → basePath "/"
│   │   │   ├── _root.tsx          # Auto-generated (do not edit)
│   │   │   ├── home.tsx           # → URL: /
│   │   │   └── docs.tsx           # → URL: /docs
│   │   ├── auth/                  # Auth routes → basePath "/auth"
│   │   │   ├── _root.tsx          # Auto-generated (do not edit)
│   │   │   ├── login.tsx          # → URL: /auth/login
│   │   │   ├── register.tsx       # → URL: /auth/register
│   │   │   └── hello.tsx          # → URL: /auth/hello
│   │   └── protected/             # Protected routes → basePath "/app"
│   │       ├── _root.tsx          # Auto-generated (do not edit)
│   │       ├── dashboard.tsx      # → URL: /app/dashboard
│   │       ├── me.tsx             # → URL: /app/me
│   │       ├── profile.tsx        # → URL: /app/profile
│   │       └── settings.tsx       # → URL: /app/settings
│   │
│   ├── shared/                    # Reusable resources
│   │   └── i18n/                  # Internationalization system
│   │       ├── locales/
│   │       │   ├── fr.ts          # French translations
│   │       │   ├── en.ts          # English translations
│   │       │   └── index.ts       # Language configuration
│   │       ├── index.tsx          # I18nProvider + useTranslation hook
│   │       └── types.ts           # Auto-generated translation types
│   │
│   ├── router.ts                  # Auto-generated route tree (do not edit)
│   ├── App.tsx                    # Root component
│   └── main.tsx                   # Application entry point
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.cjs
```

---

## Available Scripts

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server + route watcher in parallel |
| `npm run dev:vite` | Start only the Vite dev server |
| `npm run watch:routes` | Start only the route watcher |

### Build & Preview

| Command | Description |
|---------|-------------|
| `npm run build` | Production build with TypeScript type checking |
| `npm run preview` | Preview the production build locally |

### Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint on the codebase |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without making changes |

### Internationalization

| Command | Description |
|---------|-------------|
| `npm run parse` | Basic translation key scan |
| `npm run parse:verbose` | Scan with detailed output |
| `npm run parse:sort` | Scan and sort keys alphabetically |
| `npm run parse:clean` | Scan and remove unused keys |
| `npm run parse:all` | All options combined (recommended) |

### Release

| Command | Description |
|---------|-------------|
| `npm run release:dev` | Create a development prerelease |
| `npm run release:prod` | Create a production release |

---

## Routing System

### How It Works

The route watcher (`scripts/watch-routes.ts`) monitors `src/routes/` and automatically:

1. Scans all `.tsx` files in route group directories
2. Syncs `route.config.ts` (adds new routes, removes deleted ones)
3. Regenerates `_root.tsx` files for each route group
4. Regenerates `src/router.ts` with the full route tree

**Files you edit:** `home.tsx`, `login.tsx`, `dashboard.tsx`, etc.
**Files auto-generated (do not edit):** `_root.tsx` files, `src/router.ts`

### Route Groups

| Group | Base Path | Example Files | Example URLs |
|-------|-----------|---------------|--------------|
| `public/` | `/` | `home.tsx`, `about.tsx` | `/`, `/about` |
| `auth/` | `/auth` | `login.tsx`, `register.tsx` | `/auth/login`, `/auth/register` |
| `protected/` | `/app` | `dashboard.tsx`, `settings.tsx` | `/app/dashboard`, `/app/settings` |

### Customizing URL Paths

Edit `src/routes/route.config.ts` to customize URL paths:

```typescript
export const routeConfig = {
  // Make home the site root
  "public/home": { path: "/", override: true },

  // Keep default path structure
  "auth/login": { path: "login", override: false },     // → /auth/login

  // Override to absolute path
  "auth/register": { path: "/register", override: true }, // → /register
}
```

> After editing `route.config.ts`, restart the dev server (Ctrl+C then `npm run dev`).

### Adding a New Route

1. Create a file in the appropriate route group:
   ```tsx
   // src/routes/public/about.tsx
   export default function About() {
     return (
       <div className="container mx-auto px-4 py-8">
         <h1>About Us</h1>
       </div>
     )
   }
   ```

2. The watcher automatically:
   - Adds `"public/about"` to `route.config.ts`
   - Regenerates `public/_root.tsx` with `publicAboutRoute`
   - Regenerates `src/router.ts`

3. The route is immediately accessible at `/about`

### Protected Routes with `_layout.tsx`

Add a `_layout.tsx` file to a route group to wrap all its routes (e.g. authentication guard):

```tsx
// src/routes/protected/_layout.tsx
import { Outlet, redirect } from '@tanstack/react-router'

export default function ProtectedLayout() {
  const isAuthenticated = checkAuth()

  if (!isAuthenticated) {
    throw redirect({ to: '/auth/login' })
  }

  return <Outlet />
}
```

The watcher detects `_layout.tsx` and sets it as the component for the group's parent route.

### Dynamic Route Parameters

Create files with `$` prefix for dynamic segments:

```
src/routes/protected/$userId.tsx   → URL: /app/:userId
src/routes/protected/posts/$postId.tsx → URL: /app/posts/:postId
```

Access params in the component:
```tsx
import { useParams } from '@tanstack/react-router'

export default function UserPage() {
  const { userId } = useParams({ strict: false })
  return <div>User: {userId}</div>
}
```

---

## Internationalization

### Usage

```tsx
import { useTranslation } from "@/shared/i18n/index.tsx"

export default function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useTranslation()

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  )
}
```

### Workflow

1. Use `t("your.key")` in any component
2. Run `npm run parse:all` to scan your code and add missing keys
3. Edit the translation files with actual values:
   ```typescript
   // src/shared/i18n/locales/en.ts
   export const en = {
     home: {
       title: "Welcome",
     },
   }
   ```
4. TypeScript types are updated automatically — IDE autocomplete works immediately

### Adding a Language

1. Create `src/shared/i18n/locales/es.ts`:
   ```typescript
   export const es = {
     home: {
       title: "Bienvenido",
     },
   }
   ```

2. Add it to `src/shared/i18n/locales/index.ts`:
   ```typescript
   import { es } from './es'
   export const supportedLanguages = {
     fr: { name: 'Français', flag: '🇫🇷', translations: fr },
     en: { name: 'English', flag: '🇺🇸', translations: en },
     es: { name: 'Español', flag: '🇪🇸', translations: es },
   }
   ```

3. Add `'es'` to `supportedLanguages` in `scripts/i18n/i18n-parser.js`

---

## Feature Architecture

The codebase uses a **feature-based architecture**:

```
src/features/
└── my-feature/
    ├── components/      # UI components for this feature
    ├── hooks/           # Custom hooks
    ├── types/           # TypeScript types
    ├── services/        # API calls
    └── index.ts         # Public API (only export what's needed)
```

**Rules:**
- Features must **not** import from other features
- Features may only import from `src/shared/`
- Export public API through `index.ts`

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://typescriptlang.org) | 5.9 | Type safety |
| [Vite](https://vite.dev) | Latest (Rolldown) | Build tool & dev server |
| [TanStack Router](https://tanstack.com/router) | 1.x | Type-safe routing |
| [TailwindCSS](https://tailwindcss.com) | 4 | Utility-first CSS |
| [ESLint](https://eslint.org) | 9 | Code linting |
| [Prettier](https://prettier.io) | Latest | Code formatting |
| [chokidar](https://github.com/paulmillr/chokidar) | 4 | File watching |

---

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite + Rolldown + TailwindCSS + React Compiler |
| `tsconfig.json` | TypeScript strict configuration |
| `eslint.config.js` | ESLint with TypeScript rules |
| `.prettierrc` | Prettier formatting rules |
| `src/routes/route.config.ts` | Route URL path overrides |
| `src/shared/i18n/locales/` | Translation files |

---

## License

MIT
