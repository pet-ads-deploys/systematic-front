// External library
import useSWR from "swr";

// Service
import Axios from "../../interceptor/interceptor";

// Hooks
import useFocusedArticle from "../reviews/useFocusedArticle";

// Utils
import getRequestOptions from "../../utils/getRequestOptions";

// Types
import { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";

interface HttpResponse {
  criteria: {
    inclusion: string[];
    exclusion: string[];
  };
}

interface CriteriaByArticleProps {
  page: PageLayout;
}

export default function useFetchCriteriaByArticle({
  page,
}: CriteriaByArticleProps) {
  const id = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();

  const { articleInFocus } = useFocusedArticle({ page });

  const articleId = articleInFocus ? articleInFocus.studyReviewId : null;

  const path =
    id && articleId
      ? `http://localhost:8080/api/v1/systematic-study/${id}/report/study-review/${articleId}/criteria`
      : null;

  const { data, isLoading, error, mutate } = useSWR(path, fetchAllCriteria, {
    revalidateOnFocus: false,
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
