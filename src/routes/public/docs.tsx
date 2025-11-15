import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { ArchitectureDoc, I18nDoc, RoutingDoc, GettingStartedDoc } from "@/features/docs"

type DocSection = "architecture" | "i18n" | "routing" | "getting-started"

export default function Docs() {
  const [activeSection, setActiveSection] = useState<DocSection>("architecture")

  const sections = [
    { id: "architecture" as const, title: "Architecture", icon: "🏗️" },
    { id: "i18n" as const, title: "Internationalisation", icon: "🌍" },
    { id: "routing" as const, title: "Routage", icon: "🚦" },
    { id: "getting-started" as const, title: "Démarrage", icon: "🚀" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header fixe */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 fixed top-0 left-0 right-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
              <span>←</span>
              <span>Accueil</span>
            </Link>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              📚 Documentation
            </h1>
          </div>
        </div>
      </header>

      {/* Layout avec sidebar fixe */}
      <div className="flex pt-[73px]">
        {/* Sidebar fixe */}
        <aside className="fixed left-0 top-[73px] bottom-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto hidden lg:block">
          <nav className="p-6">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-4 tracking-wide">
              Sections
            </h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <span className="mr-3 text-lg">{section.icon}</span>
                    <span>{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Contenu principal avec margin pour la sidebar */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Menu mobile */}
            <div className="lg:hidden mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value as DocSection)}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.icon} {section.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Contenu de la doc */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 lg:p-8 shadow-sm">
              {activeSection === "architecture" && <ArchitectureDoc />}
              {activeSection === "i18n" && <I18nDoc />}
              {activeSection === "routing" && <RoutingDoc />}
              {activeSection === "getting-started" && <GettingStartedDoc />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
