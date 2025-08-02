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

          setData(res.data.data);
          setTotal(res.data.total);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, limit, search, categoryId, searchActive]);

  return { data, loading, error, total };
};
