import useSWR from "swr";
import getRequestOptions from "../../utils/getRequestOptions";
import axios from "../../interceptor/interceptor";
import { cardDataProps } from "./useFetchRevisionCard";
import { useEffect, useState } from "react";

interface HttpResponse {
  content: cardDataProps[];
}

export default function useFetchTitleOfStudie() {
  const [myRevisionsUrl, setMyRevisionsUrl] = useState<string | null>(null);
  const id = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();

  useEffect(() => {
    const url = localStorage.getItem("myReviewsLink");

    if (url) {
      setMyRevisionsUrl(url);
    }
  }, []);

  async function fetcherTitle(url: string) {
    if (!url) return null;

    try {
      const response = await axios.get<HttpResponse>(url, options);
      return response.data.content;
    } catch (err) {
      console.error("Error in fetching study data:", err);
      throw err;
    }
  }

  const { data, error, isLoading } = useSWR(
    myRevisionsUrl ? myRevisionsUrl : null,
    fetcherTitle,
    {
      revalidateOnMount: true,
    }
  );

  const filteredTitle =
    data?.find((review) => review.id === id)?.title || "";

  return {
    title: filteredTitle,
    error,
    isLoading,
  };
}
