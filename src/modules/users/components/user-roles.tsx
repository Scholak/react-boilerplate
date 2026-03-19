import { Card, Collapse, Tag, Typography } from 'antd'

import PermissionView from '@/modules/roles/components/permission-view'
import type { TUser } from '@/modules/users/users.types'

const { Title } = Typography

type TUserRolesProps = {
  user: TUser
}

const UserRoles = ({ user }: TUserRolesProps) => {
  const effectivePermissions = [...new Set(user.roles.flatMap((r) => r.permissions))]

  return (
    <Card title="Kullanıcı Rolleri">
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

export default UserRoles
