import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { KeyedMutator } from "swr";

import useGetAllReviewArticles from "../hooks/useGetAllReviewArticles";

import { StudyInterface } from "../../public/interfaces/IStudy";
import ArticleInterface from "../../public/interfaces/ArticleInterface";
import useSelectedArticles from "../hooks/tables/useSelectedArticles";

export interface InvalidEntry {
  id: string;
  fileName: string;
  fileExtension: string;
  entries: string[];
}

interface AppContextType {
  isIncluded: boolean;
  setIsIncluded: React.Dispatch<React.SetStateAction<boolean>>;
  isExcluded: boolean;
  setIsExcluded: React.Dispatch<React.SetStateAction<boolean>>;
  articles: ArticleInterface[] | StudyInterface[] | [];
  reloadArticles: KeyedMutator<ArticleInterface[] | StudyInterface[] | []>;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  invalidEntries: InvalidEntry[];
  setInvalidEntries: Dispatch<SetStateAction<InvalidEntry[]>>;
  isLoading: boolean;
  selectedArticles: Record<
    number,
    { id: number; title: string; isChecked: boolean }
  >;
  toggleArticlesSelection: (id: number, tittle: string) => void;
  firstSelected: number | null;
  deletedArticles: number[] | [];
  clearSelectedArticles: () => void;
  selectedArticleReview: number;
  setSelectedArticleReview: Dispatch<SetStateAction<number>>;
}

const StudySelectionContext = createContext<AppContextType | undefined>(
  undefined
);

interface AppProviderProps {
  children: ReactNode;
}

export const StudySelectionProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  const [isIncluded, setIsIncluded] = useState(false);
  const [reload, setReload] = useState(false);
  const [isExcluded, setIsExcluded] = useState(false);
  const [invalidEntries, setInvalidEntries] = useState<InvalidEntry[]>([]);
  const [selectedArticleReview, setSelectedArticleReview] = useState(-1);

  const { articles, mutate, isLoading } = useGetAllReviewArticles();

  const {
    selectedArticles,
    toggleArticlesSelection,
    firstSelected,
    deletedArticles,
    clearSelectedArticles,
  } = useSelectedArticles();

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
        setReload,
        invalidEntries,
        setInvalidEntries,
        isLoading,
        selectedArticles,
        toggleArticlesSelection,
        firstSelected,
        deletedArticles,
        clearSelectedArticles,
        selectedArticleReview,
        setSelectedArticleReview,
      }}
    >
      {children}
    </StudySelectionContext.Provider>
  );
};

export default StudySelectionContext;
