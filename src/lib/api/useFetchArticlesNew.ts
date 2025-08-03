"use client";

import { ArticleModel } from "@/types/articles";
import { useEffect, useState } from "react";
import { api } from "../api";

type ArticleResponse = {
  data: ArticleModel[];
  total: number;
  page: number;
  limit: number;
};

type Props = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
};

export const useFetchArticlesNew = ({
  page = 1,
  limit = 9,
  search = "",
  categoryId = "",
}: Props) => {
  const [data, setData] = useState<ArticleModel[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const searchActive = search.trim() !== "" || categoryId !== "";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        if (searchActive) {
          // ✅ FETCH ALL dulu lalu filter lokal
          const res = await api.get<ArticleResponse>("/articles", {
            params: { limit: 9999 },
          });

          const filtered = res.data.data.filter((item) => {
            const matchesSearch = item.title
              .toLowerCase()
              .includes(search.toLowerCase());
            const matchesCategory = categoryId
              ? item.category?.id === categoryId
              : true;
            return matchesSearch && matchesCategory;
          });

          setTotal(filtered.length);
          const start = (page - 1) * limit;
          const end = start + limit;
          setData(filtered.slice(start, end));
        } else {
          // ✅ SERVER SIDE PAGINATION
          const res = await api.get<ArticleResponse>("/articles", {
            params: {
              page,
              limit,
            },
          });
          console.info('APP Fetch Articles : ', res.data);
          setData(res.data.data);
          setTotal(res.data.total);
        }
      } catch (err) {
        console.error('APP Fetch Articles Error : ',err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, limit, search, categoryId, searchActive]);

  return { data, loading, error, total };
};


export const useFetchArticleDetail = (articleId: string) => {
  const [data, setData] = useState<ArticleModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await api.get<ArticleModel>(`/articles/${articleId}`);
        setData(res.data);
        console.info('APP Fetch Article Detail : ',res.data);
      } catch (err) {
        setError(err as Error);
        console.error('APP Fetch Article Detail Error : ',err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [articleId]);

  return { data, loading, error };
}


export const useUploadImage = () => {
  const [loadingUpload, setLoadingUpload] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    setLoadingUpload(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.info('APP Upload Image : ',response);
      return response.data.imageUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('APP Upload Image Error : ', err);
      throw new Error('Failed to upload image');
    }finally {
      setLoadingUpload(false);
    }
  };

  return { uploadImage, loadingUpload };
};


export type CreateArticle = {
  title: string
  content: string
  categoryId: string
  imageUrl?: string
}

export const createArticle = async (data: CreateArticle) => {
  const response = await api.post('/articles', data)
  return response.data
}

export const updateArticle = async (id: string, data: CreateArticle) => {
  const response = await api.put(`/articles/${id}`, data)
  return response.data
}

export const getArticleById = async (id: string): Promise<ArticleModel> => {
  const res = await api.get(`/articles/${id}`)
  return res.data
}


export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/articles/${id}`)
  return response.data
}