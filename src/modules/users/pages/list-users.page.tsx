import { notification } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import UsersTable from '@/modules/users/components/users-table'
import { queryKeys, usersNotifications } from '@/modules/users/users.constants'
import { useDeleteUser } from '@/modules/users/users.hooks'
import type { TUser } from '@/modules/users/users.types'

const ListUsersPage = () => {
  const mutation = useDeleteUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success(usersNotifications.deleteUserSuccess)
    },
    onError: () => {
      notification.error(usersNotifications.deleteUserError)
    },
  })

  const onDeleteUser = async (user: TUser) => await mutation.mutateAsync(user)

  return <UsersTable onDeleteUser={onDeleteUser} isDeleting={mutation.isPending} />
}

export default ListUsersPage
