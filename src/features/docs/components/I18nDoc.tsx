export function I18nDoc() {
  return (
    <div className="text-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">🌍 Système d'Internationalisation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">✨ Caractéristiques</h2>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          <li>✅ <strong>Sans dépendance externe</strong> (100% natif)</li>
          <li>✅ <strong>Type-safe</strong> avec TypeScript</li>
          <li>✅ <strong>Auto-complétion</strong> des clés de traduction</li>
          <li>✅ <strong>Détection automatique</strong> des clés manquantes</li>
          <li>✅ <strong>Support multi-langues</strong> (FR, EN par défaut)</li>
          <li>✅ <strong>Persistance</strong> dans localStorage</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">📝 Utilisation de base</h2>
        
        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">1. Utiliser les traductions</h3>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-200 dark:border-slate-700">
{`import { useTranslation } from "@/shared/i18n/index.tsx"

export function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t("home.title")}</h1>
      <p>{t("home.description")}</p>
    </div>
  )
}`}
        </pre>

        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">2. Changer de langue</h3>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-200 dark:border-slate-700">
{`const { currentLanguage, changeLanguage } = useTranslation()

// Changer vers l'anglais
changeLanguage("en")

// Changer vers le français
changeLanguage("fr")

// Langue actuelle
console.log(currentLanguage) // "fr" ou "en"`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">➕ Ajouter des traductions</h2>
        
        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200">Méthode automatique (recommandée)</h3>
        <div className="space-y-4 my-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold mb-2 text-slate-900 dark:text-white">Étape 1 : Ajoutez vos clés dans le code</p>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`// Dans n'importe quel composant
<h1>{t("products.title")}</h1>
<p>{t("products.description")}</p>
<button>{t("products.addToCart")}</button>`}
            </pre>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold mb-2 text-slate-900 dark:text-white">Étape 2 : Lancez le scanner</p>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`npm run parse:all`}
            </pre>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
              Le scanner détecte automatiquement toutes les clés utilisées avec <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">t()</code>
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold mb-2 text-slate-900 dark:text-white">Étape 3 : Éditez les traductions générées</p>
            <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`// src/shared/i18n/locales/fr.ts
export const fr = {
  products: {
    title: "Produits",
    description: "Découvrez nos produits",
    addToCart: "Ajouter au panier"
  }
}

// src/shared/i18n/locales/en.ts
export const en = {
  products: {
    title: "Products",
    description: "Discover our products",
    addToCart: "Add to cart"
  }
}`}
            </pre>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-4">
          <p className="font-semibold text-green-900 dark:text-green-200">✨ Magie TypeScript :</p>
          <p className="text-sm text-slate-700 dark:text-slate-300">Le scanner génère automatiquement les types TypeScript ! Vous aurez l'autocomplétion pour toutes vos clés de traduction.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">⚙️ Commandes disponibles</h2>
        <div className="space-y-3 my-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <code className="text-blue-600 dark:text-blue-400 font-semibold">npm run parse</code>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Scan basique des traductions</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <code className="text-blue-600 dark:text-blue-400 font-semibold">npm run parse:verbose</code>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Scan avec détails (affiche chaque fichier analysé)</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <code className="text-blue-600 dark:text-blue-400 font-semibold">npm run parse:all</code>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Toutes les options combinées (recommandé)</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">🏗️ Architecture du système i18n</h2>
        <pre className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200 dark:border-slate-700">
{`src/shared/i18n/
├── locales/
│   ├── fr.ts           # Traductions françaises
│   ├── en.ts           # Traductions anglaises
│   └── index.ts        # Export des langues
├── index.tsx           # Provider React + hook useTranslation
├── index.ts            # Exports publics
└── types.ts            # Types générés automatiquement`}
        </pre>

        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">Comment ça fonctionne ?</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Les traductions sont stockées dans des objets TypeScript (pas de JSON)</li>
            <li>Le script <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">parse:all</code> scanne tous les fichiers <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">.tsx</code></li>
            <li>Il détecte les appels <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">t("key")</code> et génère les types</li>
            <li>TypeScript vérifie que toutes les clés existent</li>
            <li>L'autocomplétion fonctionne dans votre IDE</li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">💡 Bonnes pratiques</h2>
        <div className="space-y-3">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
            <p className="font-semibold text-green-900 dark:text-green-200">✅ À faire :</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Organiser les clés par domaine : <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">auth.login</code>, <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">products.title</code></li>
              <li>• Utiliser des clés descriptives : <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">errors.invalidEmail</code></li>
              <li>• Lancer <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">parse:all</code> régulièrement</li>
              <li>• Vérifier les types TypeScript</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
            <p className="font-semibold text-red-900 dark:text-red-200">❌ À éviter :</p>
            <ul className="text-sm mt-2 space-y-1 text-slate-700 dark:text-slate-300">
              <li>• Hardcoder du texte au lieu d'utiliser <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">t()</code></li>
              <li>• Utiliser des clés génériques : <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">text1</code>, <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">label2</code></li>
              <li>• Modifier manuellement le fichier <code className="bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded">types.ts</code></li>
              <li>• Oublier de traduire dans toutes les langues</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
