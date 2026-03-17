import { lazy } from 'react'
import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '@/core/route-parents'
import { usersQueryOptions, userQueryOptions } from '@/modules/users/users.hooks'
import { queryClient } from '@/core/lib/query-client'

const ListUsersPage = lazy(() =>
  import('@/modules/users/pages/list-users.page').then((m) => ({ default: m.ListUsersPage })),
)

const CreateUserPage = lazy(() =>
  import('@/modules/users/pages/create-user.page').then((m) => ({ default: m.CreateUserPage })),
)

const EditUserPage = lazy(() =>
  import('@/modules/users/pages/edit-user.page').then((m) => ({ default: m.EditUserPage })),
)

const UserDetailPage = lazy(() =>
  import('@/modules/users/pages/user-detail.page').then((m) => ({ default: m.UserDetailPage })),
)

const usersRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/users',
  loader: async () => {
    await queryClient.ensureQueryData(usersQueryOptions)
  },
  component: ListUsersPage,
})

const usersCreateRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/users/create',
  component: CreateUserPage,
})

const usersDetailRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/users/$userId',
  loader: async ({ params }: { params: { userId: string } }) => {
    await queryClient.ensureQueryData(userQueryOptions(params.userId))
  },
  component: function UserDetailWrapper() {
    const { userId } = usersDetailRoute.useParams()
    return <UserDetailPage userId={userId} />
  },
})

const usersEditRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/users/$userId/edit',
  loader: async ({ params }: { params: { userId: string } }) => {
    await queryClient.ensureQueryData(userQueryOptions(params.userId))
  },
  component: function UserEditWrapper() {
    const { userId } = usersEditRoute.useParams()
    return <EditUserPage userId={userId} />
  },
})

export const usersRoutes = [usersRoute, usersCreateRoute, usersDetailRoute, usersEditRoute] as const
