/**
 * Script de test pour démontrer la type-safety du système i18n
 * Ce fichier est un exemple et n'est pas utilisé dans l'application
 * 
 * Exemple d'utilisation du système de traduction (à utiliser dans un composant React):
 * 
 * import { useTranslation } from '@/shared/i18n';
 * 
 * export function TestTranslationsComponent() {
 *   const { t } = useTranslation();
 * 
 *   return (
 *     <div>
 *       // ✅ Clés valides - pas d'erreur TypeScript
 *       <p>{t("auth.login.email")}</p>
 *       <p>{t("auth.login.password")}</p>
 *       <p>{t("common.error")}</p>
 * 
 *       // ❌ Clés invalides - erreurs TypeScript
 *       // <p>{t("auth.login.invalidKey")}</p>
 *       // <p>{t("nonexistent.key")}</p>
 *       // <p>{t("auth.register.fakeField")}</p>
 *     </div>
 *   );
 * }
 */

export const testTranslationsExample = "Voir les exemples dans les commentaires JSDoc ci-dessus"
