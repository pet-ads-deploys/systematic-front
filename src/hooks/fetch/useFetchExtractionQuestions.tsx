import Axios from "../../interceptor/interceptor";
import getRequestOptions from "../../utils/getRequestOptions";

async function useFetchExtractionQuestions(){
    try {
        const id = localStorage.getItem("systematicReviewId")
        const options = getRequestOptions()
        const respose = await Axios.get(`http://localhost:8080/api/v1/systematic-study/${id}/protocol/extraction-question`, options)
        console.log("ok", respose.data)
        return respose.data;
    } catch (error) {
        console.error("error of Extractions Questions",error)
        throw error
    }
    
}

export default useFetchExtractionQuestions;