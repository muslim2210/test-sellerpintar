"use client";

import { ArticleModel } from "@/types/articles";
import { useEffect, useState } from "react";
import { api } from "../api";

type ArticleResponse = {
  data: ArticleModel[]; // sesuai response kamu
  total: number;
  page: number;
  limit: number;
}

type Props = {
  page?: number;
  limit?: number;
  fetchAll?: boolean;
  search?: string;
  categoryId?: string;
}

export const useFetchArticles = ({
  page = 1,
  limit = 9,
  fetchAll = false,
  search = "",
  categoryId = "",
}: Props) => {
  const [data, setData] = useState<ArticleResponse | null>(null);
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

        if (search) params.search = search;
        if (categoryId) params.categoryId = categoryId;

        const res = await api.get<ArticleResponse>("/articles", { params });
        setData(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, limit, fetchAll, search, categoryId]);

  return { data, loading, error };
}
