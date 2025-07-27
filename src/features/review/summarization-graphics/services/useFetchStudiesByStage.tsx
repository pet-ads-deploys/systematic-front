import useSWR from "swr";
import Axios from "../../../../service/api/Axios";
import getRequestOptions from "@features/auth/utils/getRequestOptions";

type StudiesByStageData = {
  userId: string;
  systematicStudyId: string;
  stage: string;
  includedStudies: {
    ids: number[];
    amount: number;
  };
  excludedStudies: {
    ids: number[];
    amount: number;
  };
  unclassifiedStudies: {
    ids: number[];
    amount: number;
  };
};

export const useFetchStudiesByStage = (stage: string) => {
  const id = localStorage.getItem("systematicReviewId");
  const path = `http://localhost:8080/api/v1/systematic-study/${id}/report/studies/${stage}`;

  const { data, isLoading, mutate } = useSWR(path, fetchStudiesByStage, {
    revalidateOnFocus: false,
  });

  async function fetchStudiesByStage() {
    if (!id) return;
    try {
      const response = await Axios.get<StudiesByStageData>(
        path,
        getRequestOptions()
      );

      return response.data;
    } catch {
      console.error("Failed to get studies by stage");
    }
  }

  return {
    studiesByStage: data,
    isLoadingByStage: isLoading,
    mutate,
  };
};
