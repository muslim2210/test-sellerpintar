'use client'
import { useAuthStore } from '@/stores/auth-store';
import Logo from '../fragments/Logo';
import { LogOut, Newspaper } from 'lucide-react';
import { Tag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';


const SideBarAdmin = () => {
  const auth = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    router.push('/auth/login')
    auth.clearAuth()
  }

  return (
    <div className="w-[230px] min-h-screen bg-blue-600 px-3 py-4">
      <Logo/>
      <div className="mt-7 flex flex-col">
        <Link href='/admin/articles'>       
        <div className='text-sm flex flex-row items-center gap-2 rounded-md hover:bg-blue-500 cursor-pointer text-white p-2'>
          <Newspaper size={18}/>
          <span>Articles</span>
        </div>
        </Link>
        <Link href='/admin/categories'>
        <div className='text-sm flex flex-row items-center gap-2 rounded-md hover:bg-blue-500 cursor-pointer text-white p-2'>
          <Tag size={18}/>
          <span>Categories</span>
        </div>
        </Link>
        <div className='text-sm flex flex-row items-center gap-2 rounded-md hover:bg-blue-500 cursor-pointer text-white p-2'>
          <LogOut size={18}/>
          <button className='bg-transparent p-0' onClick={() => document.getElementById("logout-dialog-trigger")?.click()}>Logout</button>
        </div>
      </div>

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
    </div>
  )
}

export default SideBarAdmin
