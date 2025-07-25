import axios from "../../../../interceptor/interceptor";

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

    let response = await axios.get(url, options);
    const fetchedResearchQuestions = response.data.content.researchQuestions;

    const updatedResearchQuestions = [
      ...fetchedResearchQuestions,
      researchQuestions,
    ];

    const data = { researchQuestions: updatedResearchQuestions };
    await axios.put(url, data, options);
  }

  return sendResearchQuestions;
};

export default useSendResearchQuestions;
