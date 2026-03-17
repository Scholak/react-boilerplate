export const validationMessages = {
  firstName: { required: 'Ad alanı zorunludur' },
  lastName: { required: 'Soyad alanı zorunludur' },
  email: { invalid: 'Geçersiz e-posta adresi' },
  password: {
    min: 'Şifre en az 8 karakter olmalıdır',
    uppercase: 'Şifre en az bir büyük harf içermelidir',
    number: 'Şifre en az bir rakam içermelidir',
  },
  confirmPassword: {
    required: 'Şifre tekrar alanı zorunludur',
    match: 'Şifreler eşleşmiyor',
  },
} as const

export const queryKeys = {
  list: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
}

export const endpoints = {
  list: '/users',
  getOne: (userId: string) => `/users/${userId}`,
  create: '/users',
  update: (userId: string) => `/users/${userId}`,
  remove: (userId: string) => `/users/${userId}`,
}
