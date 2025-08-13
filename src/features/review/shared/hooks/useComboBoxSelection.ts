// External library
import { useCallback, useContext } from "react";

// Context
import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

// Hook
import { UseChangeStudySelectionStatus } from "../services/useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "../services/useChangeStudyExtractionStatus";

// Type
import type { PageLayout } from "../components/structure/LayoutFactory";
interface ComboBoxSelectionProps {
  page: PageLayout;
}

const useComboBoxSelection = ({ page }: ComboBoxSelectionProps) => {
  const selectionContext = useContext(StudySelectionContext);

  if (!selectionContext) throw new Error("Context not available");

  const { reloadArticles, selectedArticleReview } = selectionContext;

  const changeStatus = useCallback(
    (status: "INCLUDED" | "EXCLUDED", criterias: string[]) => {
      const getFunction =
        page === "Selection"
          ? UseChangeStudySelectionStatus
          : UseChangeStudyExtractionStatus;

      getFunction({
        studyReviewId: [selectedArticleReview],
        criterias,
        status,
      });
      reloadArticles();
    },
    [page, selectedArticleReview, reloadArticles]
  );

  const handleIncludeItemClick = useCallback(
    (criterias: string[]) => {
      changeStatus("INCLUDED", criterias);
    },
    [changeStatus]
  );

  const handleExcludeItemClick = useCallback(
    (criterias: string[]) => {
      changeStatus("EXCLUDED", criterias);
    },
    [changeStatus]
  );

  return { handleIncludeItemClick, handleExcludeItemClick };
};

export default useComboBoxSelection;
