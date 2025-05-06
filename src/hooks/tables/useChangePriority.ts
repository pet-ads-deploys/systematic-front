import { useContext } from "react";
import AppContext from "../../components/Context/AppContext";

import axios from "axios";
import getRequestOptions from "../../utils/getRequestOptions";
import StudySelectionContext from "../../components/Context/StudiesSelectionContext";
import ArticleInterface from "../../../public/interfaces/ArticleInterface";
import { StudyInterface } from "../../../public/interfaces/IStudy";

type PriorityValue = "VERY_LOW" | "LOW" | "HIGH" | "VERY_HIGH";

const priorityMap: Record<string, PriorityValue> = {
  "Very Low": "VERY_LOW",
  Low: "LOW",
  High: "HIGH",
  "Very High": "VERY_HIGH",
};

interface ChangePriorityInArticle {
  status: string;
  criteria?: string[];
}

export default function useChangePriority() {
  const selectionContext = useContext(StudySelectionContext);
  const appContext = useContext(AppContext);
  const articleIndex = appContext?.selectionStudyIndex;
  const articles = selectionContext?.articles;
  let article: ArticleInterface | StudyInterface;

  if (articles && articleIndex) article = articles[articleIndex];

  const handleChangePriority = async ({
    status,
    criteria = [],
  }: ChangePriorityInArticle) => {
    if (articleIndex === undefined || !selectionContext) {
      console.warn("Context not available, cannot change priority.");
      return;
    }

    try {
      const id = localStorage.getItem("systematicReviewId");
      const options = getRequestOptions();

      const priorityValue = priorityMap[status];
      if (!priorityValue) {
        throw new Error(`Invalid status: ${status}`);
      }

      if (articles && articleIndex) {
        if (article && "studyReviewId" in article) {
          const path = `http://localhost:8080/api/v1/systematic-study/${id}/study-review/reading-priority`;
          await axios.patch(
            path,
            {
              studyReviewId: [article.studyReviewId],
              status: priorityValue,
              criteria,
            },
            options
          );
          selectionContext.reloadArticles();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChangePriority };
}
