import { useEffect, useState } from "react";

import { useFetchExtractionQuestions } from "./useFetchExtractionQuestions";

import type {
  AnswerProps,
  TypeOfQuestions,
} from "../../pages/Execution/Extraction/subcomponents/forms/types";
import useFocusedArticle from "../reviews/useFocusedArticle";
import { useFetchRobQuestions } from "./useFetchRobQuestions";

export type FormType = "EXTRACTION" | "RISK_OF_BIAS";

export type FormAnswers = Record<string, AnswerProps>;

export type ArticleAnswers = Record<FormType, FormAnswers>;

export interface FormsToExtractionData {
  questionsFiltered: Record<number, FormAnswers>;
  handlerUpdateAnswer: (
    articleId: number,
    type: FormType,
    questionId: string,
    response: AnswerProps
  ) => void;
}

// const mockAnswers: Record<number, Record<string, { value: string }>> = {
//   19341: {
//     "67424e9b-1e23-4a68-8486-bcf4c6001d54": {
//       value: "teste1",
//     },
//   },
//   19345: {
//     "67424e9b-1e23-4a68-8486-bcf4c6001d54": {
//       value: "teste2",
//     },
//   },
//   19346: {
//     "67424e9b-1e23-4a68-8486-bcf4c6001d54": {
//       value: "teste3",
//     },
//   },
// };

export default function useFetchAllQuestionsByArticle() {
  const [articlesAnswers, setArticlesAnswers] = useState<
    Record<number, ArticleAnswers>
  >({});

  const { articleInFocus } = useFocusedArticle({ page: "Extraction" });

  const extractionQuestions = useFetchExtractionQuestions();
  const riskOfBiasQuestions = useFetchRobQuestions();

  const handlerUpdateAnswer = (
    articleId: number = Number(articleInFocus?.studyReviewId),
    type: FormType,
    questionId: string,
    response: AnswerProps
  ) => {
    setArticlesAnswers((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        [type]: {
          ...prev[articleId]?.[type],
          [questionId]: {
            value: response.value,
            type: response.type,
          },
        },
      },
    }));
  };

  useEffect(() => {
    if (!articleInFocus) return;

    const isExtractionReady =
      extractionQuestions.questions && !extractionQuestions.isLoading;
    const isRobReady =
      riskOfBiasQuestions.questions && !riskOfBiasQuestions.isLoading;

    if (!isExtractionReady || !isRobReady) return;

    setArticlesAnswers({});

    extractionQuestions.questions?.forEach((question) => {
      if (!question.questionId) return;

      handlerUpdateAnswer(
        articleInFocus.studyReviewId,
        "EXTRACTION",
        question.questionId,
        {
          value:
            // mockAnswers[articleInFocus.studyReviewId]?.[question.questionId]?.value || "",
          null,
          type: question.questionType as TypeOfQuestions,
        }
      );
    });

    riskOfBiasQuestions.questions?.forEach((question) => {
      if (!question.questionId) return;

      handlerUpdateAnswer(
        articleInFocus.studyReviewId,
        "RISK_OF_BIAS",
        question.questionId,
        {
          value:
            // mockAnswers[articleInFocus.studyReviewId]?.[question.questionId]?.value || "",
            null,
          type: question.questionType as TypeOfQuestions,
        }
      );
    });
  }, [
    articleInFocus,
    extractionQuestions.questions,
    riskOfBiasQuestions.questions,
    extractionQuestions.isLoading,
    riskOfBiasQuestions.isLoading,
  ]);

  const handlerFilterAnswerForTypeForm = () => {
    if (!articleInFocus) return;

    const extractionAnswers: Record<number, FormAnswers> = {};
    const riskOfBiasAnswers: Record<number, FormAnswers> = {};
    Object.entries(articlesAnswers).forEach(([articleIdStr, answersByForm]) => {
      const articleId = Number(articleIdStr);

      if (answersByForm.EXTRACTION) {
        extractionAnswers[articleId] = answersByForm.EXTRACTION;
      }
      riskOfBiasAnswers[articleId] = answersByForm.RISK_OF_BIAS;
    });
    return {
      extractionQuestions: extractionAnswers,
      riskOfBiasQuestions: riskOfBiasAnswers,
    };
  };

  const filteredQuestionsByType = handlerFilterAnswerForTypeForm();

  return {
    extractionQuestions: extractionQuestions,
    riskOfBiasQuestions: riskOfBiasQuestions,
    questions: filteredQuestionsByType,
    currentArticleId: articleInFocus?.studyReviewId,
    handlerUpdateAnswer,
  };
}
