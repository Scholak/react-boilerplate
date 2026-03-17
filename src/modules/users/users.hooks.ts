import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '@/modules/users/users.service'
import { queryKeys } from '@/modules/users/users.constants'
import type { TMutationCallbacks } from '@/core/types'
import type { TUser } from '@/modules/users/users.types'
import type { TCreateUserSchema, TUpdateUserSchema } from '@/modules/users/users.schemas'

export const usersQueryOptions = queryOptions({
  queryKey: queryKeys.list,
  queryFn: getUsers,
})

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: queryKeys.detail(userId),
    queryFn: () => getUser(userId),
  })

export function useUsers() {
  return useSuspenseQuery(usersQueryOptions)
}

export function useUser(userId: string) {
  return useSuspenseQuery(userQueryOptions(userId))
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
