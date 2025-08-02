"use client";

import { formatedDate } from "@/hooks/useDate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface ArticleCardProps {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  createdAt: string;
  content: string;
  href?: string;
}

const ArticleCard = ({
  id,
  createdAt,
  title,
  category,
  imageUrl,
  content,
  href = `/articles/${id}`, 
}: ArticleCardProps) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || "/img/article-img.png");

  // Fungsi truncate dari HTML tanpa memotong kata
  function truncateTextFromHTML(html: string, maxWords: number): string {
    if (!html) return "";
    const plainText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const words = plainText.split(" ");
    if (words.length <= maxWords) return plainText;
    return words.slice(0, maxWords).join(" ");
  }

  return (
    <div
      className="transform overflow-hidden duration-200 hover:scale-105 flex flex-col gap-1"
      key={id}
    >
      <Link href={href}>
        <div className="border border-slate-200 rounded-lg">
          <Image
            width={500}
            height={450}
            src={imgSrc}
            alt={title}
            priority
            onError={() => setImgSrc("/img/article-img.png")}
            className="h-[190px] md:h-[240px] lg:h-[250px] md:w-full object-cover bg-gray-200 rounded-lg"
          />
        </div>
      </Link>

      <div className="py-3 px-2 flex flex-col gap-1">
        <span className="text-slate-600 text-sm font-normal">
          {formatedDate(createdAt)}
        </span>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-base font-normal text-slate-600 mb-3">
          {truncateTextFromHTML(content, 15)}
        </p>
        <Badge
          variant="secondary"
          className="bg-blue-200 text-blue-900"
        >
          {category}
        </Badge>
      </div>
    </div>
  );
};

export default ArticleCard;
