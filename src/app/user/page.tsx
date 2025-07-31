import AuthGuard from '@/components/guards/AuthGuards'
import React from 'react'

const UserPage = () => {
  return (
    <AuthGuard allowedRole="Admin">
      <div>
        user page
      </div>
    </AuthGuard>
  )
}

export default UserPage
