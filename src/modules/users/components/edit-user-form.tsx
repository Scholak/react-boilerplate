import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Button, Card, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import { updateUserSchema, type TUpdateUserSchema } from '@/modules/users/users.schemas'
import type { TUser } from '@/modules/users/users.types'

type TEditUserFormProps = {
  user: TUser
  onUpdateUser: (values: TUpdateUserSchema) => Promise<TUser>
  isPending: boolean
}

const EditUserForm = ({ user, onUpdateUser, isPending }: TEditUserFormProps) => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    values: { firstName: user.firstName, lastName: user.lastName, email: user.email },
  })

  return (
    <Card>
      <form onSubmit={handleSubmit(onUpdateUser)} className="space-y-4">
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

        <div className="flex gap-3 pt-2">
          <Button size="large" onClick={() => navigate({ to: '/users' })}>
            İptal
          </Button>
          <Button type="primary" htmlType="submit" size="large" loading={isPending}>
            Güncelle
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default EditUserForm
