'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Wrapper from '@/components/layout/Wrapper'
import Pagination from '@/components/fragments/Pagination'
import AuthGuard from '@/components/guards/AuthGuards'
import { useFetchArticles } from '@/lib/api/useFetchArticles'
import { LoadingCardCatalog } from '@/components/loading/LoadingCardCatalog'
import { ArticleModel } from '@/types/articles'
import { useDebounce } from '@/hooks/useDebounce'
import { useFetchCategories } from '@/lib/api/useFetchCategories'
import { CategoriModel } from '@/types/categories'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<string | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const debouncedSearch = useDebounce(search, 400) // debounce 400ms

  // const isSearching = debouncedSearch.trim() !== ''
  const { data, loading } = useFetchArticles({
    page: currentPage,
    limit: itemsPerPage,
    categoryId,
    search: debouncedSearch,
  })

  const filteredData = useMemo(() => {
  if (!data?.data) return [];

  const result = [...data.data];

  // Tidak perlu filter manual lagi kalau pakai query API
  return result;
  }, [data]);
  console.warn(filteredData)
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0

  useEffect(() => {
    setCurrentPage(1) // reset ke page 1 saat search / category berubah
  }, [debouncedSearch, categoryId])

  // categories
  const categories = useFetchCategories({fetchAll: true}).data;

  return (
    <AuthGuard allowedRole="User">
      <Wrapper className="my-10">
        <div className="text-gray-800 flex flex-col gap-2 mb-5">
          <h5 className="font-medium text-gray-500 text-base">
            Articles / Page ({currentPage}) of {totalPages}
          </h5>
          <h2 className="font-semibold text-gray-700 text-xl md:text-3xl">
            All Posts ({data?.total ?? 0})
          </h2>
        </div>

        {/* Search & Filter */}
        <div className="my-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="w-full md:w-[50%]">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full border border-gray-300 px-4 py-2 text-sm rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter by Category */}
          <Select
            value={categoryId || "all"}
            onValueChange={(val) => setCategoryId(val === "all" ? undefined : val)}
          >
            <SelectTrigger className="w-[280px]">
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
        </div>

        {/* Grid Articles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-5 md:mt-10">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingCardCatalog key={index} />
            ))
          ) : (
            filteredData.map((article: ArticleModel) => (
              <div
                className="w-[300px] h-[400px] rounded-md shadow-md bg-gray-100 p-3"
                key={article.id}
              >
                <h3 className="font-bold mb-1">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.category?.name}</p>
              </div>
            ))
          )}
          
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Wrapper>
    </AuthGuard>
  )
}

export default HomePage
