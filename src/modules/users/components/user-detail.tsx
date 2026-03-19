import { CalendarOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'

import { formatDate } from '@/core/utils/format-date'

import type { TUser } from '@/modules/users/users.types'

const { Text } = Typography

type TUserDetailProps = {
  user: TUser
}

const UserDetail = ({ user }: TUserDetailProps) => {
  return (
    <Card title="Kullanıcı Bilgileri">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Text type="secondary" className="text-xs capitalize tracking-wide">
            Ad
          </Text>
          <div className="mt-1 font-medium">{user.firstName}</div>
        </div>
        <div>
          <Text type="secondary" className="text-xs capitalize tracking-wide">
            Soyad
          </Text>
          <div className="mt-1 font-medium">{user.lastName}</div>
        </div>
        <div className="sm:col-span-2">
          <Text type="secondary" className="text-xs capitalize tracking-wide">
            E-posta
          </Text>
          <div className="mt-1 font-medium">{user.email}</div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <CalendarOutlined className="text-gray-400 text-sm" />
            <Text type="secondary" className="text-xs capitalize tracking-wide">
              Oluşturulma Tarihi
            </Text>
          </div>
          <div className="mt-1 font-medium">{formatDate(user.createdAt)}</div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <CalendarOutlined className="text-gray-400 text-sm" />
            <Text type="secondary" className="text-xs capitalize tracking-wide">
              Güncellenme Tarihi
            </Text>
          </div>
          <div className="mt-1 font-medium">{formatDate(user.updatedAt)}</div>
        </div>
      </div>
    </Card>
  )
}

export default UserDetail
