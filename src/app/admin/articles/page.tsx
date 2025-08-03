'use client'
import AuthGuard from '@/components/guards/AuthGuards'
import HeaderAdmin from '@/components/layout/HeaderAdmin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDebounce } from '@/hooks/useDebounce'
import { useFetchArticlesNew } from '@/lib/api/useFetchArticlesNew'
import { useFetchCategories } from '@/lib/api/useFetchCategories'
import { CategoriModel } from '@/types/categories'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
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
import { ArticleModel } from '@/types/articles'
import { formatedDate } from '@/hooks/useDate'
import Link from 'next/link'
import ThumbnailTable from '@/components/articles/ThumbnailTable'
import Pagination from '@/components/fragments/Pagination'

const AdminArticlesPage = () => {
  const [search, setSearch] = useState('')
    const [categoryId, setCategoryId] = useState<string | undefined>()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
  
    const debouncedSearch = useDebounce(search, 400) // debounce 400ms
    
  
    // ✅ Fetch Artikel
    const { data, loading, total } = useFetchArticlesNew({
      page: currentPage,
      limit: itemsPerPage,
      categoryId,
      search: debouncedSearch,
    })
  
    // categories
    const categories = useFetchCategories({fetchAll: true}).data;
  
    const totalPages = Math.ceil(total / itemsPerPage)
  
    // Reset page ketika filter/search berubah
    React.useEffect(() => {
      setCurrentPage(1)
    }, [debouncedSearch, categoryId])
  return (
    <AuthGuard allowedRole="Admin">
      <HeaderAdmin titlePage="Articles" />
      <div className='px-3 bg-gray-100 min-h-screen pt-3'>
        <div className='rounded-md bg-white w-full shadow-sm mb-8'>
          {/* title dan filter start */}
          <div className='border-b border-gray-200 px-3 py-4'>
            <h5 className='text-base font-semibold text-slate-900'>Total Articles : {total}</h5>
          </div>
          <div className='flex flex-row justify-between px-3 py-4'>
            <div className="flex flex-row gap-1">
              <Select
                value={categoryId || "all"}
                onValueChange={(val) => setCategoryId(val === "all" ? undefined : val)}
              >
                <SelectTrigger className="w-[160px] bg-white cursor-pointer">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.data.map((category: CategoriModel) => {
                    // Pastikan setiap id valid
                    if (!category.id) return null;
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <div className="w-[300px]">
                <div className='relative'>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search by title"
                    className="bg-white text-slate-600 pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <Link href={'/admin/articles/create'} >      
              <Button className='cursor-pointer'>
                <Plus />
                Add Article
              </Button>
            </Link>
          </div>
          {/* title dan filter end */}
            {/* table */}
          <Table>
            <TableHeader className='bg-gray-100'>
              <TableRow>
                <TableHead className="pl-3 text-center">Thumbnails</TableHead>
                <TableHead className='text-center w-[225px]'>Title</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">CreatedAt</TableHead>
                <TableHead className="text-center pr-3">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <LoadingTable key={index} />
                ))
              ) : (
                data.map((article: ArticleModel) => (            
                  <TableRow key={article.id}>
                    <TableCell className="font-medium flex justify-center">
                      <ThumbnailTable imgUrl={article.imageUrl} title={article.title} />
                    </TableCell>
                    <TableCell className='text-center max-w-[225px] whitespace-normal break-words'>
                      {article.title}
                    </TableCell>
                    <TableCell className='text-center'>
                      {article?.category?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatedDate(article.createdAt)}
                    </TableCell>
                    <TableCell className="pr-3">
                      <div className='flex flex-row gap-2 flex-nowrap justify-center items-center'>
                      <span>
                        <Link href={`/articles/${article.id}`} className='text-underline text-blue-600'>
                          Preview
                        </Link>
                      </span>
                      <span>
                        <Link href={`/admin/articles/edit/${article.id}`} className='text-underline text-blue-600'>
                          Edit
                        </Link>
                      </span>
                      <span className='text-underline text-red-600'>Delete</span>
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
    </AuthGuard>
  )
}

export default AdminArticlesPage
