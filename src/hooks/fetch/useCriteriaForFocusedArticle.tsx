// External library
import useSWR from "swr";

// Service
import Axios from "../../interceptor/interceptor";

// Utils
import getRequestOptions from "../../utils/getRequestOptions";

// Types
interface HttpResponse {
  criteria: {
    inclusion: string[];
    exclusion: string[];
  };
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
      ? `http://localhost:8080/api/v1/systematic-study/${id}/report/study-review/${articleId}/criteria`
      : null;

  const { data, isLoading, error, mutate } = useSWR(path, fetchAllCriteria, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  async function fetchAllCriteria() {
    try {
      if (!path) return;
      const response = await Axios.get<HttpResponse>(path, options);
      return response.data.criteria;
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
