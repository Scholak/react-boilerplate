import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Button, Card, Input, Modal, Table, Typography, type TableColumnsType } from 'antd'
import { useMemo, useState } from 'react'

import HasPermission from '@/core/components/has-permission'
import { PERMISSIONS } from '@/core/lib/permissions'
import { formatDate } from '@/core/utils/format-date'

import { useRoles } from '@/modules/roles/roles.hooks'
import type { TRoleListItem } from '@/modules/roles/roles.types'

const { Title, Text } = Typography

type TRolesTableProps = {
  onDeleteRole: (role: TRoleListItem) => Promise<TRoleListItem>
  isDeleting: boolean
}

const RolesTable = ({ onDeleteRole, isDeleting }: TRolesTableProps) => {
  const { data: roles } = useRoles()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<TRoleListItem | null>(null)

  const filtered = useMemo(
    () => roles.filter((r) => r.name.toLowerCase().includes(search.toLowerCase())),
    [roles, search],
  )

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    await onDeleteRole(deleteTarget)
    setDeleteTarget(null)
  }

  const columns: TableColumnsType<TRoleListItem> = [
    {
      title: 'Rol Adı',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['md'],
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (val: string) => formatDate(val),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2">
          <HasPermission permission={PERMISSIONS.ROLES_DETAIL}>
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => navigate({ to: '/roles/$roleId', params: { roleId: record.id } })}
            />
          </HasPermission>
          {record.name !== 'Admin' && (
            <>
              <HasPermission permission={PERMISSIONS.ROLES_EDIT}>
                <Button
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() =>
                    navigate({ to: '/roles/$roleId/edit', params: { roleId: record.id } })
                  }
                />
              </HasPermission>
              <HasPermission permission={PERMISSIONS.ROLES_DELETE}>
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  onClick={() => setDeleteTarget(record)}
                />
              </HasPermission>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <Title level={4} style={{ marginBottom: 2 }}>
            Roller
          </Title>
          <Text type="secondary">{roles.length} toplam rol</Text>
        </div>
        <HasPermission permission={PERMISSIONS.ROLES_CREATE}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate({ to: '/roles/create' })}
          >
            <span className="hidden sm:inline">Rol Oluştur</span>
          </Button>
        </HasPermission>
      </div>

      <Card styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <Input
            placeholder="Rol adı ile ara..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            style={{ maxWidth: 360 }}
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: false }}
          />
        </div>
      </Card>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined className="text-red-500" />
            <span>Rolü Sil</span>
          </div>
        }
        open={!!deleteTarget}
        onOk={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        okText="Evet, Sil"
        cancelText="İptal"
        okButtonProps={{ danger: true, loading: isDeleting }}
        centered
      >
        <p>
          <strong>{deleteTarget?.name}</strong> rolünü silmek istediğinize emin misiniz? Bu işlem
          geri alınamaz.
        </p>
      </Modal>
    </div>
  )
}

export default RolesTable
