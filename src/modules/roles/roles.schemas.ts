import { z } from 'zod'

import { PERMISSIONS } from '@/core/lib/permissions'

const validPermissionKeys = Object.values(PERMISSIONS) as [string, ...string[]]

export const createRoleSchema = z.object({
  name: z.string().min(1, 'Rol adı zorunludur'),
  permissions: z.array(z.enum(validPermissionKeys)).default([]),
})

export const updateRoleSchema = z.object({
  name: z.string().min(1, 'Rol adı zorunludur'),
  permissions: z.array(z.enum(validPermissionKeys)).default([]),
})

export type TCreateRoleSchema = z.output<typeof createRoleSchema>
export type TUpdateRoleSchema = z.output<typeof updateRoleSchema>
export type TCreateRoleSchemaInput = z.input<typeof createRoleSchema>
export type TUpdateRoleSchemaInput = z.input<typeof updateRoleSchema>
