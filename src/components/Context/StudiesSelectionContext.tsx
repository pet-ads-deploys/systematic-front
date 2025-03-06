import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { KeyedMutator } from "swr";

import useGetAllReviewArticles from "../../hooks/useGetAllReviewArticles";

import { StudyInterface } from "../../../public/interfaces/IStudy";
import ArticleInterface from "../../../public/interfaces/ArticleInterface";

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
  invalidEntries: InvalidEntry[];
  setInvalidEntries: Dispatch<SetStateAction<InvalidEntry[]>>;
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

  const { articles, mutate } = useGetAllReviewArticles();

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
        invalidEntries,
        setInvalidEntries,
      }}
    >
      {children}
    </StudySelectionContext.Provider>
  );
};

export default StudySelectionContext;
