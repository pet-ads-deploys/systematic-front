import { useEffect, useState } from 'react'
import { cardDataProps, useFetchRevisionCard } from '../fetch/useFetchRevisionCard';
import verifyUnfinishedStudy from '../verifyUnfinishedStudy';

const useGetReviewCard = () => {
    const [myRevisionsUrl, setMyRevisionsUrl] = useState('');
    const [cardData, setCardData] = useState< cardDataProps[] | undefined >(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        localStorage.removeItem("systematicReviewId");
        const url = localStorage.getItem('myReviewsLink');
    
        if (url) {
          setMyRevisionsUrl(url);
        }
    
      }, []);
    
      let rawData = useFetchRevisionCard(myRevisionsUrl);
    
      useEffect(() => {
    
        async function fetch(){
            let newCardData = await Promise.all(rawData.map(async (study) => {
            let status = await verifyUnfinishedStudy(study.id);
        
            return {...study, status};
        }));
    
        setCardData(newCardData);
        if( cardData ) setIsLoaded(true);
    
        }
    
        fetch();
      }, [rawData]);
    
    return { cardData, isLoaded }
}

export default useGetReviewCard