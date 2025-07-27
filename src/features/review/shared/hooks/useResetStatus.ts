// External library
import { useContext } from "react";

// Context
import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

// Hooks
import { UseChangeStudySelectionStatus } from "../services/useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "../services/useChangeStudyExtractionStatus";

//Types
import { PageLayout } from "../components/structure/LayoutFactory";
import useFocusedArticle from "./useFocusedArticle";

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
