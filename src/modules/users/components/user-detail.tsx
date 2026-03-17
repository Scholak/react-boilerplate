import { Avatar, Button, Card, Typography } from 'antd'
import { EditOutlined, ArrowLeftOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { formatDate } from '@/core/utils/format-date'
import { getInitials } from '@/core/utils/get-initials'
import type { TUser } from '@/modules/users/users.types'

const { Title, Text } = Typography

type TUserDetailProps = {
  user: TUser
}

export function UserDetail({ user }: TUserDetailProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate({ to: '/users' })}>
          Geri
        </Button>
      </div>

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
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: '/users/$userId/edit', params: { userId: user.id } })}
          >
            Düzenle
          </Button>
        </div>
      </Card>

      <Card title="Kullanıcı Bilgileri">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Text type="secondary" className="text-xs uppercase tracking-wide">
              Ad
            </Text>
            <div className="mt-1 font-medium">{user.firstName}</div>
          </div>
          <div>
            <Text type="secondary" className="text-xs uppercase tracking-wide">
              Soyad
            </Text>
            <div className="mt-1 font-medium">{user.lastName}</div>
          </div>
          <div className="sm:col-span-2">
            <Text type="secondary" className="text-xs uppercase tracking-wide">
              E-posta
            </Text>
            <div className="mt-1 font-medium">{user.email}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <CalendarOutlined className="text-gray-400 text-sm" />
              <Text type="secondary" className="text-xs uppercase tracking-wide">
                Oluşturulma Tarihi
              </Text>
            </div>
            <div className="mt-1 font-medium">{formatDate(user.createdAt)}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <CalendarOutlined className="text-gray-400 text-sm" />
              <Text type="secondary" className="text-xs uppercase tracking-wide">
                Güncellenme Tarihi
              </Text>
            </div>
            <div className="mt-1 font-medium">{formatDate(user.updatedAt)}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
