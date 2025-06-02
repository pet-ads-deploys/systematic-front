//import useFetchAllStudies from "./fetch/useFetchAllStudies";
import useFetchProtocol from "./fetch/useFetchProtocol";
import {Protocol} from "../../public/interfaces/protocolInterface";
//import {StudyReview} from "../../public/interfaces/studyReviewInterface";


function isProtocolPartOneFinished(response:  Protocol) {
    return response.goal !== null && response.justification !== null
}
    
function isPicocInitialized(response: Protocol){
    return (response.picoc.control && response.picoc.control.trim() !== "") ||
           (response.picoc.intervention && response.picoc.intervention.trim() !== "") ||
           (response.picoc.outcome && response.picoc.outcome.trim() !== "") ||
           (response.picoc.population && response.picoc.population.trim() !== ""); 
}

function isPicocFinished(response: Protocol){
    return response.picoc.control !== null && response.picoc.intervention !== null
    && response.picoc.outcome !== null && response.picoc.population !== null; 
}

function isProtocolPartTwoFinished(response:  Protocol) {
    return response.studiesLanguages !== null &&
        response.eligibilityCriteria !== null &&
        response.informationSources !== null &&
        response.keywords !== null &&
        response.sourcesSelectionCriteria !== null &&
        response.searchMethod !== null &&
        response.selectionProcess !== null 
    }

function isProtocolPartThreeFinished(response:  Protocol) {
    return response.researchQuestions !== null &&
           response.analysisAndSynthesisProcess !== null
    }

//function isSelectionProcessFinished(response:  StudyReview[]) { 
//    return false;
//}

//function isExtractionProcessFinished(response:  StudyReview[]) { 
//    return false;
//}





export default async function verifyUnfinishedStudy(revisionId: string) {
    const protocolData = await useFetchProtocol(revisionId);
    //const studiesData = await useFetchAllStudies(revisionId);

    
    if(!isProtocolPartOneFinished(protocolData)) {
        return "Protocol part 1";
      }

      else if(isPicocInitialized(protocolData) && !isPicocFinished(protocolData)){
        return 'Picoc';
      }

      else if (!isProtocolPartTwoFinished(protocolData)) {
                  return "Protocol part 2";
                }
                
      else if (!isProtocolPartThreeFinished(protocolData)) {
        return "Protocol part 3";
      }

      else return 'Extraction';
        
    //   else if(!isSelectionProcessFinished(studiesData)) {
    //     window.location.href = ` http://localhost:5173/#/newReview/selection`;
    //   }
    //   else if (!isExtractionProcessFinished(studiesData)) window.location.href = ` http://localhost:5173/#/newReview/extraction`;
    //   else window.location.href = ` http://localhost:5173/#/newReview/finalization`;
}