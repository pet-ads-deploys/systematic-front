// External library
import useSWR from "swr";

// Infra
import Axios from "../../../../infrastructure/http/axiosClient";

// Hooks
import { useAuthStore } from "@features/auth/store/useAuthStore";

// Types
import type { CardReview } from "../types";

// Utils
import getRequestOptions from "@features/auth/utils/getRequestOptions";

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
      const options = getRequestOptions();
      const response = await Axios.get<HttpResponse>(path, options);
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
