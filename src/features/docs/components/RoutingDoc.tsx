export function RoutingDoc() {
  return (
    <div className="text-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">🚦 Système de Routage</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">✨ Caractéristiques</h2>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          <li>✅ Basé sur <strong>TanStack Router</strong></li>
          <li>✅ <strong>Routes générées automatiquement</strong> depuis les fichiers</li>
          <li>✅ <strong>Configuration flexible</strong> avec <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded text-sm">route.config.ts</code></li>
          <li>✅ <strong>Support des chemins personnalisés</strong></li>
          <li>✅ <strong>Hot reload automatique</strong></li>
          <li>✅ <strong>Type-safe</strong> avec autocomplétion</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">🗂️ Organisation des routes</h2>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`src/routes/
├── public/          # Routes publiques (/)
│   ├── home.tsx     # → /
│   ├── docs.tsx     # → /docs
│   └── index.tsx    # Auto-généré par le watcher
│
├── auth/            # Routes d'authentification (/auth)
│   ├── login.tsx    # → /auth/login (ou /auth/mui avec config)
│   ├── register.tsx # → /auth/register
│   └── index.tsx    # Auto-généré par le watcher
│
├── protected/       # Routes protégées (/app)
│   ├── dashboard.tsx # → /app/dashboard
│   ├── profile.tsx  # → /app/profile
│   └── index.tsx    # Auto-généré par le watcher
│
├── root.tsx         # Layout racine
└── route.config.ts  # Configuration personnalisée`}
        </pre>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-4">
          <p className="font-semibold mb-2 text-blue-900 dark:text-blue-200">📍 BasePaths des groupes :</p>
          <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
            <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
              <code className="text-green-600 dark:text-green-400">public/</code>
              <div className="text-slate-600 dark:text-slate-400 mt-1">basePath: <code className="bg-slate-200 dark:bg-slate-950 px-1 rounded">/</code></div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
              <code className="text-blue-600 dark:text-blue-400">auth/</code>
              <div className="text-slate-600 dark:text-slate-400 mt-1">basePath: <code className="bg-slate-200 dark:bg-slate-950 px-1 rounded">/auth</code></div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
              <code className="text-purple-600 dark:text-purple-400">protected/</code>
              <div className="text-slate-600 dark:text-slate-400 mt-1">basePath: <code className="bg-slate-200 dark:bg-slate-950 px-1 rounded">/app</code></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">➕ Créer une nouvelle route</h2>
        
        <div className="space-y-6 my-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Étape 1 : Créez le fichier</h3>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`// src/routes/public/about.tsx
export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Page à propos</p>
    </div>
  )
}`}
            </pre>
            <p className="text-sm mt-2 text-green-600 dark:text-green-400 font-medium">
              ✅ La route <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">/about</code> est automatiquement créée !
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Étape 2 : Le watcher la détecte</h3>
            <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">Le script <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">watch-routes</code> tourne en arrière-plan avec <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">npm run dev</code></p>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`👀 Watching routes...
➕ Added: src/routes/public/about.tsx
🔍 [public] about.tsx → path="/about"
✅ Updated: routes/public/index.tsx
✅ Updated: router.ts
🔄 Routes regenerated.`}
            </pre>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Étape 3 : Utilisez-la !</h3>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`import { Link } from "@tanstack/react-router"

// Type-safe, avec autocomplétion !
<Link to="/about">À propos</Link>`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">⚙️ Configuration personnalisée</h2>
        <p className="mb-4 text-slate-700 dark:text-slate-300">Utilisez <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded text-sm">route.config.ts</code> pour personnaliser les chemins :</p>
        
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm my-4 border border-slate-200 dark:border-slate-700">
{`// src/routes/route.config.ts
export const routeConfig = {
  // Path relatif (ajouté au basePath du groupe)
  "auth/login": { 
    path: "mui",       // → /auth/mui
    override: true 
  },
  
  // Path absolu (ignore le basePath)
  "public/about": { 
    path: "/a-propos", // → /a-propos
    override: true 
  },
  
  // Désactiver l'override pour utiliser la structure de fichiers
  "public/contact": {
    override: false    // → /contact (défaut)
  }
}`}
        </pre>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-4">
          <p className="font-semibold mb-2 text-blue-900 dark:text-blue-200">📋 Règles des paths :</p>
          <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <li>• <strong>Sans "/"</strong> → Chemin relatif, ajouté au basePath du groupe</li>
            <li>• <strong>Avec "/"</strong> → Chemin absolu, ignore le basePath</li>
            <li>• <strong>override: false</strong> → Utilise la structure de fichiers par défaut</li>
            <li>• <strong>override: true</strong> → Utilise le chemin personnalisé</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">🧭 Navigation</h2>
        
        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">Utiliser Link</h3>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`import { Link } from "@tanstack/react-router"

// Navigation simple
<Link to="/">Accueil</Link>
<Link to="/docs">Documentation</Link>
<Link to="/app/dashboard">Dashboard</Link>

// Avec classes CSS
<Link 
  to="/about" 
  className="text-blue-600 hover:underline"
>
  À propos
</Link>`}
        </pre>

        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">Navigation programmatique</h3>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`import { useNavigate } from "@tanstack/react-router"

function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate({ to: "/app/dashboard" })
  }
  
  return <button onClick={handleClick}>Go to Dashboard</button>
}`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">💡 Bonnes pratiques</h2>
        <div className="space-y-3">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
            <p className="font-semibold text-green-900 dark:text-green-200">✅ À faire :</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Organiser les routes par type : public, auth, protected</li>
              <li>• Utiliser des noms de fichiers descriptifs</li>
              <li>• Laisser tourner <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">npm run dev</code> pour le hot reload</li>
              <li>• Utiliser <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">route.config.ts</code> pour personnaliser les URLs</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
            <p className="font-semibold text-red-900 dark:text-red-200">❌ À éviter :</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Modifier les fichiers <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">index.tsx</code> auto-générés</li>
              <li>• Créer des routes hors de <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">src/routes/</code></li>
              <li>• Mélanger les types de routes (public avec protected)</li>
              <li>• Oublier d'exporter le composant par défaut</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
