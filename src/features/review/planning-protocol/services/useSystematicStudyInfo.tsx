import axios from "../../../../service/api/Axios";

const useSystematicStudyInfo = async (id: string) => {
  try {
    const url = `http://localhost:8080/api/v1/systematic-study/${id}`;
    const token = localStorage.getItem("accessToken");

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await axios.get(url, options);
    console.log(response);
    return response.data.content;
  } catch (err) {
    console.log(err);
  }
};

export default useSystematicStudyInfo;
