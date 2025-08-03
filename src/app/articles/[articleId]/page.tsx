'use client'

import OthersArticles from '@/components/articles/OthersArticles'
import AuthGuard from '@/components/guards/AuthGuards'
import Header from '@/components/layout/Header'
import Wrapper from '@/components/layout/Wrapper'
import LoadingSpinner from '@/components/loading/LoadingSpinner'
import { formatedDate } from '@/hooks/useDate'
import { useFetchArticleDetail } from '@/lib/api/useFetchArticlesNew'
import Image from 'next/image'
import { use, useState } from 'react'

const ArticleDetailPage = (props: { params: Promise<{ articleId: string }> }) => {
  const { articleId } = use(props.params)
  const { data, loading, error } = useFetchArticleDetail(articleId)
  const [imgSrc, setImgSrc] = useState(data?.imageUrl);

  function truncateTextFromHTML(html: string): string {
    if (!html) return "";
    const plainText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const words = plainText.split(" ");
    return words.slice(0).join(" ");
  }

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
      <AuthGuard allowedRole="User">
        <Header isLogoWhite={false} />
        <Wrapper className='px-3 md:px-6 lg:px-16 py-[120px]'>
          <div className='flex justify-center gap-2 text-sm font-medium text-slate-600'>
            <span>{formatedDate(data?.createdAt ?? '')}</span>
            <span>.</span>  
            <span>Created by Admin</span>
          </div>
          <div className='flex flex-col gap-5 container mx-auto mt-5'>
            <h2 className='text-3xl font-semibold text-slate-900 text-center max-w-[742px] mx-auto'>{data?.title}</h2>
            <Image
              width={600}
              height={450}
              src={imgSrc ?? '/img/article-img.png'}
              alt={data?.title || "article image"}
              priority
              onError={() => setImgSrc("/img/article-img.png")}
              className="h-[230px] md:h-[400px] lg:h-[480px] w-full object-cover bg-gray-200 rounded-lg mt-3"
            />
            <p className='text-slate-700 text-base font-normal text-justify'>{truncateTextFromHTML(data?.content ?? '')}</p>
          </div>
          <OthersArticles categoryId={data?.category.id ?? ''}/>
        </Wrapper>
      </AuthGuard>
    )
  }
  
}

export default ArticleDetailPage
