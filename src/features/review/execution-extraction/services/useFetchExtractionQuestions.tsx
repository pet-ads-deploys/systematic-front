import useSWR from "swr";
import Axios from "../../../../infrastructure/http/axiosClient";
import getRequestOptions from "@features/auth/utils/getRequestOptions";
import { Questions } from "../types";

interface HttpResponse {
  questions: Questions[];
}

export function useFetchExtractionQuestions() {
  const id = localStorage.getItem("systematicReviewId");

  const { data, isLoading, mutate } = useSWR(
    `http://localhost:8080/api/v1/systematic-study/${id}/protocol/extraction-question`,
    fetchExtractionQuestion,
    { revalidateOnFocus: false }
  );

  async function fetchExtractionQuestion() {
    try {
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(
        `http://localhost:8080/api/v1/systematic-study/${id}/protocol/extraction-question`,
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
