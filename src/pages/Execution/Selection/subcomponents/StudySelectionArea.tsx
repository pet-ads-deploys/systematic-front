import { Box, Flex, Text } from "@chakra-ui/react";
import ButtonsForSelection from "./ButtonsForSelection";
import StudyDataFiel from "../../../../components/Modals/StudyModal/StudyData";
import { StudyInterface } from "../../../../../public/interfaces/IStudy";
import { useContext, useEffect } from "react";
import AppContext from "../../../../components/Context/AppContext";
import useGetAllReviewArticles from "../../../../hooks/useGetAllReviewArticles";
import StudySelectionContext, { StudySelectionProvider } from "../../../../components/Context/StudiesSelectionContext";
import { PageLayout } from "./LayoutFactory";

export default function StudySelectionArea({type}:PageLayout) {
  const context = useContext(AppContext);
  const selectionContext = useContext(StudySelectionContext);
  if(!selectionContext) throw new Error("Failed to get selection context on study Selection area");
  const reload = selectionContext.reload;
  const studyData = useGetAllReviewArticles();
  const showSelectionModal = context?.showSelectionModal;
  const setSelectionStudies = context?.setSelectionStudies;
  const studyIndex = context?.selectionStudyIndex;

  useEffect(() => {
    console.log(studyIndex);
  }, [studyIndex])

  if(setSelectionStudies && studyData?.articles) setSelectionStudies(studyData?.articles as StudyInterface[]);

  if (!showSelectionModal || !studyIndex) return (
    <Flex direction="column" bg="gray.600" borderRadius='1rem' w="100%" mb='20px' p="5" alignItems="center">
      <Text color="white">Click on a study on the table</Text>
    </Flex>
  );
  
  return (
    <StudySelectionProvider>
      <Flex direction="column" borderRadius='1rem' bg="white" mb='20px' w="100%" h="100%" p="5" alignItems={"center"}>
        <Flex justifyContent="center" w="100%">
        <ButtonsForSelection />
        </Flex>
        <Box w={"100%"} h="100%">
          <StudyDataFiel studyData={(studyData?.articles?.[studyIndex] as StudyInterface)} page={{type}} />
        </Box>
      </Flex>
    </StudySelectionProvider>
  );
}
