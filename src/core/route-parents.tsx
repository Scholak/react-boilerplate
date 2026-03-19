import { createRootRoute, createRoute, redirect, Outlet } from '@tanstack/react-router'

import AuthLayout from '@/core/layouts/auth-layout'
import DashboardLayout from '@/core/layouts/dashboard-layout'
import { queryClient } from '@/core/lib/query-client'

import { authQueryOptions } from '@/modules/auth/auth.hooks'

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
  beforeLoad: () => {
    const isSignedOut = new URLSearchParams(window.location.search).get('isSignedOut')
    if (isSignedOut) return
    const user = queryClient.getQueryData(authQueryOptions.queryKey)
    if (user) throw redirect({ to: '/' })
  },
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
