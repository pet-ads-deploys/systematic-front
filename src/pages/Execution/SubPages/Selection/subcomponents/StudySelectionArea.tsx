import { Box, Flex, Text } from "@chakra-ui/react";
import ButtonsForSelection from "./ButtonsForSelection";
import StudyDataFiel from "../../../../../components/Modals/StudyModal/StudyData";
import { StudyInterface } from "../../../../../../public/interfaces/IStudy";
import { useContext, useEffect } from "react";
import AppContext from "../../../../../components/Context/AppContext";
import useGetAllReviewArticles from "../../../../../hooks/useGetAllReviewArticles";
import { StudySelectionProvider } from "../../../../../components/Context/StudiesSelectionContext";

export default function StudySelectionArea() {
  const context = useContext(AppContext);
  const studyData = useGetAllReviewArticles();
  const showSelectionModal = context?.showSelectionModal;
  const setSelectionStudies = context?.setSelectionStudies;
  const studyIndex = context?.selectionStudyIndex;

  useEffect(() => {
    console.log(studyIndex);
  }, [studyIndex])

  if(setSelectionStudies) setSelectionStudies(studyData as StudyInterface[]);

  if (!showSelectionModal || !studyIndex) return (
    <Flex mt="10" direction="column" bg="gray.600" borderRadius='15px' w="80%" mb='20px' p="5" alignItems="center">
      <Text color="white">Click on a study on the table</Text>
    </Flex>
  );
  
  return (
    <StudySelectionProvider>
      <Flex mt="10" direction="column" borderRadius='15px' bg="gray.600" mb='20px' w="80%" p="5" alignItems={"center"}>
        <ButtonsForSelection />
        
        <Box w={"100%"} bg="gray.200">
          <StudyDataFiel studyData={(studyData[studyIndex] as StudyInterface)} type="Selection" />
        </Box>
      </Flex>
    </StudySelectionProvider>
  );
}
