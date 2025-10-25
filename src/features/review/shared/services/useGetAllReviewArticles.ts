// import { useEffect, useState } from 'react';
import ArticleInterface from "../types/ArticleInterface";
import Axios from "../../../../infrastructure/http/axiosClient";

import useSWR from "swr";
import { StudyInterface } from "../types/IStudy";

interface HttpResponse {
  studyReviews: ArticleInterface[] | StudyInterface[];
}

const useGetAllReviewArticles = () => {
  const id = localStorage.getItem("systematicReviewId");
  const { data, mutate, error, isLoading } = useSWR(
    `systematic-study/${id}/study-review`,
    fetchAllArticlesReview,
    {
      fallbackData: [],
      revalidateOnFocus: true,
      revalidateOnMount: true,
      dedupingInterval: 5000,
      refreshInterval: 30000,
    }
  );

  async function fetchAllArticlesReview() {
    try {
      const response = await Axios.get<HttpResponse>(
        `systematic-study/${id}/study-review`
      );
      return response.data.studyReviews || [];
    } catch (error) {
      console.error("Error fetching articles", error);
      throw error;
    }
  }

  return { articles: data || [], mutate, error, isLoading };
};

export default useGetAllReviewArticles;
