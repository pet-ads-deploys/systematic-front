import { useContext } from "react";

import StudySelectionContext from "../components/Context/StudiesSelectionContext";
import AppContext from "../components/Context/AppContext";

import { UseChangeStudySelectionStatus } from "./useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "./useChangeStudyExtractionStatus";

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

<<<<<<< HEAD
  const handleIncludeItemClick = (option: string, isChecked: boolean) => {
    console.log(`Include ${option}: ${isChecked}`);
    if (setIsIncluded) setIsIncluded(isChecked);

    if (article && "studyReviewId" in article) {
      if (page === "Selection") {
        UseChangeStudySelectionStatus({
          studyReviewId: [article.studyReviewId],
          status: "INCLUDED",
        });
      } else {
        UseChangeStudyExtractionStatus({
          studyReviewId: [article.studyReviewId],
          status: "INCLUDED",
        });
=======
  const handleIncludeItemClick = (isChecked: boolean, criterias: string[]) => {
    if (setIsIncluded) setIsIncluded(isChecked);
    if (articles && articleIndex) {
      if (article && "studyReviewId" in article) {
        page === "Selection"
          ? UseChangeStudySelectionStatus({
              studyReviewId: [article.studyReviewId],
              status: "INCLUDED",
              criterias,
            })
          : UseChangeStudyExtractionStatus({
              studyReviewId: [article.studyReviewId],
              status: "INCLUDED",
              criterias,
            });
        selectionContext.reloadArticles();
>>>>>>> development
      }
      selectionContext?.reloadArticles?.();
    }
  };

<<<<<<< HEAD
  const handleExcludeItemClick = (option: string, isChecked: boolean) => {
    console.log(`Exclude ${option}: ${isChecked}`);
    if (setIsExcluded) setIsExcluded(isChecked);

    if (article && "studyReviewId" in article) {
      if (page === "Selection") {
        UseChangeStudySelectionStatus({
          studyReviewId: [article.studyReviewId],
          status: "EXCLUDED",
        });
      } else {
        UseChangeStudyExtractionStatus({
          studyReviewId: [article.studyReviewId],
          status: "EXCLUDED",
        });
=======
  const handleExcludeItemClick = (isChecked: boolean, criterias: string[]) => {
    if (setIsExcluded) setIsExcluded(isChecked);
    if (articles && articleIndex) {
      if (article && "studyReviewId" in article) {
        page === "Selection"
          ? UseChangeStudySelectionStatus({
              studyReviewId: [article.studyReviewId],
              status: "EXCLUDED",
              criterias,
            })
          : UseChangeStudyExtractionStatus({
              studyReviewId: [article.studyReviewId],
              status: "EXCLUDED",
              criterias,
            });
        selectionContext.reloadArticles();
>>>>>>> development
      }
      selectionContext?.reloadArticles?.();
    }
  };

  return { handleIncludeItemClick, handleExcludeItemClick };
};

export default useComboBoxSelection;
