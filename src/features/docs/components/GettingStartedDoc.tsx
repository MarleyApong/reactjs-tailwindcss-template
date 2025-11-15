export function GettingStartedDoc() {
  return (
    <div className="text-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">🚀 Guide de Démarrage</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">📦 Installation</h2>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-200 dark:border-slate-700">
{`# Cloner le template
git clone [votre-repo]

# Installer les dépendances
npm install

# Lancer le dev server
npm run dev`}
        </pre>
        <p className="text-sm mt-3 text-slate-600 dark:text-slate-400">
          Le serveur démarre sur <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">http://localhost:5173</code> avec hot reload activé
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">⚙️ Scripts disponibles</h2>
        <div className="space-y-3 my-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <code className="text-blue-600 dark:text-blue-400 font-semibold">npm run dev</code>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Lance Vite + watcher de routes en parallèle</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <code className="text-blue-600 dark:text-blue-400 font-semibold">npm run build</code>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Build de production optimisé</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <code className="text-blue-600 dark:text-blue-400 font-semibold">npm run preview</code>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Prévisualiser le build de production</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <code className="text-blue-600 dark:text-blue-400 font-semibold">npm run parse:all</code>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Scan complet des traductions i18n</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">🎯 Premiers pas</h2>
        
        <div className="space-y-6 my-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">1. Créer une nouvelle page</h3>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`// src/routes/public/contact.tsx
export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Contactez-nous</h1>
    </div>
  )
}

// → Accessible sur /contact automatiquement !`}
            </pre>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">2. Ajouter des traductions</h3>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`import { useTranslation } from "@/shared/i18n/index.tsx"

export default function Contact() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t("contact.title")}</h1>
      <p>{t("contact.description")}</p>
    </div>
  )
}

// Puis: npm run parse:all`}
            </pre>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">3. Créer une feature</h3>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`src/features/products/
├── components/
│   ├── ProductCard.tsx
│   └── ProductList.tsx
├── hooks/
│   └── useProducts.ts
├── types/
│   └── product.types.ts
└── index.ts`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">💡 Conseils</h2>
        <div className="space-y-4 my-4">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
            <p className="font-semibold text-green-900 dark:text-green-200">✅ À faire :</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Utiliser shared/ pour les composants réutilisables</li>
              <li>• Créer des features pour les domaines métier</li>
              <li>• Lancer npm run parse:all régulièrement</li>
              <li>• Utiliser TypeScript pour tout</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <p className="font-semibold text-red-900 dark:text-red-200">❌ À éviter :</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Importer depuis une feature vers une autre</li>
              <li>• Modifier les index.tsx auto-générés</li>
              <li>• Ignorer les erreurs TypeScript</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
