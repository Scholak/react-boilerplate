import { Button, Input, Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { signInSchema, type TSignInSchema } from '@/modules/auth/auth.schemas'

const { Title, Text } = Typography

type TSignInFormProps = {
  onSignIn: (values: TSignInSchema) => Promise<unknown>
  isPending: boolean
}

export function SignInForm({ onSignIn, isPending }: TSignInFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) })

  return (
    <form onSubmit={handleSubmit(onSignIn)} className="space-y-5">
      <div className="mb-6">
        <Title level={4} style={{ marginBottom: 4 }}>
          Tekrar hoş geldiniz
        </Title>
        <Text type="secondary">Devam etmek için hesabınıza giriş yapın.</Text>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">E-posta</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="siz@ornek.com"
              status={errors.email ? 'error' : ''}
              size="large"
            />
          )}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Şifre</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="••••••••"
              status={errors.password ? 'error' : ''}
              size="large"
            />
          )}
        />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
          Şifremi unuttum?
        </Link>
      </div>

      <Button type="primary" htmlType="submit" block size="large" loading={isPending}>
        Giriş Yap
      </Button>
    </form>
  )
}
