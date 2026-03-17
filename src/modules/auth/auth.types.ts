export type TAuthUser = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export type TCurrentUser = TAuthUser & {
  createdAt: string
  updatedAt: string
}

export type TSignInResponse = {
  accessToken: string
  user: TAuthUser
}
