import { useContext } from "react";
import StudySelectionContext from "../components/Context/StudiesSelectionContext";
import AppContext from "../components/Context/AppContext";
import { useChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";

const useComboBoxSelection = () => {
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
      useChangeStudySelectionStatus({studyReviewId, status: 'INCLUDED'})
    }
  };

  const handleExcludeItemClick = (isChecked: boolean) => {
    if(setIsExcluded) setIsExcluded(isChecked);
    const articles = selectionContext?.articles;
    const articleIndex = appContext?.selectionStudyIndex;
    
    if(articles && articleIndex){
      const studyReviewId = articles[articleIndex].studyReviewId;
      useChangeStudySelectionStatus({studyReviewId, status: 'EXCLUDED'})
    }
  }

  return { handleIncludeItemClick, handleExcludeItemClick };
};

export default useComboBoxSelection;
