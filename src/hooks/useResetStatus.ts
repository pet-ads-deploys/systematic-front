import { useContext } from "react";
import StudySelectionContext from "../components/Context/StudiesSelectionContext";
import AppContext from "../components/Context/AppContext";
import { UseChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "./useChangeStudyExtractionStatus";
import { PageLayout } from "../pages/Execution/Selection/subcomponents/LayoutFactory";

interface ResetButtonProps {
  page: PageLayout;
}

const useResetStatus = ({ page }: ResetButtonProps) => {
  const selectionContext = useContext(StudySelectionContext);
  const appContext = useContext(AppContext);

  const handleResetStatusToUnclassified = () => {
    const articles = selectionContext?.articles;
    const articleIndex = appContext?.selectionStudyIndex;

    if (articles && articleIndex) {
      const studyReviewId = articles[articleIndex].studyReviewId;
      page.type === "Selection"
        ? UseChangeStudySelectionStatus({
            studyReviewId,
            status: "UNCLASSIFIED",
          })
        : UseChangeStudyExtractionStatus({
            studyReviewId,
            status: "UNCLASSIFIED",
          });
    }
  };

  return { handleResetStatusToUnclassified };
};

export default useResetStatus;
