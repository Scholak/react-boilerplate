import { useMemo, useState } from 'react'
import { Button, Card, Input, Popconfirm, Table, Typography, type TableColumnsType } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { useUsers } from '@/modules/users/users.hooks'
import type { TUser } from '@/modules/users/users.types'
import { getInitials } from '@/core/utils/get-initials'
import { formatDate } from '@/core/utils/format-date'

const { Title, Text } = Typography

type TUsersTableProps = {
  onDeleteUser: (user: TUser) => Promise<TUser>
  isDeleting: boolean
}

export function UsersTable({ onDeleteUser, isDeleting }: TUsersTableProps) {
  const { data: users } = useUsers()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      users.filter((u) =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  )

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
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate({ to: '/users/$userId', params: { userId: record.id } })}
          />
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate({ to: '/users/$userId/edit', params: { userId: record.id } })}
          />
          <Popconfirm
            title="Kullanıcıyı sil"
            description="Bu kullanıcıyı silmek istediğinize emin misiniz?"
            okText="Evet, sil"
            cancelText="İptal"
            okType="danger"
            onConfirm={() => onDeleteUser(record)}
          >
            <Button icon={<DeleteOutlined />} size="small" danger loading={isDeleting} />
          </Popconfirm>
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate({ to: '/users/create' })}
        >
          <span className="hidden sm:inline">Kullanıcı Oluştur</span>
        </Button>
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
    </div>
  )
}
