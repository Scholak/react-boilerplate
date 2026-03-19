export const validationMessages = {
  firstName: { required: 'Ad alanı zorunludur' },
  lastName: { required: 'Soyad alanı zorunludur' },
  email: { invalid: 'Geçersiz e-posta adresi' },
  password: { required: 'Şifre alanı zorunludur' },
  newPassword: {
    required: 'Şifre alanı zorunludur',
    min: 'Şifre en az 8 karakter olmalıdır',
    uppercase: 'Şifre en az bir büyük harf içermelidir',
    number: 'Şifre en az bir rakam içermelidir',
  },
  currentPassword: { required: 'Mevcut şifre alanı zorunludur' },
  confirmPassword: {
    required: 'Şifre tekrar alanı zorunludur',
    match: 'Şifreler eşleşmiyor',
  },
  token: { required: 'Token alanı zorunludur' },
} as const

export const queryKeys = {
  auth: ['auth', 'user'] as const,
}

export const endpoints = {
  signIn: '/auth/sign-in',
  signOut: '/auth/sign-out',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  me: '/auth/me',
  getToken: '/auth/get-token',
  updateProfile: '/auth/profile',
  changePassword: '/auth/profile/password',
} as const
