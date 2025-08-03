'use client'
import UserAvatar from '@/components/fragments/UserAvatar'
import AuthGuard from '@/components/guards/AuthGuards'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Wrapper from '@/components/layout/Wrapper'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserPage = () => {
  const auth = useAuthStore()
  const router = useRouter()

  const redirectHome = () => {
    if (auth.user?.role === "Admin") {
     return router.push('/admin/articles')
    } else {
      return router.push('/')
    }
  }

  return (
    <AuthGuard allowedRole="User">
      <Header isLogoWhite={false} />
      <Wrapper className='px-3 md:px-6 lg:px-16 min-h-screen flex justify-center pt-12'>
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
          <Button onClick={redirectHome} className='w-full mt-5 cursor-pointer'>
            Back to Home
          </Button>
        </div>
      </Wrapper>
      <Footer/>
    </AuthGuard>
  )
}

export default UserPage
