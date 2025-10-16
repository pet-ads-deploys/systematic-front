// Service
import Axios from "../../../../infrastructure/http/axiosClient";

// Hooks
import useFocusedArticle from "../hooks/useFocusedArticle";

// Types
import type { PageLayout } from "../components/structure/LayoutFactory";

interface RevertCriterionStateProps {
  page: PageLayout;
}

interface HttpResponse {
  criteria: string[];
}

export default function useRevertCriterionState({
  page,
}: RevertCriterionStateProps) {
  const { articleInFocus } = useFocusedArticle({ page });
  const articleId = articleInFocus?.studyReviewId || -1;

  const revertCriterionState = async (criteria: string[]) => {
    const id = localStorage.getItem("systematicReviewId");

    if (!id || articleId === -1) {
      throw new Error("Invalid systematicReviewId or articleId");
    }

    try {
      const path = `systematic-study/${id}/study-review/remove-criteria/${articleId}`;
      const response = await Axios.patch<HttpResponse>(path, { criteria });
      return response.data.criteria;
    } catch (error) {
      console.error("Failed to revert criterion state:", error);
      throw error;
    }
  };

  return { revertCriterionState };
}
