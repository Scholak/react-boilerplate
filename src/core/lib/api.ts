import axios from 'axios'
import { config } from '@/core/config'
import { queryClient, ACCESS_TOKEN_KEY } from '@/core/lib/query-client'

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
  (error) => {
    if (error.response?.status === 401) {
      queryClient.removeQueries({ queryKey: ACCESS_TOKEN_KEY })
    }
    return Promise.reject(error)
  },
)
