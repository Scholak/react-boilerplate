import { useUser } from '@/modules/users/users.hooks'
import { UserDetail } from '@/modules/users/components/user-detail'
import { UserDetailHeader } from '@/modules/users/components/user-detail-header'
import { Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'

type TUserDetailPageProps = {
  userId: string
}

export function UserDetailPage({ userId }: TUserDetailPageProps) {
  const navigate = useNavigate()
  const { data: user } = useUser(userId)

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <div className="flex items-center gap-3">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate({ to: '/users' })}>
          Geri
        </Button>
      </div>

      <UserDetailHeader user={user} />
      <UserDetail user={user} />
    </Space>
  )
}
