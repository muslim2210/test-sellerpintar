'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button' // pakai button buatan kamu

const LogoutButton = () => {
  const router = useRouter()
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = () => {
    clearAuth()             // Hapus token, user, dan role dari store & localStorage
    router.replace('/auth/login')  // Arahkan ke halaman login
  }

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
      Logout
    </Button>
  )
}

export default LogoutButton
