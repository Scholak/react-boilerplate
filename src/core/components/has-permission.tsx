import { useHasPermission } from '@/core/hooks/use-has-permission'
import type { TPermission } from '@/core/lib/permissions'

type TProps = {
  permission: TPermission
  children: React.ReactNode
  fallback?: React.ReactNode
}

const HasPermission = ({ permission, children, fallback = null }: TProps) => {
  const hasPermission = useHasPermission(permission)
  return hasPermission ? <>{children}</> : <>{fallback}</>
}

export default HasPermission
