import React, { ReactNode, createContext, useEffect, useState } from "react";
import ArticleInterface from "../../../public/interfaces/ArticleInterface";
import useGetAllReviewArticles from "../../hooks/useGetAllReviewArticles";
import { useSWRConfig } from "swr";

interface AppContextType {
    isIncluded: boolean;
    setIsIncluded: React.Dispatch<React.SetStateAction<boolean>>;
    isExcluded: boolean;
    setIsExcluded: React.Dispatch<React.SetStateAction<boolean>>;
    articles: ArticleInterface[];
    reloadArticles: () => void;
    reload: boolean;
}

const StudySelectionContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const StudySelectionProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isIncluded, setIsIncluded] = useState(false);
  const [reload, setReload] = useState(false);
  const [isExcluded, setIsExcluded] = useState(false);
  // const [articles, setArticles] = useState<ArticleInterface[]>([]);
  
  const {articles, mutate} = useGetAllReviewArticles();

  // useEffect(() => {
  //   console.log("Artigos fetchados:", fetchedArticles);
  //   if (fetchedArticles && fetchedArticles.length > 0) {
  //     // Usar uma verificação de igualdade para garantir re-renderização
  //     if (JSON.stringify(fetchedArticles) !== JSON.stringify(articles)) {
  //       console.log("Atualizando articles!!!");
  //       setArticles([...fetchedArticles]); // Criar uma nova referência
  //     }
  //   }
  // }, [fetchedArticles]); // Remover reloadArticles da dependência

  // function reloadArticles() {
  //   setReload(prevReload => !prevReload);
  // }


  return (
    <StudySelectionContext.Provider
      value={{
        isIncluded,
        setIsIncluded,
        isExcluded,
        setIsExcluded,
        articles,
        reloadArticles: mutate,
        reload,
      }}
    >
      {children}
    </StudySelectionContext.Provider>
  );
};

export default StudySelectionContext;
