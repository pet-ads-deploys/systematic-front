import Axios from "../../../../infrastructure/http/axiosClient";
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
    const path = `systematic-study/${studyReviewId}/study-review/${firstSelected}/duplicated`;
    Axios.patch(path, { duplicatedStudyIds: duplicatedStudies }, options);
  };

  return {
    sendDuplicatedStudies,
  };
}
