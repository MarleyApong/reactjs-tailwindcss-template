import { useTranslation } from "@/shared/i18n"

export default function Dashboard() {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t("dashboard.title")}</h1>
    </div>
  )
}
