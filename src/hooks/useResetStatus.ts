import { useContext } from "react";

import StudySelectionContext from "../components/Context/StudiesSelectionContext";
import AppContext from "../components/Context/AppContext";

import { UseChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "./useChangeStudyExtractionStatus";

//Types
import { PageLayout } from "../pages/Execution/subcomponents/LayoutFactory";

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
      const article = articles[articleIndex];
      if (article && "studyReviewId" in article) {
        page === "Selection"
          ? UseChangeStudySelectionStatus({
              studyReviewId: [article.studyReviewId],
              status: "UNCLASSIFIED",
            })
          : UseChangeStudyExtractionStatus({
              studyReviewId: [article.studyReviewId],
              status: "UNCLASSIFIED",
            });
      }
      selectionContext?.reloadArticles();
    }
  };

  return { handleResetStatusToUnclassified };
};

export default useResetStatus;
