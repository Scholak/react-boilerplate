import { createRouter } from '@tanstack/react-router'

import { rootRoute, authLayoutRoute, dashboardLayoutRoute, indexRoute } from '@/core/route-parents'

import { authPublicRoutes, authProtectedRoutes } from '@/modules/auth/auth.routes'
import { rolesRoutes } from '@/modules/roles/roles.routes'
import { usersRoutes } from '@/modules/users/users.routes'
import NotFoundPage from '@/core/pages/not-found.page'
import ErrorPage from '@/core/pages/error.page'

const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([...authPublicRoutes]),
  dashboardLayoutRoute.addChildren([
    indexRoute,
    ...authProtectedRoutes,
    ...usersRoutes,
    ...rolesRoutes,
  ]),
])

export const router = createRouter({
  routeTree,
  context: { queryClient: undefined! },
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ({ error }) => <ErrorPage error={error} />,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
