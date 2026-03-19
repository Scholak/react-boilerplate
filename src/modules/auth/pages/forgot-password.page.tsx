import { notification } from 'antd'

import { useForgotPassword } from '@/modules/auth/auth.hooks'
import type { TForgotPasswordSchema } from '@/modules/auth/auth.schemas'
import ForgotPasswordForm from '@/modules/auth/components/forgot-password-form'

const ForgotPasswordPage = () => {
  const mutation = useForgotPassword({
    onSuccess: () => {
      notification.success({
        message: 'Bağlantı gönderildi',
        description: 'E-posta adresiniz kayıtlıysa şifre sıfırlama bağlantısı gönderildi.',
      })
    },
    onError: () => {
      notification.error({
        message: 'Bir hata oluştu',
        description: 'İşlem gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.',
      })
    },
  })

  const onForgotPassword = async (values: TForgotPasswordSchema) =>
    await mutation.mutateAsync(values)

  return <ForgotPasswordForm onForgotPassword={onForgotPassword} isPending={mutation.isPending} />
}

export default ForgotPasswordPage
