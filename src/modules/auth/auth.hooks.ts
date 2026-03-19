import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'

import type { TMutationCallbacks } from '@/core/types'

import { queryKeys } from '@/modules/auth/auth.constants'
import type {
  TSignInSchema,
  TForgotPasswordSchema,
  TResetPasswordSchema,
  TUpdateProfileSchema,
  TChangePasswordSchema,
} from '@/modules/auth/auth.schemas'
import {
  signIn,
  signOut as signOutRequest,
  forgotPassword,
  resetPassword,
  getAuthUser,
  updateProfile,
  changePassword,
} from '@/modules/auth/auth.service'
import type { TSignInResponse, TCurrentUser } from '@/modules/auth/auth.types'

export const authQueryOptions = queryOptions({
  queryKey: queryKeys.auth,
  queryFn: getAuthUser,
})

export function useAuth() {
  return useSuspenseQuery(authQueryOptions)
}

export function useSignIn({ onSuccess, onError }: TMutationCallbacks<TSignInResponse>) {
  return useMutation({
    mutationFn: (body: TSignInSchema) => signIn(body),
    onSuccess,
    onError,
  })
}

export function useSignOut({ onSuccess, onError }: TMutationCallbacks) {
  return useMutation({
    mutationFn: signOutRequest,
    onSuccess,
    onError,
  })
}

export function useForgotPassword({ onSuccess, onError }: TMutationCallbacks) {
  return useMutation({
    mutationFn: (body: TForgotPasswordSchema) => forgotPassword(body),
    onSuccess,
    onError,
  })
}

export function useResetPassword({ onSuccess, onError }: TMutationCallbacks) {
  return useMutation({
    mutationFn: (body: TResetPasswordSchema) => resetPassword(body),
    onSuccess,
    onError,
  })
}

export function useUpdateProfile({ onSuccess, onError }: TMutationCallbacks<TCurrentUser>) {
  return useMutation({
    mutationFn: (body: TUpdateProfileSchema) => updateProfile(body),
    onSuccess,
    onError,
  })
}

export function useChangePassword({ onSuccess, onError }: TMutationCallbacks) {
  return useMutation({
    mutationFn: (body: TChangePasswordSchema) => changePassword(body),
    onSuccess,
    onError,
  })
}
