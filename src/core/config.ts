export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  appName: (import.meta.env.VITE_APP_NAME as string) || 'React Boilerplate',
}
