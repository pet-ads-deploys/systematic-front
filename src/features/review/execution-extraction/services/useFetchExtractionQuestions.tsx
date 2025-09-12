// External library
import useSWR from "swr";

// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Utils
import getRequestOptions from "@features/auth/utils/getRequestOptions";

// Types
import type { Questions } from "../types";

interface HttpResponse {
  questions: Questions[];
}

export function useFetchExtractionQuestions() {
  const id = localStorage.getItem("systematicReviewId");

  const { data, isLoading, mutate } = useSWR(
    `systematic-study/${id}/protocol/extraction-question`,
    fetchExtractionQuestion,
    { revalidateOnFocus: false }
  );

  async function fetchExtractionQuestion() {
    try {
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(
        `systematic-study/${id}/protocol/extraction-question`,
        options
      );

      return response.data;
    } catch (error) {
      console.error("error of Extractions Questions", error);
      throw error;
    }
  }

  return {
    questions: data?.questions,
    isLoading,
    mutate,
  };
}
