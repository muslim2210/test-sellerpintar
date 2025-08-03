'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useRef, useState } from "react"
import { createCategory, updateCategory } from "@/lib/api/useFetchCategories"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(3, 'Minimal 3 huruf'),
})

type FormData = z.infer<typeof formSchema>

type Props = {
  triggerId: string
  mode: 'create' | 'edit'
  categoryId?: string
  initialData?: Partial<FormData>
  onSuccess?: () => void
}

export function DialogCategoryForm({
  triggerId,
  mode,
  categoryId,
  initialData,
  onSuccess
}: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    }
  })
  const closeRef = useRef<HTMLButtonElement>(null) // untuk menutup dialog

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset(initialData)
    }
  }, [mode, initialData, reset])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      if (mode === 'create') {
        await createCategory(data)
        router.replace('/admin/categories')
        alert('Kategori berhasil ditambahkan!')
      } else if (mode === 'edit' && categoryId) {
        await updateCategory({ categoryId, name: data })
        router.replace('/admin/categories')
        alert('Kategori berhasil diperbarui!')
      }
      reset()
      onSuccess?.() // Trigger parent refresh
      closeRef.current?.click() // Close the dialog
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id={triggerId} className="hidden" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Category' : 'Edit Category'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'create'
                ? 'Fill in the details to create a new category.'
                : 'Update the category information here.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              type="text"
              placeholder="Category Name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (mode === 'create' ? 'Save Category' : 'Update Category')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
