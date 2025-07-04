// External library
import { useContext } from "react";

// Context
import StudySelectionContext from "../context/StudiesSelectionContext";

// Hook
import { UseChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "./useChangeStudyExtractionStatus";

// Type
import type { PageLayout } from "../pages/Execution/subcomponents/LayoutFactory";
interface ComboBoxSelectionProps {
  page: PageLayout;
}

const useComboBoxSelection = ({ page }: ComboBoxSelectionProps) => {
  const selectionContext = useContext(StudySelectionContext);

  if (!selectionContext) throw new Error("Context not available");

  const {
    reloadArticles,
    selectedArticleReview,
    setIsIncluded,
    setIsExcluded,
  } = selectionContext;

  const handleIncludeItemClick = (isChecked: boolean, criterias: string[]) => {
    if (setIsIncluded) setIsIncluded(isChecked);
    page === "Selection"
      ? UseChangeStudySelectionStatus({
          studyReviewId: [selectedArticleReview],
          status: "INCLUDED",
          criterias,
        })
      : UseChangeStudyExtractionStatus({
          studyReviewId: [selectedArticleReview],
          status: "INCLUDED",
          criterias,
        });
    reloadArticles();
  };

  const handleExcludeItemClick = (isChecked: boolean, criterias: string[]) => {
    if (setIsExcluded) setIsExcluded(isChecked);
    page === "Selection"
      ? UseChangeStudySelectionStatus({
          studyReviewId: [selectedArticleReview],
          status: "EXCLUDED",
          criterias,
        })
      : UseChangeStudyExtractionStatus({
          studyReviewId: [selectedArticleReview],
          status: "EXCLUDED",
          criterias,
        });
    reloadArticles();
  };

  return { handleIncludeItemClick, handleExcludeItemClick };
};

export default useComboBoxSelection;
