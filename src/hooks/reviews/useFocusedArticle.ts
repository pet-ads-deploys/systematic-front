import { useContext, useMemo } from "react";

import AppContext from "../../components/Context/AppContext";
import StudySelectionContext from "../../components/Context/StudiesSelectionContext";

import ArticleInterface from "../../../public/interfaces/ArticleInterface";
import { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";
import useFetchAllClassifiedArticles from "../fetch/useFetchAllClassifiedArticles";

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
  const appContext = useContext(AppContext);

  const { includedArticlesList } = useFetchAllClassifiedArticles();

  const selectedArticleIndex = appContext?.selectionStudyIndex;

  const availableArticlesList = useMemo(() => {
    if (!selectionContext?.articles) return [];

    if (page === "Selection" || page === "Identification")
      return selectionContext.articles;

    return includedArticlesList;
  }, [includedArticlesList]);

  if (
    selectedArticleIndex === undefined ||
    !selectionContext ||
    !availableArticlesList.length ||
    !availableArticlesList[selectedArticleIndex] ||
    !("studyReviewId" in availableArticlesList[selectedArticleIndex])
  ) {
    console.warn("Missing context or invalid article index.", {
      selectedArticleIndex,
      availableArticlesLength: availableArticlesList.length,
    });
    return {};
  }

  const articleInFocus = availableArticlesList[selectedArticleIndex];

  return { articleInFocus };
}
