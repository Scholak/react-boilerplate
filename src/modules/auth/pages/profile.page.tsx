import { UserOutlined, MailOutlined } from '@ant-design/icons'
import { Avatar, Card, notification, Typography } from 'antd'

import { queryClient } from '@/core/lib/query-client'
import { getInitials } from '@/core/utils/get-initials'

import { authNotifications, queryKeys } from '@/modules/auth/auth.constants'
import { useUpdateProfile, useChangePassword, useAuth } from '@/modules/auth/auth.hooks'
import type { TUpdateProfileSchema, TChangePasswordSchema } from '@/modules/auth/auth.schemas'
import ChangePasswordForm from '@/modules/auth/components/change-password-form'
import ProfileForm from '@/modules/auth/components/profile-form'
import ProfileRoles from '@/modules/auth/components/profile-roles'

const { Title, Text } = Typography

const ProfilePage = () => {
  const { data: user } = useAuth()

  const updateProfile = useUpdateProfile({
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth, data)
      notification.success(authNotifications.updateProfileSuccess)
    },
    onError: () => {
      notification.error(authNotifications.updateProfileError)
    },
  })

  const changePassword = useChangePassword({
    onSuccess: () => {
      notification.success(authNotifications.changePasswordSuccess)
    },
    onError: () => {
      notification.error(authNotifications.changePasswordError)
    },
  })

  const onUpdateProfile = async (values: TUpdateProfileSchema) =>
    await updateProfile.mutateAsync(values)
  const onChangePassword = async (values: TChangePasswordSchema) =>
    await changePassword.mutateAsync(values)

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Avatar
            size={80}
            style={{ background: '#4f46e5', fontSize: 28, flexShrink: 0 }}
            icon={<UserOutlined />}
          >
            {getInitials(user.firstName, user.lastName)}
          </Avatar>
          <div className="text-center sm:text-left">
            <Title level={4} style={{ margin: 0 }}>
              {user.firstName} {user.lastName}
            </Title>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <MailOutlined className="text-gray-400 text-sm" />
              <Text type="secondary">{user.email}</Text>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-1 mt-2">
              {user.roles.map((role) => (
                <span
                  key={role.id}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700"
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileForm onUpdateProfile={onUpdateProfile} isPending={updateProfile.isPending} />
        <ChangePasswordForm
          onChangePassword={onChangePassword}
          isPending={changePassword.isPending}
        />
      </div>

      <ProfileRoles />
    </div>
  )
}

export default ProfilePage
