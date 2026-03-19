export const queryKeys = {
  list: ['roles'] as const,
  detail: (id: string) => ['roles', id] as const,
  edit: (id: string) => ['roles', id, 'edit'] as const,
}

export const endpoints = {
  list: '/roles',
  getOne: (roleId: string) => `/roles/${roleId}`,
  getOneForEdit: (roleId: string) => `/roles/${roleId}/edit`,
  create: '/roles',
  update: (roleId: string) => `/roles/${roleId}`,
  remove: (roleId: string) => `/roles/${roleId}`,
  assignRoles: (userId: string) => `/users/${userId}/roles`,
  revokeRoles: (userId: string) => `/users/${userId}/roles`,
}
