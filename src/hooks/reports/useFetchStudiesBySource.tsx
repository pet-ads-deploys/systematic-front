// External library
import useSWR from "swr";

// Service
import Axios from "../../interceptor/interceptor";

// Utils
import getRequestOptions from "../../utils/getRequestOptions";

type StudieBySource = {
  source: string;
};

type HttpResponse = {
  userId: string;
  systematicStudyId: string;
  source: string;
  included: number[];
  excluded: number[];
  duplicated: number[];
  totalOfStudies: number;
};

export default function useFetchStudiesBySource({ source }: StudieBySource) {
  const id = localStorage.getItem("systematicReviewId");

  const path = `http://localhost:8080/api/v1/systematic-study/${id}/report/source/${source}`;

  const { data, isLoading, mutate } = useSWR(path, fetchGetAllStudiesBySource, {
    revalidateOnFocus: false,
  });

  async function fetchGetAllStudiesBySource() {
    try {
      if (source === "" || !id) return;
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(path, options);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    studiesBySource: data,
    isLoading,
    mutate,
  };
}
