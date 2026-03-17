import { notification, Space } from 'antd'
import { useUpdateProfile, useChangePassword } from '@/modules/auth/auth.hooks'
import { ProfileForm } from '@/modules/auth/components/profile-form'
import { ChangePasswordForm } from '@/modules/auth/components/change-password-form'
import { queryClient } from '@/core/lib/query-client'
import { queryKeys } from '@/modules/auth/auth.constants'
import type { TUpdateProfileSchema, TChangePasswordSchema } from '@/modules/auth/auth.schemas'

export function ProfilePage() {
  const updateProfile = useUpdateProfile({
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth, data)
      notification.success({
        message: 'Profil güncellendi',
        description: `${data.firstName} ${data.lastName}, profil bilgileriniz başarıyla kaydedildi.`,
      })
    },
    onError: () => {
      notification.error({
        message: 'Güncelleme başarısız',
        description: 'Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.',
      })
    },
  })

  const changePassword = useChangePassword({
    onSuccess: () => {
      notification.success({
        message: 'Şifre değiştirildi',
        description: 'Şifreniz başarıyla güncellendi.',
      })
    },
    onError: () => {
      notification.error({
        message: 'Şifre değiştirilemedi',
        description: 'Mevcut şifreniz hatalı. Lütfen kontrol ederek tekrar deneyin.',
      })
    },
  })

  const onUpdateProfile = async (values: TUpdateProfileSchema) =>
    await updateProfile.mutateAsync(values)
  const onChangePassword = async (values: TChangePasswordSchema) =>
    await changePassword.mutateAsync(values)

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <ProfileForm onUpdateProfile={onUpdateProfile} isPending={updateProfile.isPending} />
      <ChangePasswordForm
        onChangePassword={onChangePassword}
        isPending={changePassword.isPending}
      />
    </Space>
  )
}
