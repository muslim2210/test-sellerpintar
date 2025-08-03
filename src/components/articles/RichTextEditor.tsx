'use client'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

import { useMemo } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const RichTextEditor = ({ value, onChange }: Props) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  }), [])

  return (
    <div className="border border-gray-300 rounded-md">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="min-h-[200px]"
      />
    </div>
  )
}

export default RichTextEditor
