import { notification, Typography } from 'antd'
import { useNavigate } from '@tanstack/react-router'
import { useUser, useUpdateUser } from '@/modules/users/users.hooks'
import { EditUserForm } from '@/modules/users/components/edit-user-form'
import { queryClient } from '@/core/lib/query-client'
import { queryKeys } from '@/modules/users/users.constants'
import type { TUser } from '@/modules/users/users.types'
import type { TUpdateUserSchema } from '@/modules/users/users.schemas'

const { Title, Text } = Typography

type TEditUserPageProps = {
  userId: string
}

export function EditUserPage({ userId }: TEditUserPageProps) {
  const navigate = useNavigate()
  const { data: user } = useUser(userId)

  const mutation = useUpdateUser(userId, {
    onSuccess: async (updated: TUser) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      queryClient.setQueryData(queryKeys.detail(userId), updated)
      notification.success({
        message: 'Kullanıcı güncellendi',
        description: `${updated.firstName} ${updated.lastName} kullanıcısı başarıyla güncellendi.`,
      })
      await navigate({ to: '/users' })
    },
    onError: () => {
      notification.error({
        message: 'Güncelleme başarısız',
        description:
          'Kullanıcı güncellenirken bir hata oluştu. E-posta adresi zaten kullanımda olabilir.',
      })
    },
  })

  const onUpdateUser = async (values: TUpdateUserSchema) => await mutation.mutateAsync(values)

  return (
    <div>
      <div className="mb-5">
        <Title level={4} style={{ marginBottom: 4 }}>
          Kullanıcıyı Düzenle
        </Title>
        <Text type="secondary">Kullanıcı bilgilerini güncelleyin.</Text>
      </div>
      <EditUserForm user={user} onUpdateUser={onUpdateUser} isPending={mutation.isPending} />
    </div>
  )
}
