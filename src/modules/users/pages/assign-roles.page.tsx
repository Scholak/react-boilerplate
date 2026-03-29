import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button, Select, Space, Typography, notification } from 'antd'
import { useState } from 'react'

import { queryClient } from '@/core/lib/query-client'

import { useRoles } from '@/modules/roles/roles.hooks'
import { queryKeys } from '@/modules/users/users.constants'
import { useUserRoles, useUpdateUserRoles } from '@/modules/users/users.hooks'

const { Title, Text } = Typography

const AssignRolesPage = () => {
  const { userId }: { userId: string } = useParams({ strict: false })
  const navigate = useNavigate()
  const { data: currentRoles } = useUserRoles(userId)
  const { data: allRoles } = useRoles()

  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(
    currentRoles.map((r) => r.id),
  )

  const mutation = useUpdateUserRoles(userId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(userId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.edit(userId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.roles(userId) })
      notification.success({ message: 'Roller güncellendi' })
      navigate({ to: '/users/$userId', params: { userId } })
    },
    onError: () => notification.error({ message: 'Roller güncellenemedi' }),
  })

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <div className="flex items-center gap-3">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate({ to: '/users' })}
        >
          Geri
        </Button>
      </div>

      <div>
        <Title level={4} style={{ marginBottom: 4 }}>
          Rol Yönetimi
        </Title>
        <Text type="secondary">Kullanıcıya atanacak rolleri seçin.</Text>
      </div>

      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Rol seçin..."
        value={selectedRoleIds}
        onChange={setSelectedRoleIds}
        options={allRoles.map((r) => ({ value: r.id, label: r.name }))}
      />

      <div className="flex gap-2">
        <Button
          onClick={() => navigate({ to: '/users/$userId', params: { userId } })}
        >
          İptal
        </Button>
        <Button
          type="primary"
          loading={mutation.isPending}
          onClick={() => mutation.mutate(selectedRoleIds)}
        >
          Güncelle
        </Button>
      </div>
    </Space>
  )
}

export default AssignRolesPage
