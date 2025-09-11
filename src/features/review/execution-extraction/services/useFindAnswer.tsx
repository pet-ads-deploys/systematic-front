// External library
import useSWR from "swr";

// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Utils
import getRequestOptions from "@features/auth/utils/getRequestOptions";

//Types
interface FindAnswerResponse {
  linksFactory: object;
  responseEntity: object;
  isDone: boolean;
}

type UseFindAnswerProps = {
  questionId: string;
};

export default function useFindAnswer({ questionId }: UseFindAnswerProps) {
  const requestOptions = getRequestOptions();
  const reviewId = localStorage.getItem("systematicReviewId");

  const fetchUrl = `systematic-study/${reviewId}/report/find-answer/${questionId}`;

  const fetchAnswer = async (): Promise<FindAnswerResponse> => {
    try {
      const response = await Axios.get<FindAnswerResponse>(
        fetchUrl,
        requestOptions
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch answer for question:", error);
      throw error;
    }
  };

  const {
    data: answerData,
    isLoading,
    mutate,
  } = useSWR(fetchUrl, fetchAnswer, {
    revalidateOnFocus: false,
  });

  return {
    answer: answerData,
    isLoading,
    mutate,
  };
}
