import { api } from '@/core/lib/api'
import { endpoints } from '@/modules/auth/auth.constants'
import type {
  TSignInSchema,
  TForgotPasswordSchema,
  TResetPasswordSchema,
  TUpdateProfileSchema,
  TChangePasswordSchema,
} from '@/modules/auth/auth.schemas'
import type { TSignInResponse, TCurrentUser } from '@/modules/auth/auth.types'

export const signIn = async (body: TSignInSchema): Promise<TSignInResponse> => {
  const { data } = await api.post(endpoints.signIn, body)
  return data.data
}

export const forgotPassword = async (body: TForgotPasswordSchema): Promise<void> => {
  await api.post(endpoints.forgotPassword, body)
}

export const resetPassword = async (body: TResetPasswordSchema): Promise<void> => {
  await api.post(endpoints.resetPassword, body)
}

export const getToken = async (): Promise<{ accessToken: string }> => {
  const { data } = await api.get(endpoints.getToken)
  return data.data
}

export const getAuthUser = async (): Promise<TCurrentUser> => {
  const { data } = await api.get(endpoints.me)
  return data.data
}

export const updateProfile = async (body: TUpdateProfileSchema): Promise<TCurrentUser> => {
  const { data } = await api.put(endpoints.updateProfile, body)
  return data.data
}

export const changePassword = async (body: TChangePasswordSchema): Promise<void> => {
  await api.put(endpoints.changePassword, body)
}
