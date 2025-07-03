// External library
import { useMemo } from "react";

// Type
import type ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import type { PageLayout } from "../subcomponents/LayoutFactory";

export const useFilterReviewArticles = (
  searchString: string,
  selectedStatus: string | null,
  articles: ArticleInterface[] | [],
  page: PageLayout
): ArticleInterface[] => {
  const filteredArticles = useMemo(() => {
    const formattedSearch = searchString.toLowerCase();

    if (!formattedSearch && !selectedStatus) return articles;

    return articles.filter((article) => {
      const matchesSearch =
        !formattedSearch ||
        [
          article.studyReviewId?.toString(),
          article.title,
          article.authors,
          article.venue,
          article.year,
          article.selectionStatus,
          article.extractionStatus,
          article.score?.toString(),
          article.readingPriority,
        ].some((field) => field.toLowerCase().includes(formattedSearch));

      const matchesStatus =
        page === "Selection"
          ? !selectedStatus || article.selectionStatus === selectedStatus
          : !selectedStatus || article.extractionStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchString, selectedStatus, articles, page]);

  return filteredArticles;
};
