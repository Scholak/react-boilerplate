import { notification } from 'antd'
import axios from 'axios'

import { config } from '@/core/config'
import { queryClient, ACCESS_TOKEN_KEY } from '@/core/lib/query-client'
import { router } from '@/core/router'

let tokenRefreshPromise: Promise<string> | null = null

export const api = axios.create({
  baseURL: config.apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

api.interceptors.request.use((req) => {
  const token = queryClient.getQueryData<string>(ACCESS_TOKEN_KEY)
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 429) {
      notification.error({
        key: 'rate-limit',
        message: 'Çok fazla istek!',
        description: 'Çok fazla istekte bulundunuz biraz bekleyin.',
      })
      return Promise.reject(error)
    }

    if (error.response?.status === 403) {
      notification.error({
        key: 'forbidden',
        message: 'Yetkisiz erişim!',
        description: 'Bu sayfaya erişmeye yetkiniz yok.',
      })
      router.navigate({ to: '/profile' })
      return Promise.reject(error)
    }

    const isSignedOut = new URLSearchParams(window.location.search).get('isSignedOut')

    if (error.response?.status === 401 && !originalRequest._retry && !isSignedOut) {
      originalRequest._retry = true
      try {
        if (!tokenRefreshPromise) {
          tokenRefreshPromise = axios
            .get(`${config.apiUrl}/auth/get-token`, { withCredentials: true })
            .then(({ data }) => data.data.accessToken)
            .finally(() => {
              tokenRefreshPromise = null
            })
        }
        const accessToken = await tokenRefreshPromise
        queryClient.setQueryData(ACCESS_TOKEN_KEY, accessToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch {
        tokenRefreshPromise = null
        queryClient.removeQueries({ queryKey: ACCESS_TOKEN_KEY })
        router.navigate({ to: '/sign-in' })
      }
    }
    return Promise.reject(error)
  },
)
