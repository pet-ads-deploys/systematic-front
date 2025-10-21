// External Library
import useSWR from "swr";
import { useMemo } from "react";

// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Types
import ArticleInterface from "@features/review/shared/types/ArticleInterface";
import { StudyInterface } from "@features/review/shared/types/IStudy";
import { Params } from "@features/shared/types/params";

export interface SelectionArticles {
  studyReviews: ArticleInterface[] | StudyInterface[];
  systematicStudyId: string;
  size: number;
  page: number;
  totalElements: number;
  totalPages: number;
}

interface FetchParams extends Params {}

// Constants
const EMPTY_PAGINATION_DATA: SelectionArticles = {
  studyReviews: [],
  totalElements: 0,
  totalPages: 0,
  systematicStudyId: "",
  size: 0,
  page: 0,
};

const useFetchSelectionArticles = ({ page = 0, size = 20 }: FetchParams) => {
  const id = localStorage.getItem("systematicReviewId");
  const endpoint = `systematic-study/${id}/study-review`;

  const swrKey = useMemo(() => {
    if (!id) return null;
    return [endpoint, page, size, "selection-page"];
  }, [id, page, size, endpoint]);

  const fetcher = async () => {
    if (!id) return EMPTY_PAGINATION_DATA;

    try {
      const response = await Axios.get<SelectionArticles>(endpoint, {
        params: {
          page,
          size,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching articles", error);
      throw error;
    }
  };

  const { data, mutate, error, isLoading } = useSWR(swrKey, fetcher, {
    fallbackData: EMPTY_PAGINATION_DATA,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    dedupingInterval: 5000,
    refreshInterval: 30000,
  });

  const articles = data?.studyReviews || [];
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 0;

  return {
    articles: articles.filter(
      (art): art is ArticleInterface => "studyReviewId" in art
    ),
    totalElements,
    totalPages,
    mutate,
    error,
    isLoading,
  };
};

export default useFetchSelectionArticles;
