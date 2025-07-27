import useSWR from "swr";
import Axios from "../../../../service/api/Axios";

import getRequestOptions from "@features/auth/utils/getRequestOptions";

interface HttpResponse {
  searchSessions: {
    id: string;
    systematicStudyd: string;
    userId: string;
    searchString: string;
    additionalInfo: string;
    timestamp: string;
    source: string;
    numberOfRelatedStudies: number;
  }[];
}

export default function useGetSession(source: string) {
  const id = localStorage.getItem("systematicReviewId");
  const path = `http://localhost:8080/api/v1/systematic-study/${id}/search-session-source/${source}`;
  const options = getRequestOptions();

  const { data, error, isLoading, mutate } = useSWR(path, fetchSessions, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  async function fetchSessions() {
    try {
      const response = await Axios.get<HttpResponse>(path, options);
      return response.data.searchSessions;
    } catch (error) {
      throw new Error(`Erro ao buscar sessões: ${error}`);
    }
  }

  return {
    data: data || [],
    error,
    isLoading,
    mutate,
  };
}
