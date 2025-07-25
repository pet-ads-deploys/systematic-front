import { useContext, useMemo } from "react";

import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

import ArticleInterface from "../../features/review/shared/types/ArticleInterface";

type ArticleStatus = "INCLUDED" | "UNCLASSIFIED" | "DUPLICATED" | "EXCLUDED";

type ClassifiedArticlesOutput = {
  includedArticlesList: ArticleInterface[];
  unclassifiedArticlesList: ArticleInterface[];
  duplicatedArticlesList: ArticleInterface[];
  excludedArticlesList: ArticleInterface[];
};

export default function useFetchAllClassifiedArticles(): ClassifiedArticlesOutput {
  const selectionContext = useContext(StudySelectionContext);

  const classifiedArticles = useMemo(() => {
    const articlesStatusMap: Record<ArticleStatus, ArticleInterface[]> = {
      INCLUDED: [],
      UNCLASSIFIED: [],
      DUPLICATED: [],
      EXCLUDED: [],
    };

    if (!selectionContext?.articles) return articlesStatusMap;

    selectionContext.articles.map((article) => {
      if (!("studyReviewId" in article)) return;
      const status = article.selectionStatus as ArticleStatus;
      articlesStatusMap[status].push(article);
    });

    return articlesStatusMap;
  }, [selectionContext?.articles]);

  return {
    includedArticlesList: classifiedArticles.INCLUDED,
    unclassifiedArticlesList: classifiedArticles.UNCLASSIFIED,
    duplicatedArticlesList: classifiedArticles.DUPLICATED,
    excludedArticlesList: classifiedArticles.EXCLUDED,
  };
}
