import { useNavigate } from '@tanstack/react-router'
import { notification } from 'antd'

import { queryClient, ACCESS_TOKEN_KEY } from '@/core/lib/query-client'

import { useSignIn } from '@/modules/auth/auth.hooks'
import type { TSignInSchema } from '@/modules/auth/auth.schemas'
import SignInForm from '@/modules/auth/components/sign-in-form'

const SignInPage = () => {
  const navigate = useNavigate()

  const mutation = useSignIn({
    onSuccess: async (data) => {
      queryClient.setQueryData(ACCESS_TOKEN_KEY, data.accessToken)
      notification.success({
        message: 'Giriş başarılı!',
        description: `Sizi yeniden görmek çok güzel ${data.user.firstName} ${data.user.lastName}.`,
      })
      await navigate({ to: '/users' })
    },
    onError: () => {
      notification.error({
        message: 'Giriş başarısız',
        description: 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.',
      })
    },
  })

  const onSignIn = async (values: TSignInSchema) => await mutation.mutateAsync(values)

  return <SignInForm onSignIn={onSignIn} isPending={mutation.isPending} />
}

export default SignInPage
