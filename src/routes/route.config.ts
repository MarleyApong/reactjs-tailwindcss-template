/**
 * Route configuration — auto-generated with preservation of manual changes
 *
 * Key format: `${group}/${fileName}` (without .tsx extension)
 * Example: 'protected/dashboard' → route in protected/dashboard.tsx
 *
 * 🎯 PATH RULES:
 *
 * 1. RELATIVE path (no leading "/"):
 *    → Appended to the group basePath
 *    Example: "auth/login": { path: "login" } → final URL: /auth/login
 *
 * 2. ABSOLUTE path (with leading "/"):
 *    → Takes priority, ignores the group basePath
 *    Example: "auth/login": { path: "/login" } → final URL: /login (not /auth/login)
 *
 * 3. Path "/": index route of the group
 *
 * 🔧 `override` PROPERTY:
 * - `false` (default): uses the file structure (path ignored unless absolute)
 * - `true`: forces the use of the custom path defined here
 *
 * ⚠️ This file is AUTO-GENERATED but your changes are preserved!
 * - New routes → added automatically with override: false
 * - Deleted routes → removed automatically
 * - Your overrides → always preserved
 *
 * ⚠️ WARNING: If you delete this file, it will be recreated automatically
 *    but ALL your custom changes will be lost!
 *
 * 💡 NOTE: Changes to this file require a server restart to take effect
 *    (Ctrl+C then `npm run dev`)
 */
export const routeConfig: Record<string, { path?: string; override?: boolean }> = {
  // Public routes (basePath: "/")
  "public/home": { path: "/", override: true },
  "public/docs": { path: "docs", override: false },

  // Auth routes (basePath: "/auth")
  "auth/hello": { path: "hello", override: false },
  "auth/login": { path: "login", override: false },
  "auth/register": { path: "register", override: false },

  // Protected routes (basePath: "/app")
  "protected/dashboard": { path: "dashboard", override: false },
  "protected/me": { path: "me", override: false },
  "protected/profile": { path: "profile", override: false },
  "protected/settings": { path: "settings", override: false },
}
