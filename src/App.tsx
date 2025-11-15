import { RouterProvider, createRouter } from "@tanstack/react-router"
import "./App.css"
import { routeTree } from "@/router"
import { I18nProvider } from "./shared/i18n"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  )
}

export default App
