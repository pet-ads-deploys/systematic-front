import Axios from "../../../../infrastructure/http/axiosClient";

interface CriteriaType {
  criteria: { description: string; type: string };
  url: string;
}

const useSendInclusionCriteria = () => {
  async function sendCriterias({ criteria, url }: CriteriaType) {
    const accessToken = localStorage.getItem("accessToken");
    let options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    let response = await Axios.get(url, options);
    const fetchedCriterias = response.data.content.eligibilityCriteria;

    const updatedCriterias = [...fetchedCriterias, criteria];

    const data = { eligibilityCriteria: updatedCriterias };
    await Axios.put(url, data, options);
  }

  return sendCriterias;
};

export default useSendInclusionCriteria;
