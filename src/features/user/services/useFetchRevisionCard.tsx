import { useState, useEffect } from "react";
import axios from "../../../service/api/Axios";

export interface cardDataProps {
  id: string;
  key: string;
  title: string;
  status?: string;
  collaborators: string[];
  lastChange: string;
  creation: string;
  isEdited: boolean;
}

const useFetchRevisionCard = (url: string) => {
  const [cardData, setCardData] = useState<cardDataProps[] | []>([]);
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let options = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };

        const response = await axios.get(url, options);
        const data = await response.data.content;
        console.log(data);
        setCardData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url]);
  return cardData;
};
export { useFetchRevisionCard };
