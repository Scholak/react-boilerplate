import { api } from '@/core/lib/api'

import { endpoints } from '@/modules/roles/roles.constants'
import type { TCreateRoleSchema, TUpdateRoleSchema } from '@/modules/roles/roles.schemas'
import type { TRole } from '@/modules/roles/roles.types'

export const getRoles = async (): Promise<TRole[]> => {
  const { data } = await api.get(endpoints.list)
  return data.data
}

export const getRole = async (roleId: string): Promise<TRole> => {
  const { data } = await api.get(endpoints.getOne(roleId))
  return data.data
}

export const getRoleForEdit = async (roleId: string): Promise<TRole> => {
  const { data } = await api.get(endpoints.getOneForEdit(roleId))
  return data.data
}

export const createRole = async (body: TCreateRoleSchema): Promise<TRole> => {
  const { data } = await api.post(endpoints.create, body)
  return data.data
}

export const updateRole = async (roleId: string, body: TUpdateRoleSchema): Promise<TRole> => {
  const { data } = await api.put(endpoints.update(roleId), body)
  return data.data
}

export const deleteRole = async (roleId: string): Promise<void> => {
  await api.delete(endpoints.remove(roleId))
}

export const assignRoles = async (userId: string, roleIds: string[]): Promise<void> => {
  await api.post(endpoints.assignRoles(userId), { roleIds })
}

export const revokeRoles = async (userId: string, roleIds: string[]): Promise<void> => {
  await api.delete(endpoints.revokeRoles(userId), { data: { roleIds } })
}
