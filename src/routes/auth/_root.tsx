// === AUTO-GENERATED ROUTES START ===

import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root'
import Hello from './hello'
import Login from './login'
import Register from './register'

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
})
export const authHelloRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/hello',
  component: Hello,
})
export const authLoginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  component: Login,
})
export const authRegisterRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/register',
  component: Register,
})

// === AUTO-GENERATED ROUTES END ===
