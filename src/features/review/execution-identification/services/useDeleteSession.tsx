import { KeyedMutator } from "swr";
import Axios from "../../../../infrastructure/http/axiosClient";

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
  const url = `systematic-study/${id}/search-session/${sessionId}`;

  const response = await Axios.delete(url);
  mutate();
  return response;
}
