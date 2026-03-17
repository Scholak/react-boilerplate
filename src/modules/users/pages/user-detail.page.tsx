import { useUser } from '@/modules/users/users.hooks'
import { UserDetail } from '@/modules/users/components/user-detail'

type TUserDetailPageProps = {
  userId: string
}

export function UserDetailPage({ userId }: TUserDetailPageProps) {
  const { data: user } = useUser(userId)
  return <UserDetail user={user} />
}
