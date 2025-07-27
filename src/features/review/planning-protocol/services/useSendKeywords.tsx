import axios from "../../../../service/api/Axios";

interface KeywordType {
  keyword: string;
  url: string;
}

const useSendKeywords = () => {
  async function sendKeywords({ keyword, url }: KeywordType) {
    const accessToken = localStorage.getItem("accessToken");
    let options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    let response = await axios.get(url, options);
    const fetchedKeywords = response.data.content.keywords;

    const updatedKeywords = [...fetchedKeywords, keyword];

    const data = { keywords: updatedKeywords };
    await axios.put(url, data, options);
  }

  return sendKeywords;
};

export default useSendKeywords;
