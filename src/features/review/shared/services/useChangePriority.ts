// External library
import { useContext } from "react";

// Service
import Axios from "../../../../infrastructure/http/axiosClient";

// Contenxt
import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

// Utils
import getRequestOptions from "@features/auth/utils/getRequestOptions";

// Type
type PriorityValue = "VERY_LOW" | "LOW" | "HIGH" | "VERY_HIGH";

interface ChangePriorityInArticle {
  status: string;
  criteria?: string[];
}

const priorityMap: Record<string, PriorityValue> = {
  "Very Low": "VERY_LOW",
  Low: "LOW",
  High: "HIGH",
  "Very High": "VERY_HIGH",
};

export default function useChangePriority() {
  const selectionContext = useContext(StudySelectionContext);

  if (!selectionContext) throw new Error("Context not available");

  const { selectedArticleReview, reloadArticles } = selectionContext;

  const handleChangePriority = async ({
    status,
    criteria = [],
  }: ChangePriorityInArticle) => {
    try {
      const id = localStorage.getItem("systematicReviewId");
      const options = getRequestOptions();

      const priorityValue = priorityMap[status];

      if (!priorityValue) {
        throw new Error(`Invalid status: ${status}`);
      }

      const path = `systematic-study/${id}/study-review/reading-priority`;
      await Axios.patch(
        path,
        {
          studyReviewId: [selectedArticleReview],
          status: priorityValue,
          criteria,
        },
        options
      );
      reloadArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChangePriority };
}
