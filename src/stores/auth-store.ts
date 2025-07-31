import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  role: 'admin' | 'user' | null
  setAuth: (token: string, role: 'admin' | 'user') => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      setAuth: (token, role) => set({ token, role }),
      clearAuth: () => set({ token: null, role: null }),
    }),
    {
      name: 'auth-store', // key di localStorage
    }
  )
)
