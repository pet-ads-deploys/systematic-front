import { useEffect, useState } from "react";
import axios from "../../../../interceptor/interceptor";

const useFetchDataBases = () => {
  const [databases, setdatabase] = useState<string[]>([]);
  const id = localStorage.getItem("systematicReviewId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://localhost:8080/systematic-study/${id}/protocol`,
          { withCredentials: true }
        );
        setdatabase(response.data.content.informationSources);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  return { databases };
};
export default useFetchDataBases;
