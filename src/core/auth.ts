import { queryClient, ACCESS_TOKEN_KEY } from '@/core/lib/query-client'

export const getAuth = () => ({
  accessToken: queryClient.getQueryData<string>(ACCESS_TOKEN_KEY),
})
