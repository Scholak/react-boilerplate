import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  SafetyCertificateOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Button, Card, Input, Modal, Table, Tag, Typography, type TableColumnsType } from 'antd'
import { useMemo, useState } from 'react'

import HasPermission from '@/core/components/has-permission'
import { PERMISSIONS } from '@/core/lib/permissions'
import { formatDate } from '@/core/utils/format-date'
import { getInitials } from '@/core/utils/get-initials'

import { useAuth } from '@/modules/auth/auth.hooks'
import { useUsers } from '@/modules/users/users.hooks'
import type { TUser } from '@/modules/users/users.types'

const { Title, Text } = Typography

type TUsersTableProps = {
  onDeleteUser: (user: TUser) => Promise<TUser>
  isDeleting: boolean
}

const UsersTable = ({ onDeleteUser, isDeleting }: TUsersTableProps) => {
  const { data: users } = useUsers()
  const { data: currentUser } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<TUser | null>(null)

  const filtered = useMemo(
    () =>
      users.filter((u) =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  )

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    await onDeleteUser(deleteTarget)
    setDeleteTarget(null)
  }

  const columns: TableColumnsType<TUser> = [
    {
      title: 'Ad Soyad',
      key: 'name',
      filteredValue: search ? [search] : null,
      onFilter: (value, record) =>
        `${record.firstName} ${record.lastName} ${record.email}`
          .toLowerCase()
          .includes(String(value).toLowerCase()),
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-indigo-600 font-semibold text-xs">
              {getInitials(record.firstName, record.lastName)}
            </span>
          </div>
          <div>
            <div className="font-medium">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'E-posta',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm'],
      filters: [...new Set(users.map((u) => u.email))].map((email) => ({
        text: email,
        value: email,
      })),
      onFilter: (value, record) => record.email === value,
    },
    {
      title: 'Roller',
      key: 'roles',
      responsive: ['md'],
      render: (_, record) =>
        record.roles.length === 0 ? (
          <Text type="secondary" className="text-xs">
            —
          </Text>
        ) : (
          <div className="flex flex-wrap gap-1">
            {record.roles.map((role) => (
              <Tag key={role.id} color="geekblue">
                {role.name}
              </Tag>
            ))}
          </div>
        ),
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['lg'],
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (val: string) => formatDate(val),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2">
          <HasPermission permission={PERMISSIONS.USERS_DETAIL}>
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => navigate({ to: '/users/$userId', params: { userId: record.id } })}
            />
          </HasPermission>
          <HasPermission permission={PERMISSIONS.USERS_EDIT}>
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() =>
                navigate({ to: '/users/$userId/edit', params: { userId: record.id } })
              }
            />
          </HasPermission>
          <HasPermission permission={PERMISSIONS.USERS_ASSIGN_ROLES}>
            <Button
              icon={<SafetyCertificateOutlined />}
              size="small"
              onClick={() =>
                navigate({ to: '/users/$userId/roles', params: { userId: record.id } })
              }
            />
          </HasPermission>
          {record.id !== currentUser.id && (
            <HasPermission permission={PERMISSIONS.USERS_DELETE}>
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                onClick={() => setDeleteTarget(record)}
              />
            </HasPermission>
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
            Kullanıcılar
          </Title>
          <Text type="secondary">{users.length} toplam kullanıcı</Text>
        </div>
        <HasPermission permission={PERMISSIONS.USERS_CREATE}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate({ to: '/users/create' })}
          >
            <span className="hidden sm:inline">Kullanıcı Oluştur</span>
          </Button>
        </HasPermission>
      </div>

      <Card styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <Input
            placeholder="Ad, soyad veya e-posta ile ara..."
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
            <span>Kullanıcıyı Sil</span>
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
          <strong>
            {deleteTarget?.firstName} {deleteTarget?.lastName}
          </strong>{' '}
          adlı kullanıcıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
      </Modal>
    </div>
  )
}

export default UsersTable
