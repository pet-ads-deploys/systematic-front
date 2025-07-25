import axios from "../../../../interceptor/interceptor";

const useCreateProtocolTwo = async (analysis: string, id: string) => {
  const data = {
    analysisAndSynthesisProcess: analysis,
  };

  console.log(data);

  const url = `http://localhost:8080/systematic-study/${id}/protocol`;

  try {
    const accessToken = localStorage.getItem("accessToken");
    let options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    let response = await axios.put(url, data, options);
    console.log(response);

    response = await axios.get(url, options);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default useCreateProtocolTwo;
