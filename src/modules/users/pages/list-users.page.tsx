import { notification } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import UsersTable from '@/modules/users/components/users-table'
import { queryKeys } from '@/modules/users/users.constants'
import { useDeleteUser } from '@/modules/users/users.hooks'
import type { TUser } from '@/modules/users/users.types'

const ListUsersPage = () => {
  const mutation = useDeleteUser({
    onSuccess: (user: TUser) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success({
        message: 'Kullanıcı silindi',
        description: `${user.firstName} ${user.lastName} kullanıcısı başarıyla silindi.`,
      })
    },
    onError: () => {
      notification.error({
        message: 'Silme başarısız',
        description: 'Kullanıcı silinirken bir hata oluştu. Lütfen tekrar deneyin.',
      })
    },
  })

  const onDeleteUser = async (user: TUser) => await mutation.mutateAsync(user)

  return <UsersTable onDeleteUser={onDeleteUser} isDeleting={mutation.isPending} />
}

export default ListUsersPage
