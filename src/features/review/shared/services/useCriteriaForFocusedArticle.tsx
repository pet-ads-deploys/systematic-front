// External library
import useSWR from "swr";

// Service
import Axios from "../../../../infrastructure/http/axiosClient";

// Utils
import getRequestOptions from "@features/auth/utils/getRequestOptions";

// Types
interface HttpResponse {
  inclusionCriteria: string[];
  exclusionCriteria: string[];
}

interface CriteriaForFocusedArticleProps {
  articleId: number;
}

export default function useFetchCriteriaForFocusedArticle({
  articleId,
}: CriteriaForFocusedArticleProps) {
  const id = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();

  const path =
    id && articleId
      ? `systematic-study/${id}/report/study-review/${articleId}/criteria`
      : null;

  const { data, isLoading, error, mutate } = useSWR(path, fetchAllCriteria, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  async function fetchAllCriteria() {
    try {
      if (!path) return;
      const response = await Axios.get<HttpResponse>(path, options);
      return response.data;
    } catch (error) {
      console.error("Error fetching criteria", error);
      throw error;
    }
  }

  return {
    criteria: data,
    mutate,
    isLoading,
    error,
  };
}
