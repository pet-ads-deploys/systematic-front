export interface PaginationControls {
  currentPage: number;
  itensPerPage: number;
  quantityOfPages: number;
  totalElements: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleBackToInitial: () => void;
  handleGoToFinal: () => void;
  changeQuantityOfItens: (newQuantity: number) => void;
}
