import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'

import type { TMutationCallbacks } from '@/core/types'

import { queryKeys } from '@/modules/roles/roles.constants'
import type { TCreateRoleSchema, TUpdateRoleSchema } from '@/modules/roles/roles.schemas'
import {
  getRoles,
  getRole,
  getRoleForEdit,
  createRole,
  updateRole,
  deleteRole,
  assignRoles,
  revokeRoles,
} from '@/modules/roles/roles.service'
import type { TRole, TRoleListItem } from '@/modules/roles/roles.types'

export const rolesQueryOptions = queryOptions({
  queryKey: queryKeys.list,
  queryFn: getRoles,
})

export const roleQueryOptions = (roleId: string) =>
  queryOptions({
    queryKey: queryKeys.detail(roleId),
    queryFn: () => getRole(roleId),
  })

export const roleEditQueryOptions = (roleId: string) =>
  queryOptions({
    queryKey: queryKeys.edit(roleId),
    queryFn: () => getRoleForEdit(roleId),
  })

export function useRoles() {
  return useSuspenseQuery(rolesQueryOptions)
}

export function useRole(roleId: string) {
  return useSuspenseQuery(roleQueryOptions(roleId))
}

export function useRoleForEdit(roleId: string) {
  return useSuspenseQuery(roleEditQueryOptions(roleId))
}

export function useCreateRole({ onSuccess, onError }: TMutationCallbacks<TRole>) {
  return useMutation({
    mutationFn: (body: TCreateRoleSchema) => createRole(body),
    onSuccess,
    onError,
  })
}

export function useUpdateRole(roleId: string, { onSuccess, onError }: TMutationCallbacks<TRole>) {
  return useMutation({
    mutationFn: (body: TUpdateRoleSchema) => updateRole(roleId, body),
    onSuccess,
    onError,
  })
}

export function useDeleteRole({ onSuccess, onError }: TMutationCallbacks<TRoleListItem>) {
  return useMutation({
    mutationFn: (role: TRoleListItem) => deleteRole(role.id).then(() => role),
    onSuccess,
    onError,
  })
}

export function useAssignRoles({ onSuccess, onError }: TMutationCallbacks) {
  return useMutation({
    mutationFn: ({ userId, roleIds }: { userId: string; roleIds: string[] }) =>
      assignRoles(userId, roleIds),
    onSuccess,
    onError,
  })
}

export function useRevokeRoles({ onSuccess, onError }: TMutationCallbacks) {
  return useMutation({
    mutationFn: ({ userId, roleIds }: { userId: string; roleIds: string[] }) =>
      revokeRoles(userId, roleIds),
    onSuccess,
    onError,
  })
}
