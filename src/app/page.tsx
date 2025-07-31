'use client'

import AuthGuard from '@/components/guards/AuthGuards'

export default function HomePage() {
  return (
    <AuthGuard allowedRole="user">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Selamat datang, User!</h1>
        {/* Di sini nanti list artikel user */}
        halaman list article
      </div>
    </AuthGuard>
  )

}
