import useSWR from "swr";
import Axios from "../../../../infrastructure/http/axiosClient";

interface HttpResponse {
  studyReviews: ArticleInterface[];
}

import ArticleInterface from "../../shared/types/ArticleInterface";

const useGetSessionStudies = (sessionId: string) => {
  const reviewId = localStorage.getItem("systematicReviewId");
  const path = `systematic-study/${reviewId}/find-by-search-session/${sessionId}`;

  const { data, error, isLoading } = useSWR(path, fetchArticlesSession, {
    revalidateOnFocus: true,
  });

  async function fetchArticlesSession() {
    try {
      const response = await Axios.get<HttpResponse>(path);
      return response.data.studyReviews;
    } catch (error) {
      console.error("Error fetching articles", error);
      throw error;
    }
  }

  return { articles: data || [], isLoading, error };
};

export default useGetSessionStudies;
