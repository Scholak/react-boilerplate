import { useNavigate } from '@tanstack/react-router'
import { notification } from 'antd'

import { authNotifications } from '@/modules/auth/auth.constants'
import { useResetPassword } from '@/modules/auth/auth.hooks'
import { resetPasswordRoute } from '@/modules/auth/auth.routes'
import type { TResetPasswordSchema } from '@/modules/auth/auth.schemas'
import ResetPasswordForm from '@/modules/auth/components/reset-password-form'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const { token } = resetPasswordRoute.useSearch()

  const mutation = useResetPassword({
    onSuccess: async () => {
      notification.success(authNotifications.resetPasswordSuccess)
      await navigate({ to: '/sign-in' })
    },
    onError: () => {
      notification.error(authNotifications.resetPasswordError)
    },
  })

  const onResetPassword = async (values: TResetPasswordSchema) => await mutation.mutateAsync(values)

  return (
    <ResetPasswordForm
      token={token}
      onResetPassword={onResetPassword}
      isPending={mutation.isPending}
    />
  )
}

export default ResetPasswordPage
