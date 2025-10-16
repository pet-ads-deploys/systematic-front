import useSWR from "swr";
import Axios from "../../../../infrastructure/http/axiosClient";

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
  const path = `systematic-study/${id}/search-session-source/${source}`;

  const { data, error, isLoading, mutate } = useSWR(path, fetchSessions, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  async function fetchSessions() {
    try {
      const response = await Axios.get<HttpResponse>(path);
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
