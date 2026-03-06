// === AUTO-GENERATED ROUTES START ===

import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root'
import Docs from './docs'
import Home from './home'

export const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_public',
})
export const publicDocsRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/docs',
  component: Docs,
})
export const publicHomeRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: Home,
})

// === AUTO-GENERATED ROUTES END ===
