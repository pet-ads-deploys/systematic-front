// External library
import { useContext } from "react";

// Service
import Axios from "../../interceptor/interceptor";

// Context
import StudySelectionContext from "../../context/StudiesSelectionContext";

// Utils
import getRequestOptions from "../../utils/getRequestOptions";

// Types
import type { SendAnswerProps } from "../../pages/Execution/Extraction/subcomponents/forms/types";

export function useSendAnswerROBQuestions() {
  const selectionContext = useContext(StudySelectionContext);

  const sendAnswerROBQuestions = async ({ answers }: SendAnswerProps) => {
    if (!selectionContext) {
      console.warn(
        "Context not available, cannot send answer from the question."
      );
      return;
    }
    try {
      const id = localStorage.getItem("systematicReviewId");
      const options = getRequestOptions();
      const path = `http://localhost:8080/api/v1/systematic-study/${id}/study-review/${selectionContext.selectedArticleReview}/batch-riskOfBias-answers`;
      await Axios.patch(
        path,
        {
          answers,
        },
        options
      );
    } catch (error) {
      console.log(error);
    }
  };
  return {
    sendAnswerROBQuestions,
  };
}
