import { notification } from 'antd'
import { useNavigate } from '@tanstack/react-router'
import { useSignIn } from '@/modules/auth/auth.hooks'
import { SignInForm } from '@/modules/auth/components/sign-in-form'
import { queryClient, ACCESS_TOKEN_KEY } from '@/core/lib/query-client'
import { queryKeys } from '@/modules/auth/auth.constants'
import type { TSignInSchema } from '@/modules/auth/auth.schemas'

export function SignInPage() {
  const navigate = useNavigate()

  const mutation = useSignIn({
    onSuccess: async (data) => {
      queryClient.setQueryData(ACCESS_TOKEN_KEY, data.accessToken)
      queryClient.setQueryData(queryKeys.auth, data.user)
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
