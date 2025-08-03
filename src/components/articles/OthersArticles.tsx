import { useFetchArticlesNew } from '@/lib/api/useFetchArticlesNew'
import React from 'react'
import { LoadingCardCatalog } from '../loading/LoadingCardCatalog'
import { ArticleModel } from '@/types/articles'
import ArticleCard from '../fragments/ArticleCard'

interface OthersArticlesProps {
  categoryId: string;
}

const OthersArticles = ({ categoryId }: OthersArticlesProps) => {
    const { data, loading } = useFetchArticlesNew({
      page: 1,
      limit: 3,
      categoryId,
    })
    
  return (
    <div className='mt-12'>
      <h4 className='font-bold text-xl text-slate-900'>Others articles</h4>
      {/* Grid Articles */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 mt-5">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
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
    </div>
  )
}

export default OthersArticles
