import useSWR from "swr";
import Axios from "../../interceptor/interceptor";
import getRequestOptions from "../../utils/getRequestOptions";

type StudiesFunnelData={
    userId: string,
    systematicStudyId: string,
    totalIdentifiedBySource: {
        [source:string]:number
  
    },
    totalAfterDuplicatesRemovedBySource: {
        [source:string]:number
    },
    totalScreened: number,
    totalExcludedInScreening: number,
    excludedByCriterion: {
        [criteria:string]:number
    },
    totalFullTextAssessed: number,
    totalExcludedInFullText: number,
    totalExcludedByCriterion: {
        [criteria:string]:number
    },
    totalIncluded: 0,

}

export const useFetchStudiesFunnel = () => {

    const id = localStorage.getItem("systematicReviewId");
    const path =`http://localhost:8080/api/v1/systematic-study/${id}/report/studies-funnel`;


    const{data,isLoading,mutate} = useSWR(path,fetchStudiesFunnel,{
        revalidateOnFocus:false
    });

    async function fetchStudiesFunnel(){
        if(!id) return;
        try{
            const response = await Axios.get<StudiesFunnelData>(path,getRequestOptions());
            return  response.data;

        }catch(error){
            console.error("Failed to get studies funnel");

        }   
    }

  return {
    funnelData:data,
    isLoading,
    mutate
  } 
}
