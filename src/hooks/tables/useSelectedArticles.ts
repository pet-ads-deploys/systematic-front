import { useState } from "react";

export interface SelectedArticlesProps {
  id: number;
  isChecked: boolean;
  title: string;
}

export default function useSelectedArticles() {
  const [selectedArticles, setSelectedArticles] = useState<
    Record<number, SelectedArticlesProps>
  >({});

  const isAlreadySelectedArticle = (
    content: Record<number, SelectedArticlesProps>,
    id: number
  ) => {
    return content[id] !== undefined;
  };

  const toggleArticlesSelection = (id: number, title: string) => {
    const updatedArticles = { ...selectedArticles };
    const isAlreadyArticle = isAlreadySelectedArticle(updatedArticles, id);
    isAlreadyArticle
      ? delete updatedArticles[id]
      : (updatedArticles[id] = { id, title, isChecked: true });
    setSelectedArticles(updatedArticles);
  };

  const clearSelectedArticles = () => {
    setSelectedArticles({});
  };


  return {
    selectedArticles,
    toggleArticlesSelection,
    clearSelectedArticles,
  };
}
