'use client'
import AuthGuard from '@/components/guards/AuthGuards'
import HeaderAdmin from '@/components/layout/HeaderAdmin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { deleteCategory, useFetchCategoriesAdmin } from '@/lib/api/useFetchCategories'
import { CategoriModel } from '@/types/categories'
import { Search } from 'lucide-react'
import React, {  useEffect, useState } from 'react'
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LoadingTable from '@/components/loading/LoadingTable'
import { formatedDate } from '@/hooks/useDate'
import Pagination from '@/components/fragments/Pagination'
import { DialogCategoryForm } from '@/components/categories/DialogCreateCategory'
import { useRouter } from 'next/navigation'
import { de } from 'zod/v4/locales'

const AdminCategoryPage = () => {
  const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const router = useRouter()
    const debouncedSearch = useDebounce(search, 400) // debounce 400ms
    const [shouldRefresh, setShouldRefresh] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoriModel | null>(null)

    
  
    // ✅ Fetch Artikel
    const { data, loading, total } = useFetchCategoriesAdmin({
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearch,
    })
  
    const totalPages = Math.ceil(total / itemsPerPage)
  
    // Reset page ketika filter/search berubah
    React.useEffect(() => {
      setCurrentPage(1)
    }, [debouncedSearch])

    useEffect(() => {
    if (shouldRefresh) {
      router.refresh()
      setShouldRefresh(false)
    }
  }, [shouldRefresh, router])

  const handleClickDelete = (id: string) => {
    deleteCategory(id)
    window.alert('Category deleted successfully')
    window.location.reload()
  }

  return (
    <AuthGuard allowedRole="Admin">
      <HeaderAdmin titlePage="Categories" />
      <div className='px-3 bg-gray-100 min-h-screen pt-3'>
        <div className='rounded-md bg-white w-full shadow-sm mb-8'>
          {/* title dan filter start */}
          <div className='border-b border-gray-200 px-3 py-4'>
            <h5 className='text-base font-semibold text-slate-900'>Total Categories : {total}</h5>
          </div>
          <div className='flex flex-row justify-between px-3 py-4'>
                     
            <div className="w-[300px]">
              <div className='relative'>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search Category"
                  className="bg-white text-slate-600 pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
              
            <Button className='cursor-pointer' onClick={() => document.getElementById('create-category-btn')?.click()}>
              <Plus />
              Add Category
            </Button>
 
          </div>
          {/* title dan filter end */}
            {/* table */}
          <Table>
            <TableHeader className='bg-gray-100'>
              <TableRow>
                <TableHead className="pl-5 text-center">Category</TableHead>
                <TableHead className="text-center">CreatedAt</TableHead>
                <TableHead className="text-center pr-5">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <LoadingTable key={index} />
                ))
              ) : (
                data.map((category: CategoriModel) => (           
                  <TableRow key={category.id}>
                    <TableCell className='text-center pl-5'>
                      {category.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatedDate(category.createdAt)}
                    </TableCell>
                    <TableCell className="pr-5">
                      <div className='flex flex-row gap-2 flex-nowrap justify-center items-center'>
                      <span>
                        <button className='text-underline text-blue-600 p-0 bg-transparent cursor-pointer' onClick={() => {
                          setSelectedCategory(category)
                          document.getElementById('edit-category-trigger')?.click()
                        }}>Edit</button>
                      </span>
                      <span>
                        <button className='text-underline text-red-600 p-0 bg-transparent cursor-pointer' onClick={() => {
                          handleClickDelete(category.id)
                        }}>Delete</button>
                      </span>
                      </div>
                    </TableCell>
                  </TableRow>       
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className='py-5'>
            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
          </div>
        </div>

        <DialogCategoryForm
          triggerId="create-category-btn"
          mode="create"
          onSuccess={() => window.location.reload()}
        />

        {selectedCategory && (
          <DialogCategoryForm
            triggerId="edit-category-trigger"
            mode="edit"
            categoryId={selectedCategory.id}
            initialData={{ name: selectedCategory.name }}
            onSuccess={() => window.location.reload()}
          />
        )}  
    </AuthGuard>
  )
}

export default AdminCategoryPage
