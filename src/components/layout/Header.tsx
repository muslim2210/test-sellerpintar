'use client'

import { useAuthStore } from '@/stores/auth-store'
import React from 'react'
import Wrapper from './Wrapper'
import Logo from '../fragments/Logo'
import LogoLogin from '../fragments/LogoLogin'
import UserAvatar from '../fragments/UserAvatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import Link from 'next/link'
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

interface HeaderProps {
  isLogoWhite: boolean;
}

const Header = ({ isLogoWhite }: HeaderProps) => {
  const auth = useAuthStore()
  const router = useRouter()
  const handleLogout = () => {
    router.push('/auth/login')
    auth.clearAuth()
    
  }

  return (
    <div className={`w-full bg-transparent absolute z-50 top-0 right-0 left-0 ${!isLogoWhite ? 'border-b border-slate-200' : ''}`}>
     <Wrapper className='flex flex-row justify-between items-center px-3 md:px-6 lg:px-16 h-[70px]'>
      {isLogoWhite ? <Logo /> : <LogoLogin />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex flex-row gap-2 items-center cursor-pointer'>
          <UserAvatar name={auth.user?.username || 'User Name'} size={23} />
          <span className={`text-base font-medium ${isLogoWhite ? 'text-white' : 'text-slate-900'}`}>{auth.user?.username}</span>
        </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]" align="end">
          <Link href="/user">
            <DropdownMenuItem>
              My Account
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => {
              e.preventDefault(); 
              document.getElementById("logout-dialog-trigger")?.click();
            }} className='text-red-500 '>
            <LogOut size={16} className='text-red-500'/>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        
      <Dialog>
        <DialogTrigger asChild>
          <button id="logout-dialog-trigger" className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
     </Wrapper>
    </div>
  )
}

export default Header
