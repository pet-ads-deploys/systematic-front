import useSWR from "swr";
import Axios from "../../../interceptor/interceptor";
import getRequestOptions from "../../../utils/getRequestOptions";

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

  const fetchUrl = `http://localhost:8080/api/v1/systematic-study/${reviewId}/report/find-answer/${questionId}`;

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
