'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AuthLogin } from '@/lib/api/auth-login'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

type LoginForm = {
  username: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>()
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await AuthLogin(data.username, data.password)
      if (res === 'Admin') {
        router.push('/admin/articles')
      } else {
        router.push('/')
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 px-4">
        <div className='bg-white rounded-xl shadow-lg p-3 w-[450px]'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 justify-center py-3'>
                {/* <h1 className='text-center font-extrabold text-4xl mb-2'>Sign In</h1> */}
                <Image src="/img/logo-login.png" alt="Logo" width={150} height={150} priority className='mx-auto' />
                <div className="grid w-full max-w-md items-center gap-3 mt-8">
                    <Label htmlFor="username">User Name</Label>
                    <Input id="username" type="text" placeholder='User Name' {...register('username', { required: 'User Name is required' })}/>
                    {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                </div>
                <div className="grid w-full max-w-md items-center gap-3">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Your Password'
                    {...register('password', { required: 'Password is required' })}
                    className="pr-10"
                  />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2 cursor-pointer text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                  
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
                        
                <Button  className='w-full bg-blue-500 cursor-pointer hover:bg-blue-600 mt-7'>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <div className='mt-4 py-2 font-medium text-center '>
                    <span>Don&apos;t have an account? <Link href="/auth/register" className='cursor-pointer text-blue-600 text-underline'>Register</Link></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage