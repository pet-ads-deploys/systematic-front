import { useMemo } from "react";
import ArticleInterface from "../../public/interfaces/ArticleInterface";
import { PageLayout } from "../pages/Execution/subcomponents/LayoutFactory";

export const useHandleAndFilter = (
  searchString: string,
  selectedStatus: string | null,
  articles: ArticleInterface[] | [],
  page: PageLayout
): ArticleInterface[] => {
  const filteredArticles = useMemo(() => {
    const lowerCaseSearch = searchString.toLowerCase();
    const result = articles.filter((article) => {
      const matchesSearch = Object.values(article).some((value) =>
        value?.toString().toLowerCase().includes(lowerCaseSearch)
      );
      const matchesStatus =
        page === "Selection"
          ? !selectedStatus || article.selectionStatus === selectedStatus
          : !selectedStatus || article.extractionStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
    return result.length > 0 ? result : [];
  }, [searchString, selectedStatus, articles, page]);

  return filteredArticles;
};
