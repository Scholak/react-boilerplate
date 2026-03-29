import { notification } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import RolesTable from '@/modules/roles/components/roles-table'
import { queryKeys, rolesNotifications } from '@/modules/roles/roles.constants'
import { useDeleteRole } from '@/modules/roles/roles.hooks'
import type { TRoleListItem } from '@/modules/roles/roles.types'

const ListRolesPage = () => {
  const mutation = useDeleteRole({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success(rolesNotifications.deleteRoleSuccess)
    },
    onError: () => {
      notification.error(rolesNotifications.deleteRoleError)
    },
  })

  const onDeleteRole = async (role: TRoleListItem) => await mutation.mutateAsync(role)

  return <RolesTable onDeleteRole={onDeleteRole} isDeleting={mutation.isPending} />
}

export default ListRolesPage
