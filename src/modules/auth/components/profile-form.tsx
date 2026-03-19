import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import { useAuth } from '@/modules/auth/auth.hooks'
import { updateProfileSchema, type TUpdateProfileSchema } from '@/modules/auth/auth.schemas'

type TProfileFormProps = {
  onUpdateProfile: (values: TUpdateProfileSchema) => Promise<unknown>
  isPending: boolean
}

const ProfileForm = ({ onUpdateProfile, isPending }: TProfileFormProps) => {
  const { data: user } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    values: { firstName: user.firstName, lastName: user.lastName, email: user.email },
  })

  return (
    <Card title={<span className="font-semibold">Profil Bilgileri</span>}>
      <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-4">
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

        <Button type="primary" htmlType="submit" loading={isPending}>
          Profili Güncelle
        </Button>
      </form>
    </Card>
  )
}

export default ProfileForm
