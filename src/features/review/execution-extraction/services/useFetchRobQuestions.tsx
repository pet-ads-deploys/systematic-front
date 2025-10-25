// External library
import useSWR from "swr";

// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Types
import type { Questions } from "../types";

interface HttpResponse {
  questions: Questions[];
}

export function useFetchRobQuestions() {
  const id = localStorage.getItem("systematicReviewId");

  const { data, isLoading, mutate } = useSWR(
    `systematic-study/${id}/protocol/rob-question`,
    fetchExtractionQuestion,
    { revalidateOnFocus: false }
  );

  async function fetchExtractionQuestion() {
    try {
      const response = await Axios.get<HttpResponse>(
        `systematic-study/${id}/protocol/rob-question`
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
