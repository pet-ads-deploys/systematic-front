import useSWR from "swr";
import axios from "../interceptor/interceptor";

interface HttpResponse {
  studyReviews: ArticleInterface[];
}

import ArticleInterface from "../types/ArticleInterface";

import getRequestOptions from "../utils/getRequestOptions";

const useGetSessionStudies = (sessionId: string) => {
  const reviewId = localStorage.getItem("systematicReviewId");
  const path = `http://localhost:8080/api/v1/systematic-study/${reviewId}/find-by-search-session/${sessionId}`;
  const options = getRequestOptions();

  const { data, error, isLoading } = useSWR(path, fetchArticlesSession, {
    revalidateOnFocus: true,
  });

  async function fetchArticlesSession() {
    try {
      const response = await axios.get<HttpResponse>(path, options);
      return response.data.studyReviews;
    } catch (error) {
      console.error("Error fetching articles", error);
      throw error;
    }
  }

  return { articles: data || [], isLoading, error };
};

export default useGetSessionStudies;
