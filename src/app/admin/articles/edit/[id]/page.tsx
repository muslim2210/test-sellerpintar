'use client'

import AuthGuard from '@/components/guards/AuthGuards'
import HeaderAdmin from '@/components/layout/HeaderAdmin'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useParams, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { getArticleById, updateArticle, useUploadImage } from '@/lib/api/useFetchArticlesNew'
import { useFetchCategories } from '@/lib/api/useFetchCategories'
import UploadImageBox from '@/components/fragments/UploadImageBox'
import { Label } from '@/components/ui/label'
import { CategoriModel } from '@/types/categories'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('@/components/articles/RichTextEditor'), {
  ssr: false,
  loading: () => <p className="text-sm text-gray-400">Memuat editor...</p>,
})

const formSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  categoryId: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

const EditArticlePage = () => {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [content, setContent] = useState<string>('')

  const { uploadImage, loadingUpload } = useUploadImage()
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const categories = useFetchCategories({ fetchAll: true }).data

  // Ambil data artikel berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const article = await getArticleById(id)
        console.info('APP Fetch Article Detail : ', article)
        reset({
          title: article.title,
          content: article.content,
          categoryId: article.categoryId,
        })
        setContent(article.content)
        setImageUrl(article.imageUrl)
      } catch (err) {
        console.error(err)
        alert('Gagal mengambil data artikel')
      }
    }

    if (id) fetchData()
  }, [id, reset])

  // Sinkronisasi konten editor ke react-hook-form
  useEffect(() => {
    setValue('content', content)
  }, [content, setValue])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const url = await uploadImage(file)
      setImageUrl(url)
    } catch (err) {
      console.log(err)
      alert('Gagal upload gambar')
    }
  }

  const handleRemove = () => {
    setImageUrl(null)
  }

  const onSubmit = async (data: FormData) => {
    if (!imageUrl) {
      alert('Upload gambar terlebih dahulu.')
      return
    }

    try {
      setLoading(true)
      await updateArticle(id, { ...data, imageUrl })
      alert('Artikel berhasil diperbarui!')
      router.push('/admin/articles')
    } catch (err) {
      console.error(err)
      alert('Gagal memperbarui artikel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard allowedRole="Admin">
      <HeaderAdmin titlePage="Articles" />
      <div className='px-3 bg-gray-100 min-h-screen pt-3'>
        <div className='rounded-md bg-white w-full shadow-sm mb-8'>
          <div className='flex items-center gap-2 text-slate-900 py-2 px-3'>
            <Link href={'/admin/articles'}>
              <ArrowLeft />
            </Link>
            <span className='text-base font-normal '>Edit Article</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full px-3 pb-4 mt-8">
            <div>
              <Label className='mb-2'>Thumbnails</Label>
              <UploadImageBox
                imageUrl={imageUrl}
                loadingUpload={loadingUpload}
                handleUpload={handleUpload}
                handleRemove={handleRemove}
              />
            </div>

            <div>
              <Label className='mb-2'>Title</Label>
              <Input {...register('title')} placeholder="Input Title" />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <Label className='mb-2'>Category</Label>
              <Select onValueChange={(val) => setValue('categoryId', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.data.map((category: CategoriModel) => {
                    if (!category.id) return null  // lewati jika tidak valid
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
            </div>

            <div>
              <Label className='mb-2'>Content</Label>
              <RichTextEditor value={content} onChange={setContent} />
              {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>
            <div className='flex justify-end gap-2'>
              <Button type="button" variant="outline" onClick={() => router.push('/admin/articles')}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Edit Article'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  )
}

export default EditArticlePage
