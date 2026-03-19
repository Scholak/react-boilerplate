import { Card, Collapse, Tag, Typography } from 'antd'

import { useAuth } from '@/modules/auth/auth.hooks'
import PermissionView from '@/modules/roles/components/permission-view'

const { Title } = Typography

const ProfileRoles = () => {
  const { data: user } = useAuth()

  const effectivePermissions = [...new Set(user.roles.flatMap((r) => r.permissions))]

  return (
    <Card title="Profil Rolleri">
      <Collapse
        items={[
          {
            key: 'roles',
            label: (
              <div className="flex items-center gap-2">
                <Title level={5} style={{ margin: 0 }}>
                  Roller ve Etkin İzinler
                </Title>
                {user.roles.map((r) => (
                  <Tag key={r.id} color="geekblue">
                    {r.name}
                  </Tag>
                ))}
              </div>
            ),
            children: <PermissionView permissions={effectivePermissions} />,
          },
        ]}
      />
    </Card>
  )
}

export default ProfileRoles
