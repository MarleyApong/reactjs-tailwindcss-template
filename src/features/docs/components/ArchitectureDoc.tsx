export function ArchitectureDoc() {
  return (
    <div className="text-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">🏗️ Architecture du Projet</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">📁 Structure générale</h2>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`src/
├── routes/           # Routes de l'application (code-based routing)
│   ├── public/      # Routes publiques (/, /docs, etc.)
│   ├── auth/        # Routes d'authentification (/auth/*)
│   ├── protected/   # Routes protégées (/app/*)
│   └── route.config.ts
│
├── features/        # Fonctionnalités isolées par domaine
│   ├── auth/
│   ├── dashboard/
│   └── profile/
│
├── shared/          # Ressources partagées dans toute l'app
│   ├── components/
│   │   ├── ui/          # Button, Input, Card, Modal...
│   │   └── layout/      # Header, Footer, Sidebar...
│   ├── hooks/           # useDebounce, useLocalStorage...
│   ├── i18n/           # Système i18n custom
│   ├── contexts/       # Contextes React globaux
│   └── utils/          # Fonctions utilitaires
│
├── assets/          # Fichiers statiques (images, fonts, etc.)
├── App.tsx          # Point d'entrée principal
└── router.ts        # Configuration du routeur (auto-généré)`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">🎯 Philosophie Feature-Based</h2>
        <p className="mb-4 text-slate-700 dark:text-slate-300">Chaque fonctionnalité métier est isolée dans <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded text-sm">src/features/</code> :</p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-4">
          <p className="font-semibold mb-2 text-blue-900 dark:text-blue-200">✅ Avantages :</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Isolation</strong> : Chaque feature est autonome</li>
            <li><strong>Scalabilité</strong> : Facile d'ajouter/supprimer des features</li>
            <li><strong>Maintenance</strong> : Code organisé par domaine métier</li>
            <li><strong>Réutilisabilité</strong> : Composants spécifiques à la feature</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">Structure d'une feature</h3>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`src/features/auth/
├── components/       # Composants spécifiques à l'auth
│   ├── LoginForm.tsx
│   └── SocialButtons.tsx
├── hooks/           # Hooks personnalisés
│   ├── useAuth.ts
│   └── useLogin.ts
├── contexts/        # Contextes React (optionnel)
│   └── AuthContext.tsx
├── services/        # Logique API (optionnel)
│   └── authService.ts
├── types/           # Types TypeScript (optionnel)
│   └── auth.types.ts
└── index.ts         # Exports publics de la feature`}
        </pre>

        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 my-4">
          <p className="font-semibold text-amber-900 dark:text-amber-200">⚠️ Règle importante :</p>
          <p className="text-sm text-slate-700 dark:text-slate-300">Une feature ne doit PAS importer depuis une autre feature directement. Utilisez <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">shared/</code> pour les ressources communes.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">📦 Shared Resources</h2>
        <p className="mb-4 text-slate-700 dark:text-slate-300">Le dossier <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded text-sm">shared/</code> contient tout ce qui est réutilisé à travers l'application :</p>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">📦 components/ui/</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Composants réutilisables de l'interface utilisateur</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Button, Input, Card</li>
              <li>• Modal, Select, Checkbox</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2">🏗️ components/layout/</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Composants de mise en page</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Header, Footer</li>
              <li>• Sidebar, Container</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2">🎣 hooks/</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Hooks personnalisés réutilisables</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• useDebounce</li>
              <li>• useLocalStorage</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">🛠️ utils/</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Fonctions utilitaires</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• formatDate, validators</li>
              <li>• API helpers, constants</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-4">
          <p className="font-semibold text-green-900 dark:text-green-200">💡 Astuce :</p>
          <p className="text-sm text-slate-700 dark:text-slate-300">Si un composant ou hook est utilisé par plusieurs features, il doit être dans <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">shared/</code>. S'il est spécifique à une feature, il reste dans cette feature.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">🔄 Flux de données</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">1. Routes → Features</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">Les routes importent et utilisent les composants des features</p>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 rounded text-xs mt-2 border border-slate-200 dark:border-slate-700">
{`// src/routes/auth/login.tsx
import { LoginForm } from "@/features/auth"`}
            </pre>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">2. Features → Shared</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">Les features utilisent les ressources partagées</p>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 rounded text-xs mt-2 border border-slate-200 dark:border-slate-700">
{`// src/features/auth/components/LoginForm.tsx
import { Button } from "@/shared/components/ui"
import { useTranslation } from "@/shared/i18n"`}
            </pre>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold mb-2 text-red-900 dark:text-red-200">❌ À éviter :</h4>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 rounded text-xs mt-2 border border-slate-200 dark:border-slate-700">
{`// ❌ MAUVAIS : feature → feature
import { AuthContext } from "@/features/auth"

// ✅ BON : utiliser shared/ pour partager
import { AuthContext } from "@/shared/contexts"`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}
