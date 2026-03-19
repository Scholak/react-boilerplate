import { ArrowLeftOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Button, Input, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import { forgotPasswordSchema, type TForgotPasswordSchema } from '@/modules/auth/auth.schemas'

const { Title, Text } = Typography

type TForgotPasswordFormProps = {
  onForgotPassword: (values: TForgotPasswordSchema) => Promise<void>
  isPending: boolean
}

const ForgotPasswordForm = ({ onForgotPassword, isPending }: TForgotPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForgotPasswordSchema>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = async (values: TForgotPasswordSchema) => {
    await onForgotPassword(values)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-6">
        <Title level={4} style={{ marginBottom: 4 }}>
          Şifrenizi mi unuttunuz?
        </Title>
        <Text type="secondary">
          E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim.
        </Text>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">E-posta</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="siz@ornek.com"
              status={errors.email ? 'error' : ''}
              size="large"
            />
          )}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
        Sıfırlama Bağlantısı Gönder
      </Button>

      <div className="text-center">
        <Link
          to="/sign-in"
          className="text-sm text-indigo-600 hover:text-indigo-500 inline-flex items-center gap-1"
        >
          <ArrowLeftOutlined /> Giriş sayfasına dön
        </Link>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
