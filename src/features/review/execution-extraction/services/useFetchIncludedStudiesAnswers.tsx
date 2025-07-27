// External library
import useSWR from "swr";

// Service
import Axios from "../../../../infrastructure/http/axiosClient";

// Types
import type { TypeOfQuestions } from "../types";
import getRequestOptions from "@features/auth/utils/getRequestOptions";

type UseIncludedStudiesAnswersProps = {
  articleId: number;
};

export interface QuestionAnswer {
  questionId: string;
  code: string;
  type: TypeOfQuestions;
  description: string;
  answer: string | number | null;
}

export interface HttpResponse {
  includedBy: string[];
  extractionQuestions: QuestionAnswer[];
  robQuestions: QuestionAnswer[];
}

export default function useFetchIncludedStudiesAnswers({
  articleId,
}: UseIncludedStudiesAnswersProps) {
  const id = localStorage.getItem("systematicReviewId");

  const path = `http://localhost:8080/api/v1/systematic-study/${id}/report/${articleId}/included-studies-answers`;

  const { data, isLoading, mutate } = useSWR(path, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  async function fetcher() {
    try {
      if (!id) return;
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(path, options);
      return response.data;
    } catch (error) {
      console.error("Error fetching included studies answers", error);
      throw error;
    }
  }

  return {
    question: data,
    isLoading,
    mutate,
  };
}
