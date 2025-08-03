import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Props = {
  imageUrl: string | null
  loadingUpload: boolean
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemove: () => void
}

const UploadImageBox = ({ imageUrl, loadingUpload, handleUpload, handleRemove }: Props) => {
  return (
    <>
      {imageUrl ? (
        <div className="w-[400px] relative border border-gray-300 rounded-lg p-4 text-center">
          <Image
            src={imageUrl}
            alt="Preview"
            width={400}
            height={300}
            className="rounded-md max-h-[180px] object-cover mx-auto"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-4"
            onClick={handleRemove}
          >
            Hapus Gambar
          </Button>
        </div>
      ) : (
        <div className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 text-center">
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={loadingUpload}
            className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
          />
          <Image
            width={80}
            height={80}
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt="Upload Icon"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <span className="text-gray-600">Drag and drop</span>
            <span className="text-indigo-600"> or browse </span>
            <span className="text-gray-600">to upload</span>
          </h3>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          {loadingUpload && <p className="text-blue-500 text-sm mt-2">Uploading image...</p>}
        </div>
      )}
    </>
  )
}

export default UploadImageBox
