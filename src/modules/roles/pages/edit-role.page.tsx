import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button, notification, Space, Typography } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import RoleForm from '@/modules/roles/components/role-form'
import { queryKeys, rolesNotifications } from '@/modules/roles/roles.constants'
import { useRoleForEdit, useUpdateRole } from '@/modules/roles/roles.hooks'
import type { TRole } from '@/modules/roles/roles.types'

const { Title, Text } = Typography

const EditRolePage = () => {
  const { roleId }: { roleId: string } = useParams({ strict: false })

  const navigate = useNavigate()
  const { data: role } = useRoleForEdit(roleId)

  const mutation = useUpdateRole(roleId, {
    onSuccess: async (updated: TRole) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      queryClient.setQueryData(queryKeys.detail(roleId), updated)
      notification.success(rolesNotifications.updateRoleSuccess)
      await navigate({ to: '/roles' })
    },
    onError: () => {
      notification.error(rolesNotifications.updateRoleError)
    },
  })

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <div>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate({ to: '/roles' })}>
          Geri
        </Button>
      </div>
      <div>
        <Title level={4} style={{ marginBottom: 4 }}>
          Rolü Düzenle
        </Title>
        <Text type="secondary">Rol bilgilerini ve izinlerini güncelleyin.</Text>
      </div>
      <RoleForm
        defaultValues={{ name: role.name, permissions: role.permissions as string[] }}
        onSubmit={(values) => mutation.mutateAsync(values)}
        isPending={mutation.isPending}
      />
    </Space>
  )
}

export default EditRolePage
