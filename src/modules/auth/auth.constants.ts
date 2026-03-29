export const authNotifications = {
  signInSuccess: { message: 'Giriş Başarılı', description: 'Başarıyla giriş yaptınız.' },
  signInError: { message: 'Giriş Başarısız', description: 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.' },
  forgotPasswordSuccess: { message: 'Bağlantı Gönderildi', description: 'E-posta adresiniz kayıtlıysa şifre sıfırlama bağlantısı gönderildi.' },
  forgotPasswordError: { message: 'Bir Hata Oluştu', description: 'İşlem gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.' },
  resetPasswordSuccess: { message: 'Şifre Güncellendi', description: 'Şifreniz başarıyla sıfırlandı. Artık giriş yapabilirsiniz.' },
  resetPasswordError: { message: 'Geçersiz Bağlantı', description: 'Sıfırlama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeniden talep edin.' },
  updateProfileSuccess: { message: 'Profil Güncellendi', description: 'Profil bilgileriniz başarıyla kaydedildi.' },
  updateProfileError: { message: 'Güncelleme Başarısız', description: 'Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.' },
  changePasswordSuccess: { message: 'Şifre Değiştirildi', description: 'Şifreniz başarıyla güncellendi.' },
  changePasswordError: { message: 'Şifre Değiştirilemedi', description: 'Mevcut şifreniz hatalı. Lütfen kontrol ederek tekrar deneyin.' },
  signOutError: { message: 'Çıkış Başarısız', description: 'Çıkış yapılırken bir hata oluştu. Lütfen tekrar deneyin.' },
} as const

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
