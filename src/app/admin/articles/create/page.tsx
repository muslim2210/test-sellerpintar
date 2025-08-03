'use client'

import AuthGuard from '@/components/guards/AuthGuards'
import HeaderAdmin from '@/components/layout/HeaderAdmin'
import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import * as z from 'zod'
import { createArticle, useUploadImage } from '@/lib/api/useFetchArticlesNew'
import Image from 'next/image'
import { useFetchCategories } from '@/lib/api/useFetchCategories'
import { CategoriModel } from '@/types/categories'
import UploadImageBox from '@/components/fragments/UploadImageBox'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  categoryId: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

const CreateArticlePage = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { uploadImage, loadingUpload } = useUploadImage()
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  // categories
  const categories = useFetchCategories({fetchAll: true}).data;

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

  const onSubmit = async (data: FormData) => {
    if (!imageUrl) {
      alert('Upload gambar terlebih dahulu.')
      return
    }

    try {
      setLoading(true)
      await createArticle({ ...data, imageUrl })
      alert('Artikel berhasil ditambahkan!')
      reset()
      setImageUrl(null)
    } catch (err) {
      console.error(err)
      alert('Gagal menambahkan artikel')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    setImageUrl(null)
  }

  return (
    <AuthGuard allowedRole="Admin">
      <HeaderAdmin titlePage="Articles" />
      {/* content */}
      <div className='px-3 bg-gray-100 min-h-screen pt-3'>
        <div className='rounded-md bg-white w-full shadow-sm mb-8'>
          {/* title */}
          <div className='flex items-center gap-2 text-slate-900 py-2 px-3'>
            <Link href={'/admin/articles'}>
              <ArrowLeft />
            </Link>
            <span className='text-base font-normal '>Create Article</span>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full px-3 mt-8">
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
              <Select onValueChange={(val) => setValue('categoryId', val)} >
                <SelectTrigger className="w-full"><SelectValue placeholder="Select Category" /></SelectTrigger>
                <SelectContent >
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
              {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
            </div>

            <div>
              <label>Konten</label>
              <Textarea {...register('content')} />
              {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>

           

            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Artikel'}
            </Button>
          </form>
        </div>
      </div>
    </AuthGuard>
  )
}



export default CreateArticlePage
