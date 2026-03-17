import { Suspense } from 'react'
import { Outlet } from '@tanstack/react-router'
import { Card, Spin, Typography } from 'antd'
import { config } from '@/core/config'

const { Title } = Typography

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-4">
            <span className="text-white font-bold text-xl">
              {config.appName.charAt(0).toUpperCase()}
            </span>
          </div>
          <Title level={3} style={{ margin: 0 }}>
            {config.appName}
          </Title>
        </div>
        <Card>
          <Suspense
            fallback={
              <div className="flex justify-center py-8">
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Card>
      </div>
    </div>
  )
}
