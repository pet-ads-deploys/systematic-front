import { useEffect, useState } from "react";
import { cardDataProps, useFetchRevisionCard } from "./useFetchRevisionCard";

const useGetReviewCard = () => {
  const [myRevisionsUrl, setMyRevisionsUrl] = useState("");
  const [cardData, setCardData] = useState<cardDataProps[] | undefined>(
    undefined
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    localStorage.removeItem("systematicReviewId");
    const url = localStorage.getItem("myReviewsLink");

    if (url) {
      setMyRevisionsUrl(url);
    }
  }, []);

  const rawData = useFetchRevisionCard(myRevisionsUrl);

  useEffect(() => {
    async function fetch() {
      const newCardData = await Promise.all(
        rawData.map(async (study) => {
          return { ...study };
        })
      );

      setCardData(newCardData);
      if (cardData) setIsLoaded(true);
    }

    fetch();
  }, [rawData]);

  return { cardData, isLoaded };
};

export default useGetReviewCard;
