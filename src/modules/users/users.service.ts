import { api } from '@/core/lib/api'
import { endpoints } from '@/modules/users/users.constants'
import type { TCreateUserSchema, TUpdateUserSchema } from '@/modules/users/users.schemas'
import type { TUser } from '@/modules/users/users.types'

export const getUsers = async (): Promise<TUser[]> => {
  const { data } = await api.get(endpoints.list)
  return data.data
}

export const getUser = async (userId: string): Promise<TUser> => {
  const { data } = await api.get(endpoints.getOne(userId))
  return data.data
}

export const createUser = async (body: TCreateUserSchema): Promise<TUser> => {
  const { data } = await api.post(endpoints.create, body)
  return data.data
}

export const updateUser = async (userId: string, body: TUpdateUserSchema): Promise<TUser> => {
  const { data } = await api.put(endpoints.update(userId), body)
  return data.data
}

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(endpoints.remove(userId))
}
