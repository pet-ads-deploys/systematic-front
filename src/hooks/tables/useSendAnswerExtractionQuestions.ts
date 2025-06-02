// External library
import { useContext } from "react";

// Service
import Axios from "../../interceptor/interceptor";

// Context
import StudySelectionContext from "../../components/Context/StudiesSelectionContext";

// Hooks
import useFocusedArticle from "../reviews/useFocusedArticle";

// Utils
import getRequestOptions from "../../utils/getRequestOptions";

// Types
import type { HandleSendAnswerProps } from "../../pages/Execution/Extraction/subcomponents/forms/types";

export function useSendAnswerExtractionQuestions() {
  const selectionContext = useContext(StudySelectionContext);
  const { articleInFocus } = useFocusedArticle({ page: "Extraction" });

  const sendAnswerExtractionQuestions = async ({
    questionId,
    type,
    answer,
  }: HandleSendAnswerProps) => {
    if (!articleInFocus || !selectionContext) {
      console.warn("Context not available, cannot send answer from the question.");
      return;
    }
    try {
      const id = localStorage.getItem("systematicReviewId");
      const options = getRequestOptions();
      const path = `http://localhost:8080/api/v1/systematic-study/${id}/study-review/${articleInFocus.studyReviewId}/extraction-answer`;
      await Axios.patch(
        path,
        {
          questionId,
          answer,
          type,
        },
        options
      );
      selectionContext.reloadArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sendAnswerExtractionQuestions,
  };
}
