'use client'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type Props = {
  value: string
  onChange: (value: string) => void
}

const RichTextEditor = ({ value, onChange }: Props) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
          ['clean'],
        ]
      }}
    />
  )
}

export default RichTextEditor
