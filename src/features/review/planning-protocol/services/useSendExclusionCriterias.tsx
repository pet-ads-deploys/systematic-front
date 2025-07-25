import axios from "../../../../interceptor/interceptor";

interface CriteriaType {
  criteria: { description: string; type: string };
  url: string;
}

const useSendExclusionCriteria = () => {
  async function sendExclusionCriterias({ criteria, url }: CriteriaType) {
    const accessToken = localStorage.getItem("accessToken");
    let options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    let response = await axios.get(url, options);
    const fetchedCriterias = response.data.content.eligibilityCriteria;

    const updatedCriterias = [...fetchedCriterias, criteria];

    const data = { eligibilityCriteria: updatedCriterias };
    await axios.put(url, data, options);
  }

  return sendExclusionCriterias;
};

export default useSendExclusionCriteria;
