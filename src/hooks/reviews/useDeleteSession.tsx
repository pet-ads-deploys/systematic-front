import axios from "../../interceptor/interceptor"

const UseDeleteSession = async (sessionId: string) => {
    const token = localStorage.getItem("accessToken");
    const options = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const id = localStorage.getItem('systematicReviewId');
    const url = `http://localhost:8080/api/v1/systematic-study/${id}/search-session/${sessionId}`;

    return await axios.delete(url, options);
}

export default UseDeleteSession;