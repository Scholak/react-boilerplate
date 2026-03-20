import { useNavigate } from '@tanstack/react-router'
import { Button, Typography } from 'antd'

import { config } from '@/core/config'

const { Text, Title } = Typography

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #f0f4ff 100%)' }}
    >
      <div
        className="w-full bg-white rounded-2xl px-10 pt-9 pb-8"
        style={{
          maxWidth: 520,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 50px -10px rgba(79,70,229,0.12)',
          border: '1px solid rgba(79,70,229,0.08)',
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
          <Text style={{ fontSize: 13, fontWeight: 500, color: '#6b7280' }}>
            {config.appName}
          </Text>
        </div>

        {/* Status badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 rounded-md py-[3px] px-2.5 text-xs font-semibold text-indigo-600 tracking-wide font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block shrink-0" />
            HTTP 404
          </span>
        </div>

        {/* Heading */}
        <Title level={3} style={{ margin: '0 0 10px', color: '#111827', fontWeight: 700, lineHeight: 1.2 }}>
          Sayfa Bulunamadı
        </Title>
        <Text style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, display: 'block', marginBottom: 28 }}>
          Talep ettiğiniz kaynak bu sunucuda mevcut değil ya da kalıcı olarak kaldırılmış
          olabilir. Girdiğiniz adresi kontrol ederek tekrar deneyiniz.
        </Text>

        {/* Metadata */}
        <div className="flex items-center gap-4 px-3.5 py-2.5 bg-gray-50 rounded-lg border border-gray-100 mb-7">
          <div className="flex flex-col gap-0.5">
            <Text style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>
              Hata Kodu
            </Text>
            <Text style={{ fontSize: 12, color: '#374151', fontFamily: 'monospace', fontWeight: 500 }}>
              Not Found
            </Text>
          </div>
          <div className="w-px h-7 bg-gray-200" />
          <div className="flex flex-col gap-0.5">
            <Text style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>
              Zaman Damgası
            </Text>
            <Text style={{ fontSize: 12, color: '#374151', fontFamily: 'monospace', fontWeight: 500 }}>
              {new Date().toLocaleString('tr-TR')}
            </Text>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <Button
            type="primary"
            style={{ borderRadius: 8, fontWeight: 500 }}
            onClick={() => navigate({ to: '/' })}
          >
            Ana Sayfaya Dön
          </Button>
          <Button
            style={{ borderRadius: 8, fontWeight: 500 }}
            onClick={() => window.history.back()}
          >
            Geri Git
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
