// External library
import useSWR from "swr";

// Service
import Axios from "../../interceptor/interceptor";

// Utils
import getRequestOptions from "../../utils/getRequestOptions";

// Types
import type { Questions } from "../../pages/Execution/Extraction/subcomponents/forms/types";

type QuestionByIdProps = {
  questionId: string;
  type: "Extraction" | "Risk_of_bias";
};

type HttpResponse = {
  question: Questions;
};

export function useFetchQuestionById({ questionId, type }: QuestionByIdProps) {
  const id = localStorage.getItem("systematicReviewId");

  const extractionPath = `http://localhost:8080/api/v1/systematic-study/${id}/protocol/rob-question/${questionId}`;
  const robPath = `http://localhost:8080/api/v1/systematic-study/${id}/protocol/extraction-question/${questionId}`;

  const path = type == "Extraction" ? extractionPath : robPath;

  const { data, isLoading, mutate } = useSWR(path, fetchExtractionQuestion, {
    revalidateOnFocus: false,
  });

  async function fetchExtractionQuestion() {
    try {
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(path, options);

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
