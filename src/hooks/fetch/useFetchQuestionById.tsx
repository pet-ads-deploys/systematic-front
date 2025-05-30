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

  const endpoint = id ? pathMap[type] : null;

  const fetcher = async (url: string) => {
    try {
      if (!questionId) return;
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(url, options);
      return response.data.question;
    } catch (error) {
      console.error(`Error fetching ${type} question:`, error);
      throw error;
    }
  };

  const { data, isLoading, mutate } = useSWR(endpoint, fetcher, {
    revalidateOnMount: false,
  });

  return {
    question: data,
    isLoading,
    mutate,
  };
}
