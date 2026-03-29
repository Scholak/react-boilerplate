import { notification } from 'antd'

import { authNotifications } from '@/modules/auth/auth.constants'
import { useForgotPassword } from '@/modules/auth/auth.hooks'
import type { TForgotPasswordSchema } from '@/modules/auth/auth.schemas'
import ForgotPasswordForm from '@/modules/auth/components/forgot-password-form'

const ForgotPasswordPage = () => {
  const mutation = useForgotPassword({
    onSuccess: () => {
      notification.success(authNotifications.forgotPasswordSuccess)
    },
    onError: () => {
      notification.error(authNotifications.forgotPasswordError)
    },
  })

  const onForgotPassword = async (values: TForgotPasswordSchema) =>
    await mutation.mutateAsync(values)

  return <ForgotPasswordForm onForgotPassword={onForgotPassword} isPending={mutation.isPending} />
}

export default ForgotPasswordPage
