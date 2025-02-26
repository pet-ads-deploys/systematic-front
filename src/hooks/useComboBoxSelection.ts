// External libraries
import { useContext } from "react";

// Contexts
import StudySelectionContext from "../components/Context/StudiesSelectionContext";
import AppContext from "../components/Context/AppContext";

// Hooks
import { UseChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "./useChangeStudyExtractionStatus";

// Types
import { PageLayout } from "../pages/Execution/subcomponents/LayoutFactory";
import ArticleInterface from "../../public/interfaces/ArticleInterface";
import { StudyInterface } from "../../public/interfaces/IStudy";

interface ComboBoxSelectionProps {
  page: PageLayout;
}

const useComboBoxSelection = ({ page }: ComboBoxSelectionProps) => {
  const selectionContext = useContext(StudySelectionContext);
  const appContext = useContext(AppContext);
  const setIsIncluded = selectionContext?.setIsIncluded;
  const setIsExcluded = selectionContext?.setIsExcluded;
  const articles = selectionContext?.articles;
  const articleIndex = appContext?.selectionStudyIndex;
  let article: ArticleInterface | StudyInterface;

  if (articles && articleIndex) article = articles[articleIndex];

  // Functions
  const handleIncludeItemClick = (isChecked: boolean) => {
    if (setIsIncluded) setIsIncluded(isChecked);
    if (articles && articleIndex) {
      if (article && "studyReviewId" in article) {
        page.type === "Selection"
          ? UseChangeStudySelectionStatus({
              studyReviewId: article.studyReviewId,
              status: "INCLUDED",
            })
          : UseChangeStudyExtractionStatus({
              studyReviewId: article.studyReviewId,
              status: "INCLUDED",
            });
        selectionContext.reloadArticles();
      }
    }
  };

  const handleExcludeItemClick = (isChecked: boolean) => {
    if (setIsExcluded) setIsExcluded(isChecked);
    if (articles && articleIndex) {
      if (article && "studyReviewId" in article) {
        page.type === "Selection"
          ? UseChangeStudySelectionStatus({
              studyReviewId: article.studyReviewId,
              status: "EXCLUDED",
            })
          : UseChangeStudyExtractionStatus({
              studyReviewId: article.studyReviewId,
              status: "EXCLUDED",
            });
        selectionContext.reloadArticles();
      }
    }
  };

  return { handleIncludeItemClick, handleExcludeItemClick };
};

export default useComboBoxSelection;
