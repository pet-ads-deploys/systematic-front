import Axios from "../../../../infrastructure/http/axiosClient";

interface ResearchQuestionsType {
  researchQuestions: string;
  url: string;
}

const useSendResearchQuestions = () => {
  async function sendResearchQuestions({
    researchQuestions,
    url,
  }: ResearchQuestionsType) {
    const accessToken = localStorage.getItem("accessToken");
    let options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    let response = await Axios.get(url, options);
    const fetchedResearchQuestions = response.data.content.researchQuestions;

    const updatedResearchQuestions = [
      ...fetchedResearchQuestions,
      researchQuestions,
    ];

    const data = { researchQuestions: updatedResearchQuestions };
    await Axios.put(url, data, options);
  }

  return sendResearchQuestions;
};

export default useSendResearchQuestions;
