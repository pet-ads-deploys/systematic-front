import axios from "axios";
import getRequestOptions from "../../utils/getRequestOptions";

type PriorityValue = "VERY LOW" | "LOW" | "HIGH" | "VERY HIGH";

interface ChangePriorityInArticle {
  studyReviewId: number;
  status: PriorityValue;
  criteria?: string[];
}

export default function useChangePriority() {
  const handleChangePriority = async ({
    studyReviewId,
    status,
    criteria = [],
  }: ChangePriorityInArticle) => {
    try {
      const id = localStorage.getItem("systematicReviewId");
      const options = getRequestOptions();
      const path = `http://localhost:8080/api/v1/systematic-study/${id}/study-review/reading-priority`;
      axios.patch(path, { studyReviewId, status, criteria }, options);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChangePriority };
}
