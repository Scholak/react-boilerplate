import { useNavigate, useParams } from '@tanstack/react-router'
import { notification, Space, Typography } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import RoleForm from '@/modules/roles/components/role-form'
import { queryKeys } from '@/modules/roles/roles.constants'
import { useRoleForEdit, useUpdateRole } from '@/modules/roles/roles.hooks'
import type { TRole } from '@/modules/roles/roles.types'

const { Title, Text } = Typography

const EditRolePage = () => {
  const { roleId }: { roleId: string } = useParams({ strict: false })

  const navigate = useNavigate()
  const { data: role } = useRoleForEdit(roleId)

  const mutation = useUpdateRole(roleId, {
    onSuccess: async (updated: TRole) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      queryClient.setQueryData(queryKeys.detail(roleId), updated)
      notification.success({
        message: 'Rol güncellendi',
        description: `${updated.name} rolü başarıyla güncellendi.`,
      })
      await navigate({ to: '/roles' })
    },
    onError: () => {
      notification.error({
        message: 'Güncelleme başarısız',
        description: 'Rol güncellenirken bir hata oluştu. Rol adı zaten kullanımda olabilir.',
      })
    },
  })

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <div>
        <Title level={4} style={{ marginBottom: 4 }}>
          Rolü Düzenle
        </Title>
        <Text type="secondary">Rol bilgilerini ve izinlerini güncelleyin.</Text>
      </div>
      <RoleForm
        defaultValues={{ name: role.name, permissions: role.permissions as string[] }}
        onSubmit={(values) => mutation.mutateAsync(values)}
        isPending={mutation.isPending}
      />
    </Space>
  )
}

export default EditRolePage
