// External library
import useSWR from "swr";

// Service
import Axios from "../../interceptor/interceptor";

// Utils
import getRequestOptions from "../../utils/getRequestOptions";

// Types
import type { Questions } from "../../pages/Execution/Extraction/subcomponents/forms/types";
import type { FormType } from "./useFetchAllQuestionsByArticle";

type QuestionByIdProps = {
  questionId: string;
  type: FormType;
};

type HttpResponse = {
  question: Questions;
};

export function useFetchQuestionById({ questionId, type }: QuestionByIdProps) {
  const id = localStorage.getItem("systematicReviewId");

  const pathMap: Record<FormType, string> = {
    EXTRACTION: `http://localhost:8080/api/v1/systematic-study/${id}/protocol/extraction-question/${questionId}`,
    RISK_OF_BIAS: `http://localhost:8080/api/v1/systematic-study/${id}/protocol/rob-question/${questionId}`,
  };

  const { data, isLoading, mutate } = useSWR(
    pathMap[type],
    fetchExtractionQuestion,
    {
      revalidateOnFocus: false,
    }
  );

  async function fetchExtractionQuestion() {
    try {
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(pathMap[type], options);
      return response.data;
    } catch (error) {
      console.error(`error of ${type} Questions`, error);
      throw error;
    }
  }

  return {
    question: data?.question,
    isLoading,
    mutate,
  };
}
