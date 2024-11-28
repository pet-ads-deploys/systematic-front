import React, { ReactNode, createContext, useEffect, useState } from "react";
import ArticleInterface from "../../../public/interfaces/ArticleInterface";
import useGetAllReviewArticles from "../../hooks/useGetAllReviewArticles";

interface AppContextType {
    isIncluded: boolean;
    setIsIncluded: React.Dispatch<React.SetStateAction<boolean>>;
    isExcluded: boolean;
    setIsExcluded: React.Dispatch<React.SetStateAction<boolean>>;
    articles: ArticleInterface[];
}

const StudySelectionContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const StudySelectionProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isIncluded, setIsIncluded] = useState(false);
    const [isExcluded, setIsExcluded] = useState(false);
    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const fetchedArticles = useGetAllReviewArticles() as ArticleInterface[];

    useEffect(() => {
      if(fetchedArticles.length > 0) {
        console.log("atualizando articles!!!");
        setArticles(fetchedArticles);
      }
    }, [fetchedArticles])

  return (
    <StudySelectionContext.Provider
      value={{
        isIncluded, 
        setIsIncluded,
        isExcluded,
        setIsExcluded,
        articles
      }}
    >
      {children}
    </StudySelectionContext.Provider>
  );
};

export default StudySelectionContext;
