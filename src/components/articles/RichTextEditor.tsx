'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  content: value,
  onUpdate: ({ editor }) => onChange(editor.getHTML()),

  // ✅ Tambahan yang benar dan didukung resmi
  editorProps: {
    attributes: {
      class: 'focus:outline-none',
    },
  },

  // ✅ Inilah solusi untuk error hydration SSR!
  immediatelyRender: false,
})

  if (!editor) return null

  return (
    <div className="border rounded p-2 space-y-2">
      {/* Toolbar */}
      <div className="flex gap-2 border-b pb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Center
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Right
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  )
}
