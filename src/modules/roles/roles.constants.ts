export const rolesNotifications = {
  createRoleSuccess: { message: 'Rol Oluşturuldu', description: 'Rol başarıyla oluşturuldu.' },
  createRoleError: { message: 'Oluşturma Başarısız', description: 'Rol oluşturulurken bir hata oluştu. Rol adı zaten kullanımda olabilir.' },
  updateRoleSuccess: { message: 'Rol Güncellendi', description: 'Rol başarıyla güncellendi.' },
  updateRoleError: { message: 'Güncelleme Başarısız', description: 'Rol güncellenirken bir hata oluştu. Rol adı zaten kullanımda olabilir.' },
  deleteRoleSuccess: { message: 'Rol Silindi', description: 'Rol başarıyla silindi.' },
  deleteRoleError: { message: 'Silme Başarısız', description: 'Rol silinirken bir hata oluştu. Lütfen tekrar deneyin.' },
} as const

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
