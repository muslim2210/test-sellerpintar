
import { useAuthStore } from '@/stores/auth-store'
import { api } from '../api'

export async function AuthLogin(username: string, password: string) {
  try {
    const res = await api.post('/auth/login', {
      username,
      password,
    })

    const { token, role } = res.data
    console.log('APP INFO LOGIN',token, role)

    // Simpan ke store dan localStorage
    useAuthStore.getState().setAuth(token, role)

    return role // bisa dipakai untuk redirect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Login gagal')
  }
}
