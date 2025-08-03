'use client'

import React, { useState } from 'react'
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
import { useFetchArticlesNew } from '@/lib/api/useFetchArticlesNew'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
          <Header isLogoWhite/>
          <HeroTitle/>
          <div className='bg-blue-500 rounded-md p-2 flex flex-col gap-2 not-first:lg:flex-row md:gap-1'>
             {/* Filter by Category */}
            <Select
              value={categoryId || "all"}
              onValueChange={(val) => setCategoryId(val === "all" ? undefined : val)}
            >
              <SelectTrigger className="w-full lg:w-[180px] bg-white cursor-pointer">
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
            <div className="w-full lg:w-[400px]">
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
      <Wrapper className="my-10 relative">
        <div className="text-gray-800 flex flex-col gap-2 mb-5">
          <h5 className="font-medium text-gray-500 text-base">
            Showing : {data.length} of {total ?? 0} articles
          </h5>
        </div>

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10 mt-5">
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
                href={`/articles/${article.id}`}
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

        </Wrapper>
        <Footer/>
    </AuthGuard>
  )
}

export default HomePage
