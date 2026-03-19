import { notification } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import RolesTable from '@/modules/roles/components/roles-table'
import { queryKeys } from '@/modules/roles/roles.constants'
import { useDeleteRole } from '@/modules/roles/roles.hooks'
import type { TRoleListItem } from '@/modules/roles/roles.types'

const ListRolesPage = () => {
  const mutation = useDeleteRole({
    onSuccess: (role: TRoleListItem) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success({
        message: 'Rol silindi',
        description: `${role.name} rolü başarıyla silindi.`,
      })
    },
    onError: () => {
      notification.error({
        message: 'Silme başarısız',
        description: 'Rol silinirken bir hata oluştu. Lütfen tekrar deneyin.',
      })
    },
  })

  const onDeleteRole = async (role: TRoleListItem) => await mutation.mutateAsync(role)

  return <RolesTable onDeleteRole={onDeleteRole} isDeleting={mutation.isPending} />
}

export default ListRolesPage
