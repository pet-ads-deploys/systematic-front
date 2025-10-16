import useSWR from "swr";
import Axios from "../../../../infrastructure/http/axiosClient";

export type HttpResponse = {
  userId: string;
  systematicStudyId: string;
  source: string;
  included: number[];
  excluded: number[];
  duplicated: number[];
  totalOfStudies: number;
};

const fetcher = async (
  systematicReviewId: string,
  databases: string[]
): Promise<HttpResponse[]> => {
  if (!systematicReviewId || databases.length === 0) return [];

  try {
    const results = await Promise.all(
      databases.map(async (db) => {
        const path = `systematic-study/${systematicReviewId}/report/source/${db}`;
        const res = await Axios.get<HttpResponse>(path);
        return res.data;
      })
    );
    return results;
  } catch (error) {
    console.error("Error fetching studies by source:", error);
    return [];
  }
};

const useFetchStudiesBySource = (databases: string[]) => {
  const systematicReviewId = localStorage.getItem("systematicReviewId");
  const shouldFetch = !!systematicReviewId && databases.length > 0;

  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? ["studiesBySource", ...databases] : null,
    () => fetcher(systematicReviewId!, databases),
    { revalidateOnFocus: false }
  );

  return {
    studiesData: data || [],
    isLoading: isLoading,
    mutateStudiesBySource: mutate,
  };
};

export default useFetchStudiesBySource;
