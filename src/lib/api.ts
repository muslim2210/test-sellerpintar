import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`

export const api = axios.create({ baseURL })

// Inject token ke header
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
