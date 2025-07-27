import useSWR from "swr";
import Axios from "../../../../service/api/Axios";
import getRequestOptions from "@features/auth/utils/getRequestOptions";
import { useFetchExtractionQuestions } from "../../execution-extraction/services/useFetchExtractionQuestions";
import { useFetchRobQuestions } from "../../execution-extraction/services/useFetchRobQuestions";

export type AnswerData = {
  userId: string;
  systematicStudyId: string;
  question: {
    questionId: string;
    systematicStudyId: string;
    code: string;
    description: string;
    questionType: "TEXTUAL" | "LABELED_SCALE" | "NUMBERED_SCALE" | "PICK_LIST";
    scales: Record<string, number> | null;
    higher: number | null;
    lower: number | null;
    options: string[] | null;
    context: "EXTRACTION" | "ROB";
  };
  answer: Record<string, number[]>;
};

const fetcher = async (
  systematicStudyId: string,
  questionIds: (string | null)[]
): Promise<AnswerData[]> => {
  if (!systematicStudyId || questionIds.length === 0) return [];

  const options = getRequestOptions();

  try {
    const results = await Promise.all(
      questionIds.map(async (id) => {
        const path = `http://localhost:8080/api/v1/systematic-study/${systematicStudyId}/report/find-answer/${id}`;
        const res = await Axios.get<AnswerData>(path, options);
        return res.data;
      })
    );
    return results;
  } catch (error) {
    console.error("Error fetching question answers:", error);
    return [];
  }
};

const useFetchQuestionAnswers = () => {
  const extractionQuestions = useFetchExtractionQuestions().questions || [];
  const robQuestions = useFetchRobQuestions().questions || [];
  const questions = [...extractionQuestions, ...robQuestions];

  const questionIds = questions.map((q) => q.questionId);
  const systematicStudyId = localStorage.getItem("systematicReviewId");
  const shouldFetch = !!systematicStudyId && questionIds.length > 0;

  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? ["extractionAnswers", ...questionIds] : null,
    () => fetcher(systematicStudyId!, questionIds),
    { revalidateOnFocus: false }
  );

  return {
    extractionAnswers: data || [],
    isLoadingExtractionAnswers: isLoading,
    mutateExtractionAnswers: mutate,
  };
};

export default useFetchQuestionAnswers;
