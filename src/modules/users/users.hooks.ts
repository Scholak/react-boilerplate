import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'

import type { TMutationCallbacks } from '@/core/types'

import { queryKeys } from '@/modules/users/users.constants'
import type { TCreateUserSchema, TUpdateUserSchema } from '@/modules/users/users.schemas'
import {
  getUsers,
  getUser,
  getUserForEdit,
  createUser,
  updateUser,
  deleteUser,
} from '@/modules/users/users.service'
import type { TUser } from '@/modules/users/users.types'

export const usersQueryOptions = queryOptions({
  queryKey: queryKeys.list,
  queryFn: getUsers,
})

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: queryKeys.detail(userId),
    queryFn: () => getUser(userId),
  })

export const userEditQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: queryKeys.edit(userId),
    queryFn: () => getUserForEdit(userId),
  })

export function useUsers() {
  return useSuspenseQuery(usersQueryOptions)
}

export function useUser(userId: string) {
  return useSuspenseQuery(userQueryOptions(userId))
}

export function useUserForEdit(userId: string) {
  return useSuspenseQuery(userEditQueryOptions(userId))
}

export function useCreateUser({ onSuccess, onError }: TMutationCallbacks<TUser>) {
  return useMutation({
    mutationFn: (body: TCreateUserSchema) => createUser(body),
    onSuccess,
    onError,
  })
}

export function useUpdateUser(userId: string, { onSuccess, onError }: TMutationCallbacks<TUser>) {
  return useMutation({
    mutationFn: (body: TUpdateUserSchema) => updateUser(userId, body),
    onSuccess,
    onError,
  })
}

export function useDeleteUser({ onSuccess, onError }: TMutationCallbacks<TUser>) {
  return useMutation({
    mutationFn: (user: TUser) => deleteUser(user.id).then(() => user),
    onSuccess,
    onError,
  })
}
