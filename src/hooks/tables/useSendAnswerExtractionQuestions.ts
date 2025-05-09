import { useContext } from "react";
import Axios from "../../interceptor/interceptor";

import StudySelectionContext from "../../components/Context/StudiesSelectionContext";
import AppContext from "../../components/Context/AppContext";

import { StudyInterface } from "../../../public/interfaces/IStudy";
import ArticleInterface from "../../../public/interfaces/ArticleInterface";
import { HandleSendAnswerProps } from "../../pages/Execution/Extraction/subcomponents/forms/types";

import getRequestOptions from "../../utils/getRequestOptions";

export function useSendAnswerExtractionQuestions() {
  const selectionContext = useContext(StudySelectionContext);
  const appContext = useContext(AppContext);
  const articleIndex = appContext?.selectionStudyIndex;
  const articles = selectionContext?.articles;
  let article: ArticleInterface | StudyInterface;

  if (articles && articleIndex) article = articles[articleIndex];

  const sendAnswerExtractionQuestions = async ({
    questionId,
    type,
    answer,
  }: HandleSendAnswerProps) => {
    if (articleIndex === undefined || !selectionContext) {
      console.warn("Context not available, cannot change priority.");
      return;
    }
    try {
      const id = localStorage.getItem("systematicReviewId");
      const options = getRequestOptions();

      if (articles && articleIndex) {
        if (article && "studyReviewId" in article) {
          const path = `http://localhost:8080/api/v1/systematic-study/${id}/study-review/${[
            article.studyReviewId,
          ]}/extraction-answer`;
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sendAnswerExtractionQuestions,
  };
}
