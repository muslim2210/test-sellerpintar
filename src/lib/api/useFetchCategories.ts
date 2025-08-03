"use client";

import { useEffect, useState } from "react";
import { api } from "../api";
import { CategoriModel } from "@/types/categories";

type CategoryResponse = {
  data: CategoriModel[]; // sesuai response kamu
  totalData: number;
  page: number;
  limit: number;
}

type Props = {
  page?: number;
  limit?: number;
  fetchAll?: boolean;
};

export const useFetchCategories = ({
  page = 1,
  limit = 9,
  fetchAll = true,
}: Props) => {
  const [data, setData] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params: Record<string, string | number> = {};

        if (fetchAll) {
          params.limit = 300;
        } else {
          params.page = page;
          params.limit = limit;
        }

        const res = await api.get<CategoryResponse>("/categories", { params });
        setData(res.data);
        console.info('APP Fetch Categories : ',res.data);
      } catch (err) {
        setError(err as Error);
        console.error('APP Fetch Categories Error : ',err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, limit, fetchAll]);

  return { data, loading, error };
}

type PropsCategoryAdmin = {
  page?: number;
  limit?: number;
  search?: string;
};

export const useFetchCategoriesAdmin = ({
  page = 1,
  limit = 9,
  search = "",
}: PropsCategoryAdmin) => {
  const [data, setData] = useState<CategoriModel[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const searchActive = search.trim() !== "";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        if (searchActive) {
          // ✅ FETCH ALL dulu lalu filter lokal
          const res = await api.get<CategoryResponse>("/categories", {
            params: { limit: 9999 },
          });

          const filtered = res.data.data.filter((item) => {
            const matchesSearch = item.name
              .toLowerCase()
              .includes(search.toLowerCase());
            return matchesSearch
          });

          setTotal(filtered.length);
          const start = (page - 1) * limit;
          const end = start + limit;
          setData(filtered.slice(start, end));
        } else {
          // ✅ SERVER SIDE PAGINATION
          const res = await api.get<CategoryResponse>("/categories", {
            params: {
              page,
              limit,
            },
          });
          console.info('APP Fetch Categories Admin : ',res.data);
          setData(res.data.data);
          setTotal(res.data.totalData);
        }
      } catch (err) {
        console.error('APP Fetch Categories Admin Error : ',err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, limit, search, searchActive]);

  return { data, loading, error, total };
};

type CreateCategory = {
  name: string;
}

export const createCategory = async (data: CreateCategory) => {
  const response = await api.post('/categories', data)
  return response.data
}

export const updateCategory = async ({ categoryId, name }: { categoryId: string, name: CreateCategory }) => {
  const response = await api.put(`/categories/${categoryId}`, name)
  return response.data
}

export const deleteCategory = async (categoryId: string) => {
  const response = await api.delete(`/categories/${categoryId}`)
  return response.data
}