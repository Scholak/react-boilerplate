import { createRootRoute, createRoute, redirect, Outlet } from '@tanstack/react-router'
import { AuthLayout } from '@/core/layouts/auth-layout'
import { DashboardLayout } from '@/core/layouts/dashboard-layout'
import { authQueryOptions } from '@/modules/auth/auth.hooks'
import { queryClient } from '@/core/lib/query-client'

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
})

export const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'dashboard',
  component: DashboardLayout,
  beforeLoad: async () => {
    try {
      await queryClient.ensureQueryData(authQueryOptions)
    } catch {
      throw redirect({ to: '/sign-in' })
    }
  },
})

export const indexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/users' })
  },
})
