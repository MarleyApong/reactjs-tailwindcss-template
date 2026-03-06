import { createRouter } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root'
import { publicRoute, publicDocsRoute, publicHomeRoute } from '@/routes/public/_root'
import { authRoute, authHelloRoute, authLoginRoute, authRegisterRoute } from '@/routes/auth/_root'
import { protectedRoute, protectedDashboardRoute, protectedMeRoute, protectedProfileRoute, protectedSettingsRoute } from '@/routes/protected/_root'

export const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([publicDocsRoute, publicHomeRoute]),
  authRoute.addChildren([authHelloRoute, authLoginRoute, authRegisterRoute]),
  protectedRoute.addChildren([protectedDashboardRoute, protectedMeRoute, protectedProfileRoute, protectedSettingsRoute])
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
