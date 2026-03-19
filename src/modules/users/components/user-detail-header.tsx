import { EditOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Avatar, Button, Card, Typography } from 'antd'

import HasPermission from '@/core/components/has-permission'
import { PERMISSIONS } from '@/core/lib/permissions'
import { getInitials } from '@/core/utils/get-initials'

import type { TUser } from '@/modules/users/users.types'

const { Title, Text } = Typography

type TUserDetailHeaderProps = {
  user: TUser
}

const UserDetailHeader = ({ user }: TUserDetailHeaderProps) => {
  const navigate = useNavigate()

  return (
    <Card>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar size={64} style={{ background: '#4f46e5', fontSize: 22, flexShrink: 0 }}>
            {getInitials(user.firstName, user.lastName)}
          </Avatar>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {user.firstName} {user.lastName}
            </Title>
            <div className="flex items-center gap-1.5 mt-1">
              <MailOutlined className="text-gray-400 text-sm" />
              <Text type="secondary">{user.email}</Text>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <HasPermission permission={PERMISSIONS.USERS_ASSIGN_ROLES}>
            <Button
              icon={<SafetyCertificateOutlined />}
              onClick={() => navigate({ to: '/users/$userId/roles', params: { userId: user.id } })}
            >
              Roller
            </Button>
          </HasPermission>
          <HasPermission permission={PERMISSIONS.USERS_EDIT}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate({ to: '/users/$userId/edit', params: { userId: user.id } })}
            >
              Düzenle
            </Button>
          </HasPermission>
        </div>
      </div>
    </Card>
  )
}

export default UserDetailHeader
