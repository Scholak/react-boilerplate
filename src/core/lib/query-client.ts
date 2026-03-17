import { QueryClient } from '@tanstack/react-query'

export const ACCESS_TOKEN_KEY = ['auth', 'accessToken'] as const

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
})
