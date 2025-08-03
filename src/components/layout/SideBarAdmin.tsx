import Logo from '../fragments/Logo';
import { LogOut, Newspaper } from 'lucide-react';
import { Tag } from 'lucide-react';


const SideBarAdmin = () => {

  return (
    <div className="w-[230px] min-h-screen bg-blue-600 px-3 py-4">
      <Logo/>
      <div className="mt-7 flex flex-col">
        <div className='text-sm flex flex-row items-center gap-2 rounded-md hover:bg-blue-500 cursor-pointer text-white p-2'>
          <Newspaper size={18}/>
          <span>Articles</span>
        </div>
        <div className='text-sm flex flex-row items-center gap-2 rounded-md hover:bg-blue-500 cursor-pointer text-white p-2'>
          <Tag size={18}/>
          <span>Categories</span>
        </div>
        <div className='text-sm flex flex-row items-center gap-2 rounded-md hover:bg-blue-500 cursor-pointer text-white p-2'>
          <LogOut size={18}/>
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default SideBarAdmin
