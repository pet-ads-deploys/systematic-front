// External library
import { useContext } from "react";

// Service
import Axios from "../../../../infrastructure/http/axiosClient";

// Context
import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

// Types
import type { SendAnswerProps } from "../types";

export function useSendBatchAnswers() {
  const selectionContext = useContext(StudySelectionContext);

  const sendBatchAnswers = async ({ answers }: SendAnswerProps) => {
    if (!selectionContext) {
      console.warn(
        "Context not available, cannot send answer from the question."
      );
      return;
    }
    try {
      const id = localStorage.getItem("systematicReviewId");
      const path = `systematic-study/${id}/study-review/${selectionContext.selectedArticleReview}/batch-answer-question`;
      await Axios.patch(path, {
        answers,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    sendBatchAnswers,
  };
}
