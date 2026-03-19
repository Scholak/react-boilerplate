export type TRoleListItem = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type TRole = TRoleListItem & {
  permissions: string[]
}
