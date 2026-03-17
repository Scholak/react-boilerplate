import { createRootRoute, createRoute, redirect, Outlet } from '@tanstack/react-router'
import { AuthLayout } from '@/core/layouts/auth-layout'
import { DashboardLayout } from '@/core/layouts/dashboard-layout'
import { authQueryOptions } from '@/modules/auth/auth.hooks'
import { queryClient, ACCESS_TOKEN_KEY } from '@/core/lib/query-client'
import { getToken } from '@/modules/auth/auth.service'

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
      try {
        const { accessToken } = await getToken()
        queryClient.setQueryData(ACCESS_TOKEN_KEY, accessToken)
        await queryClient.ensureQueryData(authQueryOptions)
      } catch {
        throw redirect({ to: '/sign-in' })
      }
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
