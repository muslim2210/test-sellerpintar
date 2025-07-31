'use client'
import AuthGuard from '@/components/guards/AuthGuards'
import { useAuthStore } from '@/stores/auth-store'
import React from 'react'

const AdminPage = () => {
  const { token, user } = useAuthStore()
  console.log('TOKEN DI HALAMAN:', token)
  console.log('USER DI HALAMAN:', user)
  return (
    <AuthGuard allowedRole="Admin">
      <div>
        admin page
      </div>
    </AuthGuard>
  )
}

export default AdminPage
