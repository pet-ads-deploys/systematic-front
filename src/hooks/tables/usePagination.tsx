import { useState } from "react";
import ArticleInterface from "../../../public/interfaces/ArticleInterface";

const ITENS_PER_PAGE = 13;

export default function usePagination(articles: ArticleInterface[]) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const quantityOfElements = articles.length;
  const quantityOfPages = Math.ceil(quantityOfElements / ITENS_PER_PAGE);

  const startPosition = (currentPage - 1) * ITENS_PER_PAGE;
  const finalPosition = startPosition + ITENS_PER_PAGE;

  const paginatedArticles: ArticleInterface[] = articles.slice(
    startPosition,
    finalPosition
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev % quantityOfPages) + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(
      (prev) => ((prev - 2 + quantityOfPages) % quantityOfPages) + 1
    );
  };

  return {
    currentPage,
    setCurrentPage,
    quantityOfPages,
    paginatedArticles,
    handleNextPage,
    handlePrevPage,
  };
}
