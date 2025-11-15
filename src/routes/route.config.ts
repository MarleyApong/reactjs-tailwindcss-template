/**
 * Clef = `${group}/${fileName}` (sans l'extension .tsx)
 * Exemple : 'protected/dashboard' => route dans protected/dashboard.tsx
 * 
 * 🎯 RÈGLES DES PATHS :
 * 
 * 1. **Path RELATIF** (sans "/" au début) : 
 *    → Ajouté au basePath du groupe
 *    Exemple : "auth/login": { path: "login" } → URL finale : /auth/login
 * 
 * 2. **Path ABSOLU** (avec "/" au début) :
 *    → Priorité absolue, ignore le basePath du groupe
 *    Exemple : "auth/login": { path: "/login" } → URL finale : /login (pas /auth/login)
 * 
 * 3. **Path "/"** : Route index du groupe
 * 
 * 🔧 PROPRIÉTÉ `override` :
 * - `false` (défaut) : Utilise la structure de fichiers (path ignoré si non absolu)
 * - `true` : Force l'utilisation du path personnalisé défini ici
 * 
 * ⚠️ Ce fichier est AUTO-GÉNÉRÉ mais vos modifications sont préservées !
 * - Nouvelles routes → ajoutées automatiquement avec override: false
 * - Routes supprimées → retirées automatiquement
 * - Vos overrides → toujours préservés
 * 
 * ⚠️ ATTENTION : Si vous supprimez ce fichier, il sera recréé automatiquement
 *    mais TOUTES vos modifications personnalisées seront perdues !
 * 
 * 💡 NOTE : Les modifications de ce fichier nécessitent un redémarrage du serveur
 *    pour être prises en compte (Ctrl+C puis `npm run dev`)
 */
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
  // ------------------------------
  // Routes publiques (basePath: "/")
  // ------------------------------
  "public/home": { path: "/", override: false },

  // ------------------------------
  // Routes d'authentification (basePath: "/auth")
  // ------------------------------
  "auth/hello": { path: "hello", override: false },
  "auth/login": { path: "mui", override: true },
  "auth/register": { path: "register", override: false },

  // ------------------------------
  // Routes protégées (basePath: "/app")
  // ------------------------------
  "protected/dashboard": { path: "dashboard", override: false },
  "protected/me": { path: "me", override: false },
  "protected/profile": { path: "profile", override: false },
  "protected/settings": { path: "settings", override: false },

  // Exemples d'overrides personnalisés :
  // "protected/settings": { path: "mon-compte/parametres", override: true }, // → /app/mon-compte/parametres
  // "public/about": { path: "/a-propos", override: true }, // → /a-propos (absolu)
}
