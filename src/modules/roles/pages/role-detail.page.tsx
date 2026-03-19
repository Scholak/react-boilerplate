import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button, Space, Typography } from 'antd'

import PermissionView from '@/modules/roles/components/permission-view'
import { useRole } from '@/modules/roles/roles.hooks'

const { Title, Text } = Typography

const RoleDetailPage = () => {
  const { roleId }: { roleId: string } = useParams({ strict: false })
  const navigate = useNavigate()
  const { data: role } = useRole(roleId)

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <div className="flex items-center justify-between">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate({ to: '/roles' })}>
          Geri
        </Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate({ to: '/roles/$roleId/edit', params: { roleId } })}
        >
          Düzenle
        </Button>
      </div>

      <div>
        <Title level={4} style={{ marginBottom: 4 }}>
          {role.name}
        </Title>
        <Text type="secondary">Rol detayları ve izinler</Text>
      </div>

      <PermissionView permissions={role.permissions} />
    </Space>
  )
}

export default RoleDetailPage
