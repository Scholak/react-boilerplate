import { notification, Typography } from 'antd'
import { useNavigate } from '@tanstack/react-router'
import { useCreateUser } from '@/modules/users/users.hooks'
import { CreateUserForm } from '@/modules/users/components/create-user-form'
import { queryClient } from '@/core/lib/query-client'
import { queryKeys } from '@/modules/users/users.constants'
import type { TUser } from '@/modules/users/users.types'
import type { TCreateUserSchema } from '@/modules/users/users.schemas'

const { Title, Text } = Typography

export function CreateUserPage() {
  const navigate = useNavigate()

  const mutation = useCreateUser({
    onSuccess: async (user: TUser) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success({
        message: 'Kullanıcı oluşturuldu',
        description: `${user.firstName} ${user.lastName} kullanıcısı başarıyla oluşturuldu.`,
      })
      await navigate({ to: '/users' })
    },
    onError: () => {
      notification.error({
        message: 'Oluşturma başarısız',
        description:
          'Kullanıcı oluşturulurken bir hata oluştu. E-posta adresi zaten kullanımda olabilir.',
      })
    },
  })

  const onCreateUser = async (values: TCreateUserSchema) => await mutation.mutateAsync(values)

  return (
    <div>
      <div className="mb-5">
        <Title level={4} style={{ marginBottom: 4 }}>
          Kullanıcı Oluştur
        </Title>
        <Text type="secondary">Yeni bir kullanıcı hesabı oluşturun.</Text>
      </div>
      <CreateUserForm onCreateUser={onCreateUser} isPending={mutation.isPending} />
    </div>
  )
}
