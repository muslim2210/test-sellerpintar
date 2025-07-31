import { UserModel } from '@/types/users'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  user: UserModel | null
  role: 'Admin' | 'User' | null
  setAuth: (token: string, role: 'Admin' | 'User', user?: UserModel) => void
  setUser: (user: UserModel) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,

      setAuth: (token, role, user) =>
        set({
          token,
          role,
          user: user ?? null,
        }),

      setUser: (user) => set({ user, role: user.role }),

      clearAuth: () => set({ token: null, user: null, role: null }),
    }),
    {
      name: 'auth-store',
      onRehydrateStorage: () => () => {
        console.log('[auth-store] hydrated')
      },
    }
  )
)
