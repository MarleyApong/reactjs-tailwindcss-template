// === AUTO-GENERATED ROUTES START ===

import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root'
import Dashboard from './dashboard'
import Me from './me'
import Profile from './profile'
import Settings from './settings'

export const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
})
export const protectedDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: Dashboard,
})
export const protectedMeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/me',
  component: Me,
})
export const protectedProfileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/profile',
  component: Profile,
})
export const protectedSettingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/settings',
  component: Settings,
})

// === AUTO-GENERATED ROUTES END ===
