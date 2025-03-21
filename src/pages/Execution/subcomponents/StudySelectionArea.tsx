import { Box, Flex, Text } from "@chakra-ui/react";
import ButtonsForSelection from "./ButtonsForSelection";
import StudyDataFiel from "../../../components/Modals/StudyModal/StudyData";
import { StudyInterface } from "../../../../public/interfaces/IStudy";
import { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import StudySelectionContext from "../../../components/Context/StudiesSelectionContext";
import { PageLayout } from "./LayoutFactory";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { GrSelect } from "react-icons/gr";
import SelectedArticles from "../../../components/Tables/ArticlesTable/SelectedArticles";

interface StudySelectionAreaProps {
  articles: ArticleInterface[] | StudyInterface[];
  page: PageLayout;
}

export default function StudySelectionArea({
  articles,
  page,
}: StudySelectionAreaProps) {
  const context = useContext(AppContext);
  const selectionContext = useContext(StudySelectionContext);
  if (!selectionContext)
    throw new Error("Failed to get selection context on study Selection area");
  const showSelectionModal = context?.showSelectionModal;
  const setSelectionStudies = context?.setSelectionStudies;
  const studyIndex = context?.selectionStudyIndex;

  const verifySelectedArticles =
    selectionContext &&
    selectionContext.selectedArticles &&
    Object.entries(selectionContext.selectedArticles).length > 1;


  if (setSelectionStudies && articles)
    setSelectionStudies(articles as StudyInterface[]);

  if (!showSelectionModal || studyIndex === null)
    return (
      <Flex
        direction="column"
        bg="white"
        borderRadius="1rem"
        w="100%"
        h="100%"
        mb="20px"
        p="6"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      >
        <GrSelect size="3.5rem" color="#263C56" />
        <Text
          color="#263C56"
          fontSize="lg"
          mt="4"
          textAlign="center"
          fontWeight="bold"
        >
          Select a study from the list to see a preview of its article.
        </Text>
      </Flex>
    );
  
  console.log("artigos depois de limpo", selectionContext.selectedArticles);

  return (
    <Flex
      direction="column"
      borderRadius="1rem"
      bg="white"
      w="100%"
      h={page.type === "Extraction" ? "80%" : "100%"}
      p="5"
      alignItems={"center"}
      gap="1rem"
    >
      {verifySelectedArticles ? (
        <SelectedArticles articles={selectionContext.selectedArticles} />
      ) : (
        <>
          <Flex justifyContent="center" w="100%">
            <ButtonsForSelection page={page} />
          </Flex>
          <Box w={"100%"} h="80%">
            {articles && typeof studyIndex === "number" ? (
              <StudyDataFiel
                studyData={articles?.[studyIndex] as StudyInterface}
                page={page}
              />
            ) : null}
          </Box>
        </>
      )}
    </Flex>
  );
}
