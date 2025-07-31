import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Wrapper from '@/components/layout/Wrapper'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const RegisterPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
        <div className='bg-white p-3 rounded-xl shadow-lg'>
            <Wrapper className='py-2'>
                <div className='flex flex-col gap-3 justify-center py-5'>  
                    <h1 className='text-center font-extrabold text-4xl mb-2'>Register</h1>
                    <span>Let’s Sign up first for enter into Square Website. Uh She Up!</span>
                    <div className='mt-10 flex flex-col gap-4'>
                      <div className="w-full">
                          <Input id="username" type="text" placeholder='User Name'/>
                      </div>
                      <div className='w-full'>
                          <Select>
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Role" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectGroup>
                                  <SelectLabel>Fruits</SelectLabel>
                                  <SelectItem value="apple">Spain</SelectItem>
                                  <SelectItem value="banana">Indonesia</SelectItem>
                                  <SelectItem value="blueberry">Malaysia</SelectItem>
                                  <SelectItem value="grapes">USA</SelectItem>
                                  <SelectItem value="pineapple">England</SelectItem>
                                  </SelectGroup>
                              </SelectContent>
                          </Select>
                      </div>
                      <div className='flex flex-row justify-between gap-4'>
                          <div className='flex-1'>
                              <Input id="password" type="text" placeholder='Password'/>
                          </div>
                          <div className='flex-1'>
                              <Input id="confirm_password" type="text" placeholder='Confirm Password'/>
                          </div>
                      </div>
                    </div>
                   
                    <div className='flex flex-row gap-4 mt-5'>
                        <Link href="/auth/login" className='cursor-pointer'>
                            <Button className=' bg-gray-400 cursor-pointer hover:bg-gray-500 w-[100px]'>
                            Login
                            </Button>
                        </Link>
                        <Button className='flex-1 bg-blue-500 cursor-pointer hover:bg-blue-600'>Register</Button>
                    </div>
                </div>
            </Wrapper>
        </div>
    </div>
  )
}

export default RegisterPage