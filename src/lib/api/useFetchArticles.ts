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
  fetchAll?: boolean;
  search?: string;
  categoryId?: string;
};

export const useFetchArticles = ({
  page = 1,
  limit = 9,
  fetchAll = false,
  search = "",
  categoryId = "",
}: Props) => {
  const [rawData, setRawData] = useState<ArticleModel[]>([]);
  const [data, setData] = useState<ArticleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const shouldFetchAll = search.trim() !== "" || categoryId !== "" || fetchAll;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const params: Record<string, string | number> = {};

        if (shouldFetchAll) {
          params.limit = 9999;
          params.page = 1;
        } else {
          params.limit = limit;
          params.page = page;
        }

        if (search) params.search = search;
        if (categoryId) params.categoryId = categoryId;

        const res = await api.get<ArticleResponse>("/articles", { params });
        const resData = res.data;

        if (shouldFetchAll) {
          setRawData(resData.data); // simpan semua data mentah
          // lakukan pagination lokal
          const start = (page - 1) * limit;
          const pagedData = resData.data.slice(start, start + limit);

          setData({
            data: pagedData,
            total: resData.data.length,
            page,
            limit,
          });
        } else {
          setData(resData); // gunakan data dari API langsung
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, limit, search, categoryId, fetchAll, shouldFetchAll]);

  return { data, loading, error, rawData };
};
