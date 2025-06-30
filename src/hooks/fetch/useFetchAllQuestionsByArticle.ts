// External library
import { useEffect, useState } from "react";

// Hooks
import useFocusedArticle from "../reviews/useFocusedArticle";
import useFetchIncludedStudiesAnswers, {
  QuestionAnswer,
} from "./useFetchIncludedStudiesAnswers";

// Types
import type {
  AnswerProps,
  AnswerStrucuture,
  ArticleAnswerStrucuture,
  FormType,
} from "../../pages/Execution/Extraction/subcomponents/forms/types";
import { UseChangeStudyExtractionStatus } from "../useChangeStudyExtractionStatus";

export default function useFetchAllQuestionsByArticle() {
  const [articlesStructureAnswers, setArticlesStructureAnswers] = useState<
    Record<number, ArticleAnswerStrucuture>
  >({});

  const { articleInFocus } = useFocusedArticle({ page: "Extraction" });
  const { question, mutate, isLoading } = useFetchIncludedStudiesAnswers({
    articleId: articleInFocus?.studyReviewId || -1,
  });
  const articleId = articleInFocus ? articleInFocus.studyReviewId : -1;

  const handlerUpdateAnswerStructure = (
    articleId: number = Number(articleInFocus?.studyReviewId) || -1,
    questionId: string,
    type: FormType,
    response: AnswerProps
  ) => {
    const key = type === "EXTRACTION" ? "extractionQuestions" : "robQuestions";

    const article = articlesStructureAnswers[articleId];
    if (!article) return;

    const updatedQuestions = article[key].map((quest) =>
      quest.questionId === questionId ? { ...quest, answer: response } : quest
    );

    console.log("questão atualizada", updatedQuestions);

    const updatedArticle: ArticleAnswerStrucuture = {
      ...article,
      [key]: updatedQuestions,
    };

    setArticlesStructureAnswers((prev) => ({
      ...prev,
      [articleId]: updatedArticle,
    }));
  };

  function formatLabel(label: string): string {
    const regex = /^Label\(name:\s(.+?),\svalue:\s(\d+)\)$/;
    const match = label.match(regex);
    if (!match) {
      throw new Error("String não está no formato esperado");
    }
    const [, name, value] = match;
    return `${name}: ${value}`;
  }

  useEffect(() => {
    if (!question || !articleInFocus) return;

    setArticlesStructureAnswers((prev) => {
      if (prev[articleId]) return prev;

      const mapToStructure = (
        questions: QuestionAnswer[]
      ): AnswerStrucuture[] =>
        questions.map((quest) => ({
          questionId: quest.questionId,
          description: quest.description,
          code: quest.code,
          type: quest.type,
          answer: {
            value:
              quest.type == "LABELED_SCALE" && quest.answer
                ? formatLabel(quest.answer as string)
                : quest.answer,
          },
        }));

      const structuredAnswers: ArticleAnswerStrucuture = {
        extractionQuestions: mapToStructure(question.extractionQuestions),
        robQuestions: mapToStructure(question.robQuestions),
      };

      return {
        ...prev,
        [articleId]: structuredAnswers,
      };
    });

    const articleAnswers = articlesStructureAnswers[articleId];
    if (!articleAnswers) return;

    const isAnswerAllQuestionsOfExtraction =
      articleAnswers.extractionQuestions.every(
        (quest) => quest.answer.value != null
      );
    const isAnswerAllQuestionsOfRiskOfBias = articleAnswers.robQuestions.every(
      (quest) => quest.answer.value != null
    );

    if (
      articleInFocus.extractionStatus == "UNCLASSIFIED" &&
      isAnswerAllQuestionsOfExtraction &&
      isAnswerAllQuestionsOfRiskOfBias
    ) {
      UseChangeStudyExtractionStatus({
        studyReviewId: [articleId],
        criterias: [],
        status: "INCLUDED",
      });
    }
  }, [question, articleInFocus, articleId, articlesStructureAnswers]);

  console.log("todos os dados", articlesStructureAnswers[articleId]);

  return {
    question: articlesStructureAnswers,
    currentArticleId: articleInFocus?.studyReviewId,
    handlerUpdateAnswerStructure,
    mutateQuestion: mutate,
    isLoading,
  };
}
