import ArticlesInterface from "../../../../public/interfaces/ArticleInterface";
import AppContext from "../../Context/AppContext";
import { useContext, useMemo, useState } from "react";
import Expanded from "./Expanded";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { PageLayout } from "../../../pages/Execution/subcomponents/LayoutFactory";

interface Props {
  articles: ArticlesInterface[];
  page: PageLayout;
}

export default function ArticlesTable({ articles, page }: Props) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ArticleInterface;
    direction: "asc" | "desc";
  } | null>(null);
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Failed to get the context on articles table");
  }

  const sortedArticles = useMemo(() => {
    if (!sortConfig) return articles;
    const sorted = [...articles].sort((primary, secund) => {
      const primaryValue = primary[sortConfig?.key];
      const nextValue = secund[sortConfig?.key];

      if (primaryValue > nextValue)
        return sortConfig.direction === "asc" ? -1 : 1;
      if (nextValue > primaryValue)
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [articles, sortConfig]);

  const handleHeaderClick = (key: keyof ArticlesInterface) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <Expanded
      articles={sortedArticles}
      handleHeaderClick={handleHeaderClick}
      sortConfig={sortConfig}
      page={page}
    />
  );
}
