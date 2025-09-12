import Axios from "../../../../infrastructure/http/axiosClient";

const useSystematicStudyInfo = async (id: string) => {
  try {
    const url = `systematic-study/${id}`;
    const token = localStorage.getItem("accessToken");

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let response = await Axios.get(url, options);
    console.log(response);
    return response.data.content;
  } catch (err) {
    console.log(err);
  }
};

export default useSystematicStudyInfo;
