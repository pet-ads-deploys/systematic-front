// Types
import ArticleInterface from "../../public/interfaces/ArticleInterface";
import { PageLayout } from "../pages/Execution/subcomponents/LayoutFactory";

export const handleSearchAndFilter = (
  searchString: string,
  selectedStatus: string | null,
  articles: ArticleInterface[] | [],
  page: PageLayout
) => {
  const lowerCaseSearch = searchString.toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = Object.values(article).some((value) =>
      value?.toString().toLowerCase().includes(lowerCaseSearch)
    );
    const matchesStatus =
      page.type === "Selection"
        ? !selectedStatus || article.selectionStatus === selectedStatus
        : !selectedStatus || article.extractionStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });
  return filteredArticles.length > 0 ? filteredArticles : [];
};
