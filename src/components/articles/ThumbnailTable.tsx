import Image from 'next/image'
import React, { useState } from 'react'

const ThumbnailTable = ({imgUrl, title} : {imgUrl: string, title?: string}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl || "/img/article-img.png");

  return (
    <Image
      width={200}
      height={250}
      src={imgSrc}
      alt={title || "Article"}
      priority
      onError={() => setImgSrc("/img/article-img.png")}
      className="w-16 h-16 object-cover bg-gray-200 rounded-sm"
    />
  )
}

export default ThumbnailTable
