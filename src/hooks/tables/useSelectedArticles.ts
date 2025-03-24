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

  const [firstSelected, setFirstSelected] = useState<number | null>(null);
  const [deletedArticles, setDeletedArticles] = useState<number[]>([]);

  const isAlreadySelectedArticle = (
    content: Record<number, SelectedArticlesProps>,
    id: number
  ) => {
    return content[id] !== undefined;
  };

  const toggleArticlesSelection = (id: number, title: string) => {
    const updatedSelectedArticles = { ...selectedArticles };
    let newDeletedArticles = [...deletedArticles];
    const isAlreadyArticle = isAlreadySelectedArticle(
      updatedSelectedArticles,
      id
    );
    if (isAlreadyArticle) {
      delete updatedSelectedArticles[id];
      newDeletedArticles = newDeletedArticles.filter(
        (articleId) => articleId !== id
      );
      if (firstSelected === id) {
        setFirstSelected(null);
      }
    } else {
      if (firstSelected === null) {
        setFirstSelected(id);
      } else {
        newDeletedArticles.push(id);
      }
      updatedSelectedArticles[id] = { id, title, isChecked: true };
    }

    setSelectedArticles(updatedSelectedArticles);
    setDeletedArticles(newDeletedArticles);
  };

  const clearSelectedArticles = () => {
    setSelectedArticles({});
    setFirstSelected(null);
    setDeletedArticles([])
  };

  return {
    selectedArticles,
    toggleArticlesSelection,
    clearSelectedArticles,
    firstSelected,
    deletedArticles,
  };
}
