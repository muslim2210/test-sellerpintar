'use client'

import LoadingSpinner from '@/components/loading/LoadingSpinner'
import { useFetchArticleDetail } from '@/lib/api/useFetchArticlesNew'
import { use } from 'react'

const ArticleDetailPage = (props: { params: Promise<{ articleId: string }> }) => {
  const { articleId } = use(props.params)
  const { data, loading, error } = useFetchArticleDetail(articleId)

  if (error) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold'>Failed to load article</h1>
        <p className='text-lg'>{error.message}</p>
      </div>
    )
  }
  if (loading) {
    return (
      <LoadingSpinner/>
    )
  } else {
    return (
      <div className='flex flex-col gap-3 items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold'>{data?.title}</h1>
        <p className='text-lg'>{data?.content}</p>
      </div>
    )
  }
  
}

export default ArticleDetailPage
