// External library
import { useContext } from "react";

// Context
import StudySelectionContext from "../components/Context/StudiesSelectionContext";

// Hooks
import { UseChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "./useChangeStudyExtractionStatus";

//Types
import { PageLayout } from "../pages/Execution/subcomponents/LayoutFactory";
import useFocusedArticle from "./reviews/useFocusedArticle";

interface ResetButtonProps {
  page: PageLayout;
}

const useResetStatus = ({ page }: ResetButtonProps) => {
  const selectionContext = useContext(StudySelectionContext);

  const { articleInFocus } = useFocusedArticle({ page });

  const handleResetStatusToUnclassified = () => {
    const articleId = articleInFocus ? articleInFocus?.studyReviewId : -1;

    page === "Selection"
      ? UseChangeStudySelectionStatus({
          studyReviewId: [articleId],
          status: "UNCLASSIFIED",
          criterias: [],
        })
      : UseChangeStudyExtractionStatus({
          studyReviewId: [articleId],
          status: "UNCLASSIFIED",
          criterias: [],
        });
    selectionContext?.reloadArticles();
  };

  return { handleResetStatusToUnclassified };
};

export default useResetStatus;
