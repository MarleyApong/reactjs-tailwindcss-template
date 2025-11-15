/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import {
  DEFAULT_LANGUAGE,
  supportedLanguages,
  translations,
  type SupportedLanguage,
} from "./locales"
import type { TranslationKey, TranslationKeys } from "./types"

// Clé de stockage pour la langue préférée
const LANGUAGE_STORAGE_KEY = "lang"

interface I18nContextType {
  currentLanguage: SupportedLanguage
  changeLanguage: (language: SupportedLanguage) => void
  t: (key: TranslationKey) => string
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSavedLanguage()
  }, [])

  const loadSavedLanguage = () => {
    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (savedLanguage && savedLanguage in supportedLanguages) {
        setCurrentLanguage(savedLanguage as SupportedLanguage)
      }
    } catch (error) {
      console.warn("Erreur lors du chargement de la langue:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const changeLanguage = (language: SupportedLanguage) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
      setCurrentLanguage(language)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la langue:", error)
    }
  }

  const t = (key: TranslationKey): string => {
    const keys = String(key).split(".")
    let value: string | Record<string, unknown> = translations[currentLanguage]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k] as string | Record<string, unknown>
      } else {
        if (import.meta.env.MODE === "development") {
          console.error(`❌ Translation key not found: "${key}" for language "${currentLanguage}"`)
        }
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <I18nContext.Provider value={{ currentLanguage, changeLanguage, t, isLoading }}>
      {children}
    </I18nContext.Provider>
  )
}

// Hook principal
export const useTranslation = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within I18nProvider. Use useSimpleTranslation instead if you need a fallback.')
  }
  return context
}

// Hook fallback sans provider (utile pour tests, storybook, etc.)
export const useSimpleTranslation = () => {
  const t = (key: TranslationKey): string => {
    const keys = String(key).split(".")
    let value: string | Record<string, unknown> = translations.fr

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k] as string | Record<string, unknown>
      } else {
        if (import.meta.env.MODE === "development") {
          console.error(`❌ Translation key not found: "${key}" at part "${k}"`)
        }
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return { t }
}

// Vérifier si une clé existe
export const hasTranslation = (
  key: string,
  language: SupportedLanguage = DEFAULT_LANGUAGE,
): key is TranslationKey => {
  const keys = String(key).split(".")
  let value: string | Record<string, unknown> = translations[language]

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k] as string | Record<string, unknown>
    } else {
      return false
    }
  }

  return typeof value === "string"
}

// Exports utiles
export { DEFAULT_LANGUAGE, supportedLanguages, translations }
export type { SupportedLanguage, TranslationKey, TranslationKeys }
