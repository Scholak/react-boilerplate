import { useNavigate } from '@tanstack/react-router'
import { notification } from 'antd'

import { useResetPassword } from '@/modules/auth/auth.hooks'
import { resetPasswordRoute } from '@/modules/auth/auth.routes'
import type { TResetPasswordSchema } from '@/modules/auth/auth.schemas'
import ResetPasswordForm from '@/modules/auth/components/reset-password-form'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const { token } = resetPasswordRoute.useSearch()

  const mutation = useResetPassword({
    onSuccess: async () => {
      notification.success({
        message: 'Şifre güncellendi',
        description: 'Şifreniz başarıyla sıfırlandı. Artık giriş yapabilirsiniz.',
      })
      await navigate({ to: '/sign-in' })
    },
    onError: () => {
      notification.error({
        message: 'Geçersiz bağlantı',
        description: 'Sıfırlama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeniden talep edin.',
      })
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
