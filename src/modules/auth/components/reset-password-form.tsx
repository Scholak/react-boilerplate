import { Button, Input, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { resetPasswordSchema, type TResetPasswordSchema } from '@/modules/auth/auth.schemas'

const { Title, Text } = Typography

type TResetPasswordFormProps = {
  token: string
  onResetPassword: (values: TResetPasswordSchema) => Promise<void>
  isPending: boolean
}

export function ResetPasswordForm({ token, onResetPassword, isPending }: TResetPasswordFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  })

  return (
    <form onSubmit={handleSubmit(onResetPassword)} className="space-y-5">
      <div className="mb-6">
        <Title level={4} style={{ marginBottom: 4 }}>
          Şifrenizi sıfırlayın
        </Title>
        <Text type="secondary">Hesabınız için güçlü bir şifre belirleyin.</Text>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Yeni Şifre</label>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="••••••••"
              status={errors.newPassword ? 'error' : ''}
              size="large"
            />
          )}
        />
        {errors.newPassword && (
          <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Şifre Tekrarı</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="••••••••"
              status={errors.confirmPassword ? 'error' : ''}
              size="large"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
        Şifremi Sıfırla
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
