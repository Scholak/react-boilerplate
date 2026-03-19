import { Card, Checkbox, Divider, Space, Typography } from 'antd'

import { PERMISSION_MODULES } from '@/core/lib/permissions'

const { Title, Text } = Typography

type TPermissionViewProps = {
  permissions: string[]
}

const PermissionView = ({ permissions }: TPermissionViewProps) => {
  return (
    <Space orientation="vertical" size={12} className="w-full">
      {PERMISSION_MODULES.map((mod) => (
        <Card key={mod.label}>
          <Title level={5} style={{ marginBottom: 0 }}>
            {mod.label}
          </Title>
          <Divider style={{ margin: '12px 0' }} />
          <div className="space-y-1">
            {mod.permissions.map((perm, index) => (
              <div key={perm.key}>
                <div className="flex items-center justify-between py-3 gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{perm.label}</div>
                    <Text type="secondary" className="text-xs">
                      {perm.description}
                    </Text>
                  </div>
                  <Checkbox checked={permissions.includes(perm.key)} disabled />
                </div>
                {index < mod.permissions.length - 1 && <Divider style={{ margin: 0 }} />}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </Space>
  )
}

export default PermissionView
