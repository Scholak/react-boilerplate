export type TUserRole = {
  id: string
  name: string
  permissions: string[]
}

export type TUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
  createdById: string | null
  updatedById: string | null
  roles: TUserRole[]
}
