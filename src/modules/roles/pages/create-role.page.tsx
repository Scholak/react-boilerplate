import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Button, notification, Typography } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import RoleForm from '@/modules/roles/components/role-form'
import { queryKeys, rolesNotifications } from '@/modules/roles/roles.constants'
import { useCreateRole } from '@/modules/roles/roles.hooks'

const { Title, Text } = Typography

const CreateRolePage = () => {
  const navigate = useNavigate()

  const mutation = useCreateRole({
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success(rolesNotifications.createRoleSuccess)
      await navigate({ to: '/roles' })
    },
    onError: () => {
      notification.error(rolesNotifications.createRoleError)
    },
  })

  return (
    <div>
      <div className="mb-5">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate({ to: '/roles' })}
          className="mb-4"
        >
          Geri
        </Button>
        <Title level={4} style={{ marginBottom: 4 }}>
          Rol Oluştur
        </Title>
        <Text type="secondary">Yeni bir rol oluşturun ve izinleri atayın.</Text>
      </div>
      <RoleForm onSubmit={(values) => mutation.mutateAsync(values)} isPending={mutation.isPending} />
    </div>
  )
}

export default CreateRolePage
