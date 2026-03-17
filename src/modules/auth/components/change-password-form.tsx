import { Button, Card, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, type TChangePasswordSchema } from '@/modules/auth/auth.schemas'

type TChangePasswordFormProps = {
  onChangePassword: (values: TChangePasswordSchema) => Promise<void>
  isPending: boolean
}

export function ChangePasswordForm({ onChangePassword, isPending }: TChangePasswordFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TChangePasswordSchema>({ resolver: zodResolver(changePasswordSchema) })

  const onSubmit = async (values: TChangePasswordSchema) => {
    await onChangePassword(values)
    reset()
  }

  return (
    <Card title={<span className="font-semibold">Şifre Değiştir</span>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Mevcut Şifre</label>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                status={errors.currentPassword ? 'error' : ''}
                size="large"
              />
            )}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Yeni Şifre</label>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} status={errors.newPassword ? 'error' : ''} size="large" />
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
                status={errors.confirmPassword ? 'error' : ''}
                size="large"
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="primary" htmlType="submit" loading={isPending}>
          Şifreyi Değiştir
        </Button>
      </form>
    </Card>
  )
}
