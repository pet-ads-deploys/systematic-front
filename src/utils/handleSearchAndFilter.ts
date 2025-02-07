import ArticleInterface from "../../public/interfaces/ArticleInterface";
import { PageLayout } from "../pages/Execution/Selection/subcomponents/LayoutFactory";

export const handleSearchAndFilter = (
  searchString: string,
  selectedStatus: string | null,
  selectedColumns: string[],
  articles: ArticleInterface[] | [],
  page: PageLayout
) => {
  const lowerCaseSearch = searchString.toLowerCase();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = selectedColumns.length
      ? selectedColumns.some((column) =>
          article[column as keyof ArticleInterface]
            ?.toString()
            .toLowerCase()
            .includes(lowerCaseSearch)
        )
      : Object.values(article).some((value) =>
          value?.toString().toLowerCase().includes(lowerCaseSearch)
        );

    const matchesStatus =
      page.type === "Selection"
        ? !selectedStatus || article.selectionStatus === selectedStatus
        : !selectedStatus || article.extractionStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  console.log("Artigos filtrados pela minha função bem massa:", filteredArticles);

  return filteredArticles.length > 0 ? filteredArticles : [];

};
