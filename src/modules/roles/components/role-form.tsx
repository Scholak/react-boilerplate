import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Button, Card, Checkbox, Divider, Input, Space, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import { PERMISSION_MODULES } from '@/core/lib/permissions'

import {
  updateRoleSchema,
  type TUpdateRoleSchema,
  type TUpdateRoleSchemaInput,
} from '@/modules/roles/roles.schemas'

const { Title, Text } = Typography

type TRoleFormProps = {
  defaultValues?: TUpdateRoleSchema
  onSubmit: (values: TUpdateRoleSchema) => Promise<unknown>
  isPending: boolean
}

const RoleForm = ({ defaultValues, onSubmit, isPending }: TRoleFormProps) => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateRoleSchemaInput, unknown, TUpdateRoleSchema>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: defaultValues ?? { name: '', permissions: [] },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space orientation="vertical" size={16} className="w-full">
        <Card>
          <div>
            <label className="block text-sm font-medium mb-1.5">Rol Adı</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.name ? 'error' : ''} size="large" />
              )}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
        </Card>

        {PERMISSION_MODULES.map((mod) => (
          <Card key={mod.label}>
            <Title level={5} style={{ marginBottom: 0 }}>
              {mod.label}
            </Title>
            <Divider style={{ margin: '12px 0' }} />

            <div className="space-y-1">
              {mod.permissions.map((perm, index) => (
                <div key={perm.key}>
                  <Controller
                    name="permissions"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center justify-between py-3 gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{perm.label}</div>
                          <Text type="secondary" className="text-xs">
                            {perm.description}
                          </Text>
                        </div>
                        <Checkbox
                          checked={(field.value ?? []).includes(perm.key)}
                          onChange={(e) => {
                            const current = field.value ?? []
                            if (e.target.checked) {
                              field.onChange([...current, perm.key])
                            } else {
                              field.onChange(current.filter((k) => k !== perm.key))
                            }
                          }}
                        />
                      </div>
                    )}
                  />
                  {index < mod.permissions.length - 1 && <Divider style={{ margin: 0 }} />}
                </div>
              ))}
            </div>

            {errors.permissions && (
              <p className="mt-2 text-xs text-red-500">{errors.permissions.message}</p>
            )}
          </Card>
        ))}

        <div className="flex gap-3">
          <Button size="large" onClick={() => navigate({ to: '/roles' })}>
            İptal
          </Button>
          <Button type="primary" htmlType="submit" size="large" loading={isPending}>
            Kaydet
          </Button>
        </div>
      </Space>
    </form>
  )
}

export default RoleForm
