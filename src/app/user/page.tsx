'use client'
import UserAvatar from '@/components/fragments/UserAvatar'
import AuthGuard from '@/components/guards/AuthGuards'
import Header from '@/components/layout/Header'
import Wrapper from '@/components/layout/Wrapper'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import Link from 'next/link'
import React from 'react'

const UserPage = () => {
  const auth = useAuthStore()

  return (
    <AuthGuard allowedRole="User">
      <Header isLogoWhite={false} />
      <Wrapper className='px-3 md:px-6 lg:px-16 min-h-screen flex justify-center'>
        <div className='flex flex-col gap-3 justify-center items-center my-2 max-w-[368px]'>
          <h1 className='text-xl font-semibold text-center'>User Profile</h1>
          <UserAvatar name={auth.user?.username || 'User Name'} size={60} />
          <div className='bg-blue-200 rounded-sm h-[44px] grid-cols-3 grid items-center px-3 w-full mt-5'>
            <span className='font-semibold'>Username</span>
            <span>:</span>
            <span>{auth.user?.username}</span>
          </div>
          <div className='bg-blue-200 rounded-sm h-[44px] grid-cols-3 grid items-center px-3 w-full'>
            <span className='font-semibold'>Role</span>
            <span>:</span>
            <span>{auth.user?.role}</span>
          </div>
          <Button className='w-full mt-5 cursor-pointer'>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Wrapper>
    </AuthGuard>
  )
}

export default UserPage
