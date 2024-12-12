
import ArticlesInterface from '../../../../public/interfaces/ArticleInterface';
import AppContext from "../../Context/AppContext";
import { useContext, useMemo, useState } from "react";
import Collapsed from "./Collapsed";
import Expanded from "./Expanded";
import ArticleInterface from '../../../../public/interfaces/ArticleInterface';

interface Props {
    articles: ArticlesInterface[]
}

function ArticlesTable({articles}: Props) {
    const [sortConfig, setSortConfig] = useState<{key: keyof ArticleInterface; direction: "asc" | "desc"} | null>(null);
    const context = useContext(AppContext);
    if(!context) {
        throw new Error('Failed to get the context on articles table');
    }
    const { sidebarState } = context


    const sortedArticles = useMemo(() => {
        if(!sortConfig) return articles;
        const sorted = [...articles].sort((primary,secund) => {
            const primaryValue = primary[sortConfig?.key];
            const nextValue = secund[sortConfig?.key];

            if (primaryValue > nextValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (nextValue > primaryValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [articles, sortConfig])


    const handleHeaderClick = (key: keyof ArticlesInterface) => {
        setSortConfig((prevConfig) => {
          if (prevConfig?.key === key) {
            return { key, direction: prevConfig.direction === "asc" ? "desc" : "asc" };
          }
          return { key, direction: "asc" };
        });
      };
    
      return sidebarState === "open" ? (
        <Collapsed articles={sortedArticles} handleHeaderClick={handleHeaderClick} />
      ) : (
        <Expanded articles={sortedArticles} handleHeaderClick={handleHeaderClick} />
      );
}

export default ArticlesTable;