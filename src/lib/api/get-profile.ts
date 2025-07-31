import { api } from '../api'
import { useAuthStore } from '@/stores/auth-store'

export async function getProfile() {
  try {
    console.log('[GET PROFILE] called...')
    const res = await api.get('/auth/profile')
    const user = res.data

    console.info('[GET PROFILE] success:', user)

    // Simpan user ke store
    return useAuthStore.getState().setUser(user)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const status = err?.response?.status
    const message = err?.response?.data?.message || 'Session expired or invalid'

    console.error('[GET PROFILE] error:', status, message)

    // Jika unauthorized (401), clear token & user
    if (status === 401 || status === 403) {
      useAuthStore.getState().clearAuth()
    }

    throw new Error(message)
  }
}
