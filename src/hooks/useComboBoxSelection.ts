import { useContext } from "react";
import StudySelectionContext from "../components/Context/StudiesSelectionContext";
import AppContext from "../components/Context/AppContext";
import { UseChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "./useChangeStudyExtractionStatus";
import { PageLayout } from "../pages/Execution/Selection/subcomponents/LayoutFactory";

interface ComboBoxSelectionProps{
  page: PageLayout
}

const useComboBoxSelection = ({page}: ComboBoxSelectionProps) => {
  const selectionContext = useContext(StudySelectionContext);
  const appContext = useContext(AppContext);
  const setIsIncluded = selectionContext?.setIsIncluded;
  const setIsExcluded = selectionContext?.setIsExcluded;

  const handleIncludeItemClick = (isChecked: boolean) => {
    if(setIsIncluded) setIsIncluded(isChecked);
    const articles = selectionContext?.articles;
    const articleIndex = appContext?.selectionStudyIndex;
    
    if(articles && articleIndex){
      const studyReviewId = articles[articleIndex].studyReviewId;
      page.type === "Selection" ? UseChangeStudySelectionStatus({studyReviewId, status: 'INCLUDED'}) : UseChangeStudyExtractionStatus({studyReviewId, status: 'INCLUDED'})
      selectionContext.reloadArticles();
    }
  };

  const handleExcludeItemClick = (isChecked: boolean) => {
    if(setIsExcluded) setIsExcluded(isChecked);
    const articles = selectionContext?.articles;
    const articleIndex = appContext?.selectionStudyIndex;
    
    if(articles && articleIndex){
      const studyReviewId = articles[articleIndex].studyReviewId;
      page.type === "Selection" ? UseChangeStudySelectionStatus({studyReviewId, status: 'EXCLUDED'}) : UseChangeStudyExtractionStatus({studyReviewId, status: 'EXCLUDED'})
      selectionContext.reloadArticles();
    }
  }

  return { handleIncludeItemClick, handleExcludeItemClick };
};

export default useComboBoxSelection;
