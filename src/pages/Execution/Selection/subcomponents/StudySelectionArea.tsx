import { Box, Flex, Text } from "@chakra-ui/react";
import ButtonsForSelection from "./ButtonsForSelection";
import StudyDataFiel from "../../../../components/Modals/StudyModal/StudyData";
import { StudyInterface } from "../../../../../public/interfaces/IStudy";
import { useContext, useEffect } from "react";
import AppContext from "../../../../components/Context/AppContext";
import useGetAllReviewArticles from "../../../../hooks/useGetAllReviewArticles";
import StudySelectionContext, {
  StudySelectionProvider,
} from "../../../../components/Context/StudiesSelectionContext";
import { PageLayout } from "./LayoutFactory";
import ArticleInterface from "../../../../../public/interfaces/ArticleInterface";

interface StudySelectionAreaProps {
  articles: ArticleInterface[] | StudyInterface[];
  page: PageLayout
}

export default function StudySelectionArea({articles, page }: StudySelectionAreaProps) {
  const context = useContext(AppContext);
  const selectionContext = useContext(StudySelectionContext);
  if (!selectionContext)
    throw new Error("Failed to get selection context on study Selection area");
  const showSelectionModal = context?.showSelectionModal;
  const setSelectionStudies = context?.setSelectionStudies;
  const studyIndex = context?.selectionStudyIndex;

  useEffect(() => {
    console.log(studyIndex);
  }, [studyIndex]);

  if (setSelectionStudies && articles)
    setSelectionStudies(articles as StudyInterface[]);

  if (!showSelectionModal || studyIndex === null)
    return (
      <Flex
        direction="column"
        bg="gray.600"
        borderRadius="1rem"
        w="100%"
        mb="20px"
        p="5"
        alignItems="center"
      >
        <Text color="white">Click on a study on the table</Text>
      </Flex>
    );

  return (
    <StudySelectionProvider>
      <Flex
        direction="column"
        borderRadius="1rem"
        bg="white"
        mb="20px"
        w="100%"
        h={page.type === "Extraction" ? "80%" : "100%"}
        p="5"
        alignItems={"center"}
      >
        <Flex justifyContent="center" w="100%">
          <ButtonsForSelection page={page} />
        </Flex>
        <Box w={"100%"} h="100%">
          {articles && typeof studyIndex === "number" ? (
            <StudyDataFiel
              studyData={articles?.[studyIndex] as StudyInterface}
              page={page}
            />
          ) : null}
        </Box>
      </Flex>
    </StudySelectionProvider>
  );
}
