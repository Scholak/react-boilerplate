import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Button, notification, Typography } from 'antd'

import { queryClient } from '@/core/lib/query-client'

import RoleForm from '@/modules/roles/components/role-form'
import { queryKeys } from '@/modules/roles/roles.constants'
import { useCreateRole } from '@/modules/roles/roles.hooks'
import type { TRole } from '@/modules/roles/roles.types'

const { Title, Text } = Typography

const CreateRolePage = () => {
  const navigate = useNavigate()

  const mutation = useCreateRole({
    onSuccess: async (role: TRole) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list })
      notification.success({
        message: 'Rol oluşturuldu',
        description: `${role.name} rolü başarıyla oluşturuldu.`,
      })
      await navigate({ to: '/roles' })
    },
    onError: () => {
      notification.error({
        message: 'Oluşturma başarısız',
        description: 'Rol oluşturulurken bir hata oluştu. Rol adı zaten kullanımda olabilir.',
      })
    },
  })

  return (
    <div>
      <div className="mb-5">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate({ to: '/roles' })}
          className="mb-4"
        >
          Geri
        </Button>
        <Title level={4} style={{ marginBottom: 4 }}>
          Rol Oluştur
        </Title>
        <Text type="secondary">Yeni bir rol oluşturun ve izinleri atayın.</Text>
      </div>
      <RoleForm onSubmit={(values) => mutation.mutateAsync(values)} isPending={mutation.isPending} />
    </div>
  )
}

export default CreateRolePage
