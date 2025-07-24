import { KeyedMutator } from "swr";
import axios from "../../interceptor/interceptor";
import getRequestOptions from "@features/auth/utils/getRequestOptions";

interface DeleteSessionProps {
  sessionId: string;
  mutate: KeyedMutator<
    {
      id: string;
      systematicStudyd: string;
      userId: string;
      searchString: string;
      additionalInfo: string;
      timestamp: string;
      source: string;
      numberOfRelatedStudies: number;
    }[]
  >;
}

export default async function UseDeleteSession({
  sessionId,
  mutate,
}: DeleteSessionProps) {
  const id = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();
  const url = `http://localhost:8080/api/v1/systematic-study/${id}/search-session/${sessionId}`;

  const response = await axios.delete(url, options);
  mutate();
  return response;
}
