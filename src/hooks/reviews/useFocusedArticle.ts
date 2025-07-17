// External library
import { useContext, useMemo } from "react";

// Context
import StudySelectionContext from "../../context/StudiesSelectionContext";

// Hook
import useFetchAllClassifiedArticles from "../fetch/useFetchAllClassifiedArticles";

// Type
import type ArticleInterface from "../../types/ArticleInterface";
import type { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";

type FocusedArticleOutputProps = {
  articleInFocus?: ArticleInterface;
};

type FocusedArticleInputProps = {
  page: PageLayout;
};

export default function useFocusedArticle({
  page,
}: FocusedArticleInputProps): FocusedArticleOutputProps {
  const selectionContext = useContext(StudySelectionContext);

  if (!selectionContext) throw new Error("Context not available");

  const { selectedArticleReview, articles } = selectionContext;
  const { includedArticlesList } = useFetchAllClassifiedArticles();

  const availableArticlesList = useMemo(() => {
    if (!articles) return [];

    if (page === "Selection" || page === "Identification") return articles;

    return includedArticlesList;
  }, [includedArticlesList, articles, page]);

  const articleInFocus = useMemo(() => {
    if (selectedArticleReview === undefined || !availableArticlesList.length)
      return undefined;

    return availableArticlesList.find(
      (art): art is ArticleInterface =>
        "studyReviewId" in art && art.studyReviewId === selectedArticleReview
    );
  }, [availableArticlesList, selectedArticleReview]);

  if (!articleInFocus) {
    console.warn("Focus article not found or invalid.", {
      selectedArticleReview,
      availableArticlesLength: availableArticlesList.length,
    });
    return {};
  }

  return { articleInFocus: articleInFocus };
}
