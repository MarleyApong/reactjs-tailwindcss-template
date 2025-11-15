// === AUTO-GENERATED ROUTES START ===

import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/routes/root'
import Home from './home'

export const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_public',
})

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// === AUTO-GENERATED ROUTES END ===

