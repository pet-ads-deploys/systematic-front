import axios from "axios";
import getRequestOptions from "@features/auth/utils/getRequestOptions";

interface SendDuplicatedStudiesProps {
  firstSelected: number;
  duplicatedStudies: number[];
}

export default function useSendDuplicatedStudies({
  firstSelected,
  duplicatedStudies,
}: SendDuplicatedStudiesProps) {
  const studyReviewId = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();

  const sendDuplicatedStudies = () => {
    if (firstSelected === null) return;
    const path = `http://localhost:8080/api/v1/systematic-study/${studyReviewId}/study-review/${firstSelected}/duplicated`;
    axios.patch(path, { duplicatedStudyIds: duplicatedStudies }, options);
  };

  return {
    sendDuplicatedStudies,
  };
}
