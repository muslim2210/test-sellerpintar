"use client";

import { useEffect, useState } from "react";
import { api } from "../api";
import { CategoriModel } from "@/types/categories";

type CategoryResponse = {
  data: CategoriModel[]; // sesuai response kamu
  total: number;
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
