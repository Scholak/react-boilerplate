import { createRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import { queryClient } from '@/core/lib/query-client'
import { dashboardLayoutRoute } from '@/core/route-parents'

import { rolesQueryOptions } from '@/modules/roles/roles.hooks'
import {
  usersQueryOptions,
  userQueryOptions,
  userEditQueryOptions,
  userRolesQueryOptions,
} from '@/modules/users/users.hooks'

const ListUsersPage = lazy(() => import('@/modules/users/pages/list-users.page'))

const CreateUserPage = lazy(() => import('@/modules/users/pages/create-user.page'))

const EditUserPage = lazy(() => import('@/modules/users/pages/edit-user.page'))

const UserDetailPage = lazy(() => import('@/modules/users/pages/user-detail.page'))

const AssignRolesPage = lazy(() => import('@/modules/users/pages/assign-roles.page'))

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
  component: () => {
    const { userId } = usersDetailRoute.useParams()
    return <UserDetailPage userId={userId} />
  },
})

const usersEditRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/users/$userId/edit',
  loader: async ({ params }: { params: { userId: string } }) => {
    await queryClient.ensureQueryData(userEditQueryOptions(params.userId))
  },
  component: EditUserPage,
})

const usersAssignRolesRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/users/$userId/roles',
  loader: async ({ params }: { params: { userId: string } }) => {
    await Promise.all([
      queryClient.ensureQueryData(userRolesQueryOptions(params.userId)),
      queryClient.ensureQueryData(rolesQueryOptions),
    ])
  },
  component: AssignRolesPage,
})

export const usersRoutes = [
  usersRoute,
  usersCreateRoute,
  usersDetailRoute,
  usersEditRoute,
  usersAssignRolesRoute,
] as const
