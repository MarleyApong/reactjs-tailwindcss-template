import { Link } from "@tanstack/react-router"
import { useTranslation } from "@/shared/i18n/index.tsx"

export default function Home() {
  const { t, currentLanguage, changeLanguage } = useTranslation()

  const features = [
    {
      icon: "⚡",
      title: t("home.features.vite.title"),
      desc: t("home.features.vite.desc"),
    },
    {
      icon: "🎨",
      title: t("home.features.tailwind.title"),
      desc: t("home.features.tailwind.desc"),
    },
    {
      icon: "🚦",
      title: t("home.features.router.title"),
      desc: t("home.features.router.desc"),
    },
    {
      icon: "🌍",
      title: t("home.features.i18n.title"),
      desc: t("home.features.i18n.desc"),
    },
    {
      icon: "📝",
      title: t("home.features.typescript.title"),
      desc: t("home.features.typescript.desc"),
    },
    {
      icon: "🎯",
      title: t("home.features.ready.title"),
      desc: t("home.features.ready.desc"),
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              RT
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">
              {t("home.title")}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => changeLanguage("fr")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                currentLanguage === "fr"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/50 text-slate-600 hover:bg-white dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              🇫🇷 FR
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                currentLanguage === "en"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/50 text-slate-600 hover:bg-white dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              🇺🇸 EN
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
            {t("home.hero.badge")}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
          {t("home.hero.title")}
          <br />
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("home.hero.subtitle")}
          </span>
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          {t("home.hero.description")}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/app/dashboard"
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            {t("home.cta.start")} →
          </Link>
          <Link
            to="/docs"
            className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all border border-slate-200 dark:border-slate-700"
          >
            📚 Documentation
          </Link>
          <Link
            to="/auth/mui"
            className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all border border-slate-200 dark:border-slate-700"
          >
            {t("home.cta.login")}
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 flex gap-6 justify-center items-center flex-wrap text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚛️</span>
            <span className="font-medium">React 19</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-medium">Vite</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <span className="font-medium">TailwindCSS 4</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <span className="font-medium">TypeScript</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          {t("home.features.title")}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all hover:scale-105 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
        <p>
          {t("home.footer.made")} ❤️ {t("home.footer.by")}
        </p>
        <p className="mt-2 text-sm">{t("home.footer.ready")}</p>
      </footer>
    </div>
  )
}
