import { createRouter } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root'
import { publicRoute, homeRoute } from '@/routes/public'
import { authRoute, helloRoute, loginRoute, registerRoute } from '@/routes/auth'
import { protectedRoute, dashboardRoute, meRoute, profileRoute, settingsRoute } from '@/routes/protected'

export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([homeRoute]),
  authRoute.addChildren([helloRoute, loginRoute, registerRoute]),
  protectedRoute.addChildren([dashboardRoute, meRoute, profileRoute, settingsRoute])
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
