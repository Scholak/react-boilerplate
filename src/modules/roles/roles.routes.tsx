import { createRoute } from '@tanstack/react-router'
import { lazy } from 'react'

import { queryClient } from '@/core/lib/query-client'
import { dashboardLayoutRoute } from '@/core/route-parents'

import { rolesQueryOptions, roleQueryOptions, roleEditQueryOptions } from '@/modules/roles/roles.hooks'


const ListRolesPage = lazy(() => import('@/modules/roles/pages/list-roles.page'))

const CreateRolePage = lazy(() => import('@/modules/roles/pages/create-role.page'))

const RoleDetailPage = lazy(() => import('@/modules/roles/pages/role-detail.page'))

const EditRolePage = lazy(() => import('@/modules/roles/pages/edit-role.page'))

const rolesRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/roles',
  loader: async () => {
    await queryClient.ensureQueryData(rolesQueryOptions)
  },
  component: ListRolesPage,
})

const rolesCreateRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/roles/create',
  component: CreateRolePage,
})

const rolesDetailRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/roles/$roleId',
  loader: async ({ params }: { params: { roleId: string } }) => {
    await queryClient.ensureQueryData(roleQueryOptions(params.roleId))
  },
  component: RoleDetailPage,
})

const rolesEditRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/roles/$roleId/edit',
  loader: async ({ params }: { params: { roleId: string } }) => {
    await queryClient.ensureQueryData(roleEditQueryOptions(params.roleId))
  },
  component: EditRolePage,
})

export const rolesRoutes = [rolesRoute, rolesCreateRoute, rolesDetailRoute, rolesEditRoute] as const
