import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Button, notification, Space, Typography } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import CreateUserForm from '@/modules/users/components/create-user-form'
import { queryKeys, usersNotifications } from '@/modules/users/users.constants'
import { useCreateUser } from '@/modules/users/users.hooks'
import type { TCreateUserSchema } from '@/modules/users/users.schemas'

const { Title, Text } = Typography

const CreateUserPage = () => {
  const navigate = useNavigate()

  const mutation = useCreateUser({
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success(usersNotifications.createUserSuccess)
      await navigate({ to: '/users' })
    },
    onError: () => {
      notification.error(usersNotifications.createUserError)
    },
  })

  const onCreateUser = async (values: TCreateUserSchema) => await mutation.mutateAsync(values)

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <div>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate({ to: '/users' })}>
          Geri
        </Button>
      </div>
      <div className="mb-5">
        <Title level={4} style={{ marginBottom: 4 }}>
          Kullanıcı Oluştur
        </Title>
        <Text type="secondary">Yeni bir kullanıcı hesabı oluşturun.</Text>
      </div>
      <CreateUserForm onCreateUser={onCreateUser} isPending={mutation.isPending} />
    </Space>
  )
}

export default CreateUserPage
