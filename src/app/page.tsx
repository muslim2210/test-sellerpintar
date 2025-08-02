'use client'

import React, { useMemo, useState } from 'react'
import Wrapper from '@/components/layout/Wrapper'
import Pagination from '@/components/fragments/Pagination'
import AuthGuard from '@/components/guards/AuthGuards'
import { LoadingCardCatalog } from '@/components/loading/LoadingCardCatalog'
import { ArticleModel } from '@/types/articles'
import { useDebounce } from '@/hooks/useDebounce'
import { useFetchCategories } from '@/lib/api/useFetchCategories'
import { CategoriModel } from '@/types/categories'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ArticleCard from '@/components/fragments/ArticleCard'
import HeroTitle from '@/components/articles/HeroTitle'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Logo from '@/components/fragments/Logo'
import { useFetchArticlesNew } from '@/lib/api/useFetchArticlesNew'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<string | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

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
    <AuthGuard allowedRole="User">
      {/* hero section */}
      <div className="w-full h-[500px] bg-[url('/img/hero-image.jpg')] bg-cover">
        <div className='bg-[#2563EB] opacity-[86%] w-full h-full flex flex-col gap-10 justify-center items-center relative'>
          <div className='absolute top-0 left-0 right-0 max-w-screen-xl w-full mx-auto px-16 bg-transparent h-[80px] z-10 flex items-center justify-between'>
            <Logo/>
          </div>
          <HeroTitle/>
          <div className='bg-blue-500 rounded-md p-2 flex gap-1'>
             {/* Filter by Category */}
            <Select
              value={categoryId || "all"}
              onValueChange={(val) => setCategoryId(val === "all" ? undefined : val)}
            >
              <SelectTrigger className="w-[180px] bg-white cursor-pointer">
                <SelectValue placeholder="Select Category" />
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
            <div className="w-[400px]">
              <div className='relative'>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="bg-white text-slate-600 pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Wrapper className="mt-10 pb-[160px] relative">
        <div className="text-gray-800 flex flex-col gap-2 mb-5">
          <h5 className="font-medium text-gray-500 text-base">
            Showing : {data.length} of {total ?? 0} articles
          </h5>
        </div>

        {/* Grid Articles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 mt-5">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingCardCatalog key={index} />
            ))
          ) : (
            data.map((article: ArticleModel) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                category={article.category.name}
                imageUrl={article.imageUrl}
                createdAt={article.createdAt}
                content={article.content}
                href={`/article/${article.id}`}
              />
            ))
          )}
          
        </div>

        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* footer */}
      </Wrapper>
        <div className='absolute bottom-0 left-0 right-0 bg-[#2563EB] w-full mx-auto h-[100px] flex gap-3 items-center justify-center'>
          <Logo/>
          <p className='text-white text-base font-normal'>© 2025 Blog genzet. All rights reserved.</p>
        </div>
    </AuthGuard>
  )
}

export default HomePage
