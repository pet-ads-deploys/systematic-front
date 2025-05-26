import Axios from "../../interceptor/interceptor";
import getRequestOptions from "../../utils/getRequestOptions";


type HttpResponse = {
  userId: string;
  systematicStudyId: string;
  source: string;
  included: number[];
  excluded: number[];
  duplicated: number[];
  totalOfStudies: number;
};

type StudyTotalByDatabase = {
  label: string;
  total: number;
};


export async function FetchStudiesBySource(
  databases: string[],
): Promise<StudyTotalByDatabase[]> {
const systematicReviewId = localStorage.getItem("systematicReviewId");
  if (!systematicReviewId || databases.length === 0) return [];

  const options = getRequestOptions();

  try {
    const results = await Promise.all(
      databases.map(async (db) => {
        const path = `http://localhost:8080/api/v1/systematic-study/${systematicReviewId}/report/source/${db}`;
        const res = await Axios.get<HttpResponse>(path, options);
        return {
          label: db,
          total: res.data.totalOfStudies,
        };
      })
    );
    return results;
  } catch (error) {
    console.error("Erro ao buscar dados para o gráfico de total de estudos por fonte:", error);
    return [];
  }
}
