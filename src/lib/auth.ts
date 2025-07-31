import { api } from './api'
import { useAuthStore } from '@/stores/auth-store'

export async function login(email: string, password: string) {
  const res = await api.post('/auth/login', { email, password })
  const { token, role } = res.data
  useAuthStore.getState().setAuth(token, role)
  return role
}

export function logout() {
  useAuthStore.getState().clearAuth()
}
