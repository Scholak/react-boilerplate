import type { TPermission } from '@/core/lib/permissions'

import { useAuth } from '@/modules/auth/auth.hooks'

export function useHasPermission(permission: TPermission): boolean {
  const { data: user } = useAuth()
  return user?.permissions?.includes(permission) ?? false
}
