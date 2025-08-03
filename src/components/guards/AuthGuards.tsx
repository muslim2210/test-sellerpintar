'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { getProfile } from '@/lib/api/get-profile'
import { useAuthHasHydrated } from '@/hooks/useAuthHasHydrated'

type Props = {
  allowedRole: 'Admin' | 'User'
  children: React.ReactNode
}

export default function AuthGuard({ allowedRole, children }: Props) {
  const router = useRouter()
  const { token, user, role } = useAuthStore()
  const hydrated = useAuthHasHydrated()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!hydrated) return

    const validateAuth = async () => {
      if (!token) {
        router.replace('/auth/login')
        return
      }

      try {
        if (!user) {
          await getProfile()
        }

        const currentRole = role || useAuthStore.getState().user?.role
        console.warn('CURRENT ROLE', currentRole)

        if (allowedRole === 'Admin') {
          if (currentRole === 'Admin') {
            setChecked(true)
          } else {
            router.replace('/')
          }
        } else if (allowedRole === 'User') {
          if (currentRole === 'User' || currentRole === 'Admin') {
            setChecked(true)
          } else {
            router.replace('/auth/login')
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('AUTH GUARD ERROR', error.response || error)
        router.replace('/auth/login')
      }
    }

    validateAuth()
  }, [hydrated, token, user, role, allowedRole, router])

  if (!hydrated || !checked) return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
    </div>
  )

  return <div className='relative w-full'>{children}</div>
}
