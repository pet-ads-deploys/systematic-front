import axios from "../../../../service/api/Axios";

export default async function fetchProtocol(systematicStudyId: string) {
  const url = "http://localhost:8080/";
  try {
    const accessToken = localStorage.getItem("accessToken");
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const response = await axios.get(
      `${url}systematic-study/${systematicStudyId}/protocol`,
      options
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching protocol:", error);
    throw error;
  }
}
