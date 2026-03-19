import { QueryClient } from '@tanstack/react-query'

export const ACCESS_TOKEN_KEY = ['auth', 'accessToken'] as const

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = (error as { response?: { status?: number } })?.response?.status
        if (status && status >= 400) return false
        return failureCount < 1
      },
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
})
