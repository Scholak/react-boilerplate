import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Select, Tag, Typography, notification } from 'antd'
import { useState } from 'react'

import { queryClient } from '@/core/lib/query-client'

import { useRoles, useAssignRoles } from '@/modules/roles/roles.hooks'
import { queryKeys } from '@/modules/users/users.constants'
import type { TUser } from '@/modules/users/users.types'

const { Text } = Typography

type TAssignRolesSectionProps = {
  user: TUser
}

const AssignRolesSection = ({ user }: TAssignRolesSectionProps) => {
  const { data: allRoles } = useRoles()
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(undefined)

  const assignedRoleIds = new Set(user.roles.map((r) => r.id))
  const availableRoles = allRoles.filter((r) => !assignedRoleIds.has(r.id))

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.list })
    queryClient.invalidateQueries({ queryKey: queryKeys.detail(user.id) })
    queryClient.invalidateQueries({ queryKey: queryKeys.edit(user.id) })
  }

  const assign = useAssignRoles({
    onSuccess: () => {
      setSelectedRoleId(undefined)
      invalidate()
      notification.success({ message: 'Rol atandı' })
    },
    onError: () => notification.error({ message: 'Rol atanamadı' }),
  })

  return (
    <Card title="Rol Atama">
      <div className="space-y-4">
        <div>
          <Text type="secondary" className="text-xs block mb-2">
            Mevcut Roller
          </Text>
          {user.roles.length === 0 ? (
            <Text type="secondary" className="text-sm">
              Henüz rol atanmamış.
            </Text>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.roles.map((role) => (
                <Tag key={role.id} color="geekblue">
                  {role.name}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {availableRoles.length > 0 && (
          <div>
            <Text type="secondary" className="text-xs block mb-2">
              Rol Ekle
            </Text>
            <div className="flex gap-2">
              <Select
                placeholder="Rol seçin..."
                value={selectedRoleId}
                onChange={setSelectedRoleId}
                options={availableRoles.map((r) => ({ value: r.id, label: r.name }))}
                style={{ minWidth: 200 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                loading={assign.isPending}
                disabled={!selectedRoleId}
                onClick={() => {
                  if (selectedRoleId) assign.mutate({ userId: user.id, roleIds: [selectedRoleId] })
                }}
              >
                Ata
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default AssignRolesSection
