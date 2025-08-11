// import { useEffect, useState } from 'react';
import ArticleInterface from "../types/ArticleInterface";
import axios from "../../../../infrastructure/http/axiosClient";

import getRequestOptions from "@features/auth/utils/getRequestOptions";
import useSWR from "swr";
import { StudyInterface } from "../types/IStudy";

interface HttpResponse {
  studyReviews: ArticleInterface[] | StudyInterface[];
}

const useGetAllReviewArticles = () => {
  const id = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();
  const { data, mutate, error, isLoading } = useSWR(
    `http://localhost:8080/api/v1/systematic-study/${id}/study-review`,
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
      const response = await axios.get<HttpResponse>(
        `http://localhost:8080/api/v1/systematic-study/${id}/study-review`,
        options
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
