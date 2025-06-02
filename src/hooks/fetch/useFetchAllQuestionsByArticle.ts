// External library
import { useEffect, useState } from "react";

// Hooks
import useFocusedArticle from "../reviews/useFocusedArticle";
import useFetchIncludedStudiesAnswers from "./useFetchIncludedStudiesAnswers";

// Types
import type {
  AnswerProps,
  AnswerStrucuture,
  ArticleAnswerStrucuture,
  FormType,
} from "../../pages/Execution/Extraction/subcomponents/forms/types";

export default function useFetchAllQuestionsByArticle() {
  const [articlesStructureAnswers, setArticlesStructureAnswers] = useState<
    Record<number, ArticleAnswerStrucuture>
  >({});

  const { articleInFocus } = useFocusedArticle({ page: "Extraction" });
  const { question } = useFetchIncludedStudiesAnswers({
    articleId: articleInFocus?.studyReviewId || -1,
  });

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

    const updatedArticle: ArticleAnswerStrucuture = {
      ...article,
      [key]: updatedQuestions,
    };

    setArticlesStructureAnswers((prev) => ({
      ...prev,
      [articleId]: updatedArticle,
    }));
  };

  useEffect(() => {
    if (!question || !articleInFocus?.studyReviewId) return;

    const articleId = articleInFocus.studyReviewId;

    setArticlesStructureAnswers((prev) => {
      if (prev[articleId]) return prev;

      const mapToStructure = (
        questions: typeof question.extractionQuestions
      ): AnswerStrucuture[] =>
        questions.map((q) => ({
          questionId: q.questionId,
          description: q.description,
          code: q.code,
          type: q.type,
          answer: { value: q.answer },
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
  }, [question, articleInFocus?.studyReviewId, articlesStructureAnswers]);

  return {
    question: articlesStructureAnswers,
    currentArticleId: articleInFocus?.studyReviewId,
    handlerUpdateAnswerStructure,
  };
}
