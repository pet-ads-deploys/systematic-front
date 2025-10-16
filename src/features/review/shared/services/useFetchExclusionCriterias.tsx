import { useState, useEffect } from "react";
import Axios from "../../../../infrastructure/http/axiosClient";

const useFetchExclusionCriteria = () => {
  const [exclusionCriterias, setInclusionCriterias] = useState<string[]>([]);
  const id = localStorage.getItem("systematicReviewId");
  const path = `systematic-study/${id}/protocol`;

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await Axios.get(path);
        const eligibilityCriteria =
          response.data.content.eligibilityCriteria || [];
        const inclusion = eligibilityCriteria.filter(
          (e: { definition: string; type: string }) => e.type === "EXCLUSION"
        );
        setInclusionCriterias(
          inclusion.map((e: { description: string }) => e.description)
        );
      } catch (error) {
        console.error("Failed to fetch exclusion Criteria:", error);
      }
    };

    fetchCriteria();
  }, []);

  return exclusionCriterias;
};

export default useFetchExclusionCriteria;
