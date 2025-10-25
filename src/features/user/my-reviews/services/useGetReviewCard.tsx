// External library
import useSWR from "swr";

// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Hooks
import { useAuthStore } from "@features/auth/store/useAuthStore";

// Types
import type { CardReview } from "../types";

interface HttpResponse {
  content: CardReview[];
}

export default function useGetReviewCard() {
  localStorage.removeItem("systematicReviewId");

  const { user, isLoading: authLoading } = useAuthStore();

  const userId = user?.id ?? null;

  const path =
    !authLoading && userId ? `systematic-study/owner/${userId}` : null;

  const fetchAllCardReview = async () => {
    if (!path) return;
    try {
      const response = await Axios.get<HttpResponse>(path);
      return response.data.content || [];
    } catch (error) {
      console.log("Error", error);
    }
  };

  const { data, isLoading, error, mutate } = useSWR(path, fetchAllCardReview, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  return {
    cardData: data,
    isLoaded: !isLoading,
    error: error,
    mutate,
  };
}
