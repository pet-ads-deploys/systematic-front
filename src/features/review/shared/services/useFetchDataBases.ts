import { useEffect, useState } from "react";
import Axios from "../../../../infrastructure/http/axiosClient";

const useFetchDataBases = () => {
  const [databases, setdatabase] = useState<string[]>([]);
  const id = localStorage.getItem("systematicReviewId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Axios.get(`systematic-study/${id}/protocol`, {
          withCredentials: true,
        });
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
