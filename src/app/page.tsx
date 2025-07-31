'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'

export default function HomePage() {
  const router = useRouter()
  const { role } = useAuthStore()

  useEffect(() => {
    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'user') {
      router.push('/user')
    } else {
      router.push('/auth/login')
    }
  }, [role, router])

  return null


}
