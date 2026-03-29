import { useNavigate } from '@tanstack/react-router'
import { notification } from 'antd'

import { queryClient, ACCESS_TOKEN_KEY } from '@/core/lib/query-client'

import { authNotifications } from '@/modules/auth/auth.constants'
import { useSignIn } from '@/modules/auth/auth.hooks'
import type { TSignInSchema } from '@/modules/auth/auth.schemas'
import SignInForm from '@/modules/auth/components/sign-in-form'

const SignInPage = () => {
  const navigate = useNavigate()

  const mutation = useSignIn({
    onSuccess: async (data) => {
      queryClient.setQueryData(ACCESS_TOKEN_KEY, data.accessToken)
      notification.success(authNotifications.signInSuccess)
      await navigate({ to: '/users' })
    },
    onError: () => {
      notification.error(authNotifications.signInError)
    },
  })

  const onSignIn = async (values: TSignInSchema) => await mutation.mutateAsync(values)

  return <SignInForm onSignIn={onSignIn} isPending={mutation.isPending} />
}

export default SignInPage
