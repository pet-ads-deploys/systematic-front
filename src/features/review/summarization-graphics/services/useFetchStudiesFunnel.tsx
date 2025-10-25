import useSWR from "swr";
import Axios from "../../../../infrastructure/http/axiosClient";

type StudiesFunnelData = {
  userId: string;
  systematicStudyId: string;
  totalIdentifiedBySource: {
    [source: string]: number;
  };
  totalAfterDuplicatesRemovedBySource: {
    [source: string]: number;
  };
  totalScreened: number;
  totalExcludedInScreening: number;
  excludedByCriterion: {
    [criteria: string]: number;
  };
  totalFullTextAssessed: number;
  totalExcludedInFullText: number;
  totalExcludedByCriterion: {
    [criteria: string]: number;
  };
  totalIncluded: number;
};

export const useFetchStudiesFunnel = () => {
  const id = localStorage.getItem("systematicReviewId");
  const path = `systematic-study/${id}/report/studies-funnel`;

  const { data, isLoading, mutate } = useSWR(path, fetchStudiesFunnel, {
    revalidateOnFocus: false,
  });

  async function fetchStudiesFunnel() {
    if (!id) return;
    try {
      const response = await Axios.get<StudiesFunnelData>(path);
      return response.data;
    } catch (error) {
      console.error("Error fetching studeis funnel:", error);
    }
  }

  return {
    funnelData: data,
    isLoading,
    mutate,
  };
};
