import Axios from "../../../../service/api/Axios";
import getRequestOptions from "@features/auth/utils/getRequestOptions";

export type HttpResponse = {
  userId: string;
  systematicStudyId: string;
  source: string;
  included: number[];
  excluded: number[];
  duplicated: number[];
  totalOfStudies: number;
};

export async function fetchStudiesBySource(
  databases: string[]
): Promise<HttpResponse[]> {
  const systematicReviewId = localStorage.getItem("systematicReviewId");
  if (!systematicReviewId || databases.length === 0) return [];

  const options = getRequestOptions();

  try {
    const results = await Promise.all(
      databases.map(async (db) => {
        const path = `http://localhost:8080/api/v1/systematic-study/${systematicReviewId}/report/source/${db}`;
        const res = await Axios.get<HttpResponse>(path, options);
        return res.data;
      })
    );
    return results;
  } catch (error) {
    console.error("Erro ao buscar dados para os estudos por fonte:", error);
    return [];
  }
}
