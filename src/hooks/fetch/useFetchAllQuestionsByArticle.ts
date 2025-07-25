// External library
import { useContext, useEffect, useState } from "react";

// Context
import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

// Hooks
import useFetchIncludedStudiesAnswers from "./useFetchIncludedStudiesAnswers";

// Types
import type {
  AnswerProps,
  AnswerStrucuture,
  ArticleAnswerStrucuture,
  FormType,
} from "../../features/review/execution-extraction/types";
import type { QuestionAnswer } from "./useFetchIncludedStudiesAnswers";

export default function useFetchAllQuestionsByArticle() {
  const [articlesStructureAnswers, setArticlesStructureAnswers] = useState<
    Record<number, ArticleAnswerStrucuture>
  >({});

  const selectionContext = useContext(StudySelectionContext);

  const articleId = selectionContext
    ? selectionContext.selectedArticleReview
    : -1;

  const { question, mutate, isLoading } = useFetchIncludedStudiesAnswers({
    articleId,
  });

  const handlerUpdateAnswerStructure = (
    articleId: number = Number(selectionContext?.selectedArticleReview) || -1,
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
    if (!question) return;

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
  }, [question, articleId, articlesStructureAnswers]);

  return {
    question: articlesStructureAnswers,
    currentArticleId: articleId,
    handlerUpdateAnswerStructure,
    mutateQuestion: mutate,
    isLoading,
  };
}
