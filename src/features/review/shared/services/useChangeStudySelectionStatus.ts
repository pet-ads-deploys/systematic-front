import getRequestOptions from "@features/auth/utils/getRequestOptions";
import Axios from "../../../../infrastructure/http/axiosClient";

interface Props {
  studyReviewId: number[];
  status: "INCLUDED" | "EXCLUDED" | "UNCLASSIFIED";
  criterias: string[];
}

export const UseChangeStudySelectionStatus = ({
  studyReviewId,
  status,
  criterias,
}: Props) => {
  const id = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();
  const path = `systematic-study/${id}/study-review/selection-status`;

  Axios.patch(path, { status, criteria: criterias, studyReviewId }, options);
};
