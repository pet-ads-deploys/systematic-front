// External Library
import useSWR from "swr";
import { useMemo } from "react";

// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Types
import ArticleInterface from "@features/review/shared/types/ArticleInterface";
import { StudyInterface } from "@features/review/shared/types/IStudy";
import { Params } from "@features/shared/types/params";

interface HttpResponse {
  studyReviews: ArticleInterface[] | StudyInterface[];
}

interface FetchParams extends Params {}

const useFetchSelectionArticles = ({ page = 0, size = 20 }: FetchParams) => {
  const id = localStorage.getItem("systematicReviewId");
  const endpoint = `systematic-study/${id}/study-review`;

  const swrKey = useMemo(() => {
    if (!id) return null;
    return [endpoint, page, size, "selection-page"];
  }, [id, page, size, endpoint]);

  const fetcher = async () => {
    if (!id) return [];

    try {
      const response = await Axios.get<HttpResponse>(endpoint, {
        params: {
          page,
          size,
        },
      });
      return response.data.studyReviews || [];
    } catch (error) {
      console.error("Error fetching articles", error);
      throw error;
    }
  };

  const { data, mutate, error, isLoading } = useSWR(swrKey, fetcher, {
    fallbackData: [],
    revalidateOnFocus: true,
    revalidateOnMount: true,
    dedupingInterval: 5000,
    refreshInterval: 30000,
  });

  return { articles: data || [], mutate, error, isLoading };
};

export default useFetchSelectionArticles;
