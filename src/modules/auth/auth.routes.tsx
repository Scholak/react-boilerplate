import { lazy } from 'react'
import { createRoute } from '@tanstack/react-router'
import { authLayoutRoute, dashboardLayoutRoute } from '@/core/route-parents'

const SignInPage = lazy(() =>
  import('@/modules/auth/pages/sign-in.page').then((m) => ({ default: m.SignInPage })),
)

const ForgotPasswordPage = lazy(() =>
  import('@/modules/auth/pages/forgot-password.page').then((m) => ({
    default: m.ForgotPasswordPage,
  })),
)

const ResetPasswordPage = lazy(() =>
  import('@/modules/auth/pages/reset-password.page').then((m) => ({
    default: m.ResetPasswordPage,
  })),
)

const ProfilePage = lazy(() =>
  import('@/modules/auth/pages/profile.page').then((m) => ({ default: m.ProfilePage })),
)

const signInRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/sign-in',
  component: SignInPage,
})

const forgotPasswordRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
})

export const resetPasswordRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/reset-password',
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === 'string' ? search.token : '',
  }),
  component: ResetPasswordPage,
})

const profileRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/profile',
  component: ProfilePage,
})

export const authPublicRoutes = [signInRoute, forgotPasswordRoute, resetPasswordRoute] as const
export const authProtectedRoutes = [profileRoute] as const
