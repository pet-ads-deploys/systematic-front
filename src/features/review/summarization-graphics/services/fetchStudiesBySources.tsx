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

export async function fetchStudiesBySource(
  databases: string[]
): Promise<HttpResponse[]> {
  const systematicReviewId = localStorage.getItem("systematicReviewId");
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
    console.error("Erro ao buscar dados para os estudos por fonte:", error);
    return [];
  }
}
