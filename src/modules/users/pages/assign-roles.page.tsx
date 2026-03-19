import { ArrowLeftOutlined, CloseOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button, Card, Modal, Select, Space, Tag, Typography, notification } from 'antd'
import { useState } from 'react'

import { queryClient } from '@/core/lib/query-client'

import { useRoles, useAssignRoles, useRevokeRoles } from '@/modules/roles/roles.hooks'
import { queryKeys } from '@/modules/users/users.constants'
import { useUser } from '@/modules/users/users.hooks'

const { Title, Text } = Typography

const AssignRolesPage = () => {
  const { userId }: { userId: string } = useParams({ strict: false })
  const navigate = useNavigate()
  const { data: user } = useUser(userId)
  const { data: allRoles } = useRoles()
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(undefined)
  const [revokeTarget, setRevokeTarget] = useState<{ id: string; name: string } | null>(null)

  const assignedRoleIds = new Set(user.roles.map((r) => r.id))
  const availableRoles = allRoles.filter((r) => !assignedRoleIds.has(r.id))

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.list })
    queryClient.invalidateQueries({ queryKey: queryKeys.detail(userId) })
    queryClient.invalidateQueries({ queryKey: queryKeys.edit(userId) })
  }

  const assign = useAssignRoles({
    onSuccess: () => {
      setSelectedRoleId(undefined)
      invalidate()
      notification.success({ message: 'Rol atandı' })
    },
    onError: () => notification.error({ message: 'Rol atanamadı' }),
  })

  const revoke = useRevokeRoles({
    onSuccess: () => {
      invalidate()
      notification.success({ message: 'Rol kaldırıldı' })
    },
    onError: () => notification.error({ message: 'Rol kaldırılamadı' }),
  })

  const handleRevokeConfirm = () => {
    if (revokeTarget) {
      revoke.mutate({ userId, roleIds: [revokeTarget.id] })
      setRevokeTarget(null)
    }
  }

  return (
    <Space orientation="vertical" size={16} className="w-full">
      <div className="flex items-center gap-3">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate({ to: '/users/$userId', params: { userId } })}
        >
          Geri
        </Button>
      </div>

      <div>
        <Title level={4} style={{ marginBottom: 4 }}>
          Rol Yönetimi
        </Title>
        <Text type="secondary">
          {user.firstName} {user.lastName} kullanıcısının rollerini yönetin.
        </Text>
      </div>

      <Card title="Atanmış Roller">
        {user.roles.length === 0 ? (
          <Text type="secondary">Henüz rol atanmamış.</Text>
        ) : (
          <div className="flex flex-wrap gap-2">
            {user.roles.map((role) => (
              <Tag
                key={role.id}
                color="geekblue"
                closable
                closeIcon={<CloseOutlined />}
                onClose={() => setRevokeTarget({ id: role.id, name: role.name })}
              >
                {role.name}
              </Tag>
            ))}
          </div>
        )}
      </Card>

      {availableRoles.length > 0 && (
        <Card title="Rol Ekle">
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
                if (selectedRoleId) assign.mutate({ userId, roleIds: [selectedRoleId] })
              }}
            >
              Ata
            </Button>
          </div>
        </Card>
      )}

      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined className="text-red-500" />
            <span>Rolü Kaldır</span>
          </div>
        }
        open={!!revokeTarget}
        onOk={handleRevokeConfirm}
        onCancel={() => setRevokeTarget(null)}
        okText="Evet, Kaldır"
        cancelText="İptal"
        okButtonProps={{ danger: true, loading: revoke.isPending }}
        centered
      >
        <p>
          <strong>{revokeTarget?.name}</strong> rolünü bu kullanıcıdan kaldırmak istediğinize emin
          misiniz?
        </p>
      </Modal>
    </Space>
  )
}

export default AssignRolesPage
