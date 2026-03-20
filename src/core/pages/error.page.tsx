import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button, Typography } from 'antd'

import { config } from '@/core/config'

const { Text, Title } = Typography

const ErrorPage = ({ error }: { error?: Error }) => {
  const router = useRouter()
  const navigate = useNavigate()

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #fff1f2 0%, #f8fafc 50%, #fef2f2 100%)' }}
    >
      <div
        className="w-full bg-white rounded-2xl px-10 pt-9 pb-8"
        style={{
          maxWidth: 520,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 50px -10px rgba(220,38,38,0.1)',
          border: '1px solid rgba(220,38,38,0.08)',
        }}
      >
        {/* App header */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="flex items-center justify-center shrink-0 rounded-lg"
            style={{
              width: 30,
              height: 30,
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              boxShadow: '0 2px 8px rgba(79,70,229,0.35)',
            }}
          >
            <span className="text-white font-bold text-xs">
              {config.appName.charAt(0).toUpperCase()}
            </span>
          </div>
          <Text style={{ fontSize: 13, fontWeight: 500, color: '#6b7280' }}>{config.appName}</Text>
        </div>

        {/* Status badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-md py-1 px-2.5 text-xs font-semibold text-red-600 tracking-wide font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block shrink-0" />
            HTTP 500
          </span>
        </div>

        {/* Heading */}
        <Title
          level={3}
          style={{ margin: '0 0 10px', color: '#111827', fontWeight: 700, lineHeight: 1.2 }}
        >
          Sistem Hatası
        </Title>
        <Text
          style={{
            fontSize: 14,
            color: '#6b7280',
            lineHeight: 1.7,
            display: 'block',
            marginBottom: error?.message ? 16 : 28,
          }}
        >
          İşleminiz gerçekleştirilirken beklenmeyen bir hata oluştu. Sorun devam etmesi halinde
          sistem yöneticinizle iletişime geçiniz.
        </Text>

        {/* Error detail */}
        {error?.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 mb-7 text-xs font-mono text-red-900 wrap-break-word leading-relaxed">
            {error.message}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 px-3.5 py-2.5 bg-gray-50 rounded-lg border border-gray-100 mb-7">
          <div className="flex flex-col gap-0.5">
            <Text
              style={{
                fontSize: 10,
                color: '#9ca3af',
                fontWeight: 600,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              Hata Kodu
            </Text>
            <Text
              style={{ fontSize: 12, color: '#374151', fontFamily: 'monospace', fontWeight: 500 }}
            >
              Internal Server Error
            </Text>
          </div>
          <div className="w-px h-7 bg-gray-200" />
          <div className="flex flex-col gap-0.5">
            <Text
              style={{
                fontSize: 10,
                color: '#9ca3af',
                fontWeight: 600,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              Zaman Damgası
            </Text>
            <Text
              style={{ fontSize: 12, color: '#374151', fontFamily: 'monospace', fontWeight: 500 }}
            >
              {new Date().toLocaleString('tr-TR')}
            </Text>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <Button
            type="primary"
            danger
            style={{ borderRadius: 8, fontWeight: 500 }}
            onClick={() => router.invalidate()}
          >
            Yeniden Dene
          </Button>
          <Button
            style={{ borderRadius: 8, fontWeight: 500 }}
            onClick={() => navigate({ to: '/' })}
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
