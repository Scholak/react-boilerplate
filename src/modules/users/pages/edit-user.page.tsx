import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button, notification, Space, Typography } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import EditUserForm from '@/modules/users/components/edit-user-form'
import { queryKeys } from '@/modules/users/users.constants'
import { useUserForEdit, useUpdateUser } from '@/modules/users/users.hooks'
import type { TUpdateUserSchema } from '@/modules/users/users.schemas'
import type { TUser } from '@/modules/users/users.types'

const { Title, Text } = Typography

const EditUserPage = () => {
  const { userId }: { userId: string } = useParams({ strict: false })
  const navigate = useNavigate()
  const { data: user } = useUserForEdit(userId)

  const mutation = useUpdateUser(userId, {
    onSuccess: async (updated: TUser) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      queryClient.invalidateQueries({ queryKey: queryKeys.edit(userId) })
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
    <Space orientation="vertical" size={16} className="w-full">
      <div>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate({ to: '/users' })}>
          Geri
        </Button>
      </div>
      <div className="mb-5">
        <Title level={4} style={{ marginBottom: 4 }}>
          Kullanıcıyı Düzenle
        </Title>
        <Text type="secondary">Kullanıcı bilgilerini güncelleyin.</Text>
      </div>
      <EditUserForm user={user} onUpdateUser={onUpdateUser} isPending={mutation.isPending} />
    </Space>
  )
}

export default EditUserPage
