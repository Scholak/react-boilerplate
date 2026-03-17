import { Button, Card, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { createUserSchema, type TCreateUserSchema } from '@/modules/users/users.schemas'
import type { TUser } from '@/modules/users/users.types'

type TCreateUserFormProps = {
  onCreateUser: (values: TCreateUserSchema) => Promise<TUser>
  isPending: boolean
}

export function CreateUserForm({ onCreateUser, isPending }: TCreateUserFormProps) {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) })

  return (
    <Card>
      <form onSubmit={handleSubmit(onCreateUser)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Ad</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.firstName ? 'error' : ''} size="large" />
              )}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Soyad</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.lastName ? 'error' : ''} size="large" />
              )}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">E-posta</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} status={errors.email ? 'error' : ''} size="large" />
            )}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Şifre</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} status={errors.password ? 'error' : ''} size="large" />
            )}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
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

        <div className="flex gap-3 pt-2">
          <Button size="large" onClick={() => navigate({ to: '/users' })}>
            İptal
          </Button>
          <Button type="primary" htmlType="submit" size="large" loading={isPending}>
            Kullanıcı Oluştur
          </Button>
        </div>
      </form>
    </Card>
  )
}
