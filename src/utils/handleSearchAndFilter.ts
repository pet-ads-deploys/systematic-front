import ArticleInterface from "../../public/interfaces/ArticleInterface";

export const handleSearchAndFilter = (
  searchString: string,
  selectedStatus: string | null,
  selectedColumns: string[],
  articles: ArticleInterface[] | []
) => {
  const lowerCaseSearch = searchString.toLowerCase();

  return articles.filter((article) => {
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
      !selectedStatus || article.selectionStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });
};
