// Hooks
import { UseChangeStudySelectionStatus } from "../services/useChangeStudySelectionStatus";
import { UseChangeStudyExtractionStatus } from "../services/useChangeStudyExtractionStatus";

//Types
import { PageLayout } from "../components/structure/LayoutFactory";
import useFocusedArticle from "./useFocusedArticle";
import { SelectionArticles } from "@features/review/execution-selection/services/useFetchSelectionArticles";
import { KeyedMutator } from "swr";

interface ResetButtonProps {
  page: PageLayout;
  reloadArticles: KeyedMutator<SelectionArticles>;
}

const useResetStatus = ({ page, reloadArticles }: ResetButtonProps) => {
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
    reloadArticles();
  };

  return { handleResetStatusToUnclassified };
};

export default useResetStatus;
