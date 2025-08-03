'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import  Wrapper from '@/components/layout/Wrapper'
import Link from 'next/link'
import React from 'react'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AuthRegister } from '@/lib/api/auth-register'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type RegisterForm = {
  username: string
  password: string
  role: string
}

const RegisterPage = () => {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RegisterForm>()
  const onSubmit = async (data: RegisterForm) => {
    try {
      await AuthRegister(data.username, data.password, data.role)
      window.alert('Register Success')
      router.push('/auth/login')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 px-4">
        <div className='bg-white rounded-xl shadow-lg p-3 w-[450px]'>  
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center py-3 '>
                <h1 className='text-center font-extrabold text-4xl mb-2'>Register</h1>
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
                <div className="grid w-full max-w-md items-center gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={(val) => setValue('role', val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                            
                        </SelectContent>
                    </Select>
                    {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                </div>
                
                       
                <Button  className='w-full bg-blue-500 cursor-pointer hover:bg-blue-600 mt-12'>
                    {isSubmitting ? 'loading...' : 'Register'}
                </Button>
                <div className='mt-4 py-2 font-medium text-center '>
                    <span>Already have an account? <Link href="/auth/login" className='cursor-pointer text-blue-600 text-underline'>Login</Link></span>
                </div>
            </form>    
        </div>
    </div>
  )
}

export default RegisterPage