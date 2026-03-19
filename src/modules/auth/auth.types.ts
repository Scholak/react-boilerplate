export type TAuthRole = {
  id: string
  name: string
  permissions: string[]
}

export type TAuthUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  roles: TAuthRole[]
  permissions: string[]
}

export type TCurrentUser = TAuthUser & {
  createdAt: string
  updatedAt: string
}

export type TSignInResponse = {
  accessToken: string
  user: TAuthUser
}
