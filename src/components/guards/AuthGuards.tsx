'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'

type Props = {
  allowedRole: 'admin' | 'user'
  children: React.ReactNode
}

export default function AuthGuard({ allowedRole, children }: Props) {
  const router = useRouter()
  const { token, role } = useAuthStore()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!token) {
      router.replace('/auth/login')
      return
    }

    if (allowedRole === 'user') {
      // Admin boleh masuk ke halaman user
      if (role === 'user' || role === 'admin') {
        setChecked(true)
      } else {
        router.replace('/auth/login')
      }
    } else if (allowedRole === 'admin') {
      if (role === 'admin') {
        setChecked(true)
      } else {
        router.replace('/')
      }
    }
  }, [token, role, router, allowedRole])

  if (!checked) return <div className="text-center p-4">Checking auth...</div>

  return <>{children}</>
}
