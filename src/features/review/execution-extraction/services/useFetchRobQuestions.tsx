import useSWR from "swr";
import Axios from "../../../../interceptor/interceptor";
import getRequestOptions from "@features/auth/utils/getRequestOptions";
import { Questions } from "../types";

interface HttpResponse {
  questions: Questions[];
}

export function useFetchRobQuestions() {
  const id = localStorage.getItem("systematicReviewId");

  const { data, isLoading, mutate } = useSWR(
    `http://localhost:8080/api/v1/systematic-study/${id}/protocol/rob-question`,
    fetchExtractionQuestion,
    { revalidateOnFocus: false }
  );

  async function fetchExtractionQuestion() {
    try {
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(
        `http://localhost:8080/api/v1/systematic-study/${id}/protocol/rob-question`,
        options
      );

      return response.data;
    } catch (error) {
      console.error("error of risk of bias Questions", error);
      throw error;
    }
  }

  return {
    questions: data?.questions,
    isLoading,
    mutate,
  };
}
