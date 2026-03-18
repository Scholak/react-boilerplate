import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { ConfigProvider, theme } from 'antd'
import trTR from 'antd/locale/tr_TR'
import { queryClient } from '@/core/lib/query-client'
import { router } from '@/core/router'

export default function AppRoot() {
  return (
    <ConfigProvider
      locale={trTR}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#4f46e5',
          borderRadius: 8,
          fontFamily: '"Poppins", sans-serif',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  )
}
