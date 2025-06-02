// External library
import useSWR from "swr";

// Service
import Axios from "../../interceptor/interceptor";


// Types
import type { TypeOfQuestions } from "../../pages/Execution/Extraction/subcomponents/forms/types";
import getRequestOptions from "../../utils/getRequestOptions";

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
