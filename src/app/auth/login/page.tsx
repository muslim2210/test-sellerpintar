'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import  Wrapper from '@/components/layout/Wrapper'
import Link from 'next/link'
import React from 'react'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AuthLogin } from '@/lib/api/auth-login'

type LoginForm = {
  username: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>()
  const onSubmit = async (data: LoginForm) => {
    try {
      console.warn(data)
      const role = await AuthLogin(data.username, data.password)

      router.push(role === 'admin' ? '/admin/articles' : '/')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className='bg-white rounded-xl shadow-lg p-3'>
            <Wrapper className='py-2'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 justify-center py-3'>
                    <h1 className='text-center font-extrabold text-4xl mb-2'>Sign In</h1>
                    <span>Just Sign In if you have an account in here. Enjoy your website</span>
                    <div className="grid w-full max-w-md items-center gap-3 mt-8">
                        <Label htmlFor="username">User Name</Label>
                        <Input id="username" type="text" placeholder='User Name' {...register('username', { required: 'User Name is required' })}/>
                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                    </div>
                    <div className="grid w-full max-w-md items-center gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder='Your Password' {...register('password', { required: 'Password is required' })}/>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <div className='flex justify-between mt-2'>
                        <span>Remember me</span>
                        <span className='text-base text-blue-500'>Forgot Password</span>
                    </div>          
                    <Button  className='w-full bg-blue-500 cursor-pointer hover:bg-blue-600'>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <div className='mt-4 py-2 font-medium text-blue-600 text-center '>
                        <Link href="/auth/register" className='cursor-pointer'>Don&apos;t have an account? Sign Up</Link>
                    </div>
                </form>
            </Wrapper>
        </div>
    </div>
  )
}

export default LoginPage