// External library
import { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";

// Components
import ButtonsForSelection from "./ButtonsForSelection";
import StudyDataFiel from "../../../components/Modals/StudyModal/StudyData";

// Context
import AppContext from "../../../components/Context/AppContext";
import StudySelectionContext from "../../../components/Context/StudiesSelectionContext";

// Types
import type { StudyInterface } from "../../../../public/interfaces/IStudy";
import type { PageLayout } from "./LayoutFactory";
import type ArticleInterface from "../../../../public/interfaces/ArticleInterface";

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
  // const showSelectionModal = context?.showSelectionModal;
  const setSelectionStudies = context?.setSelectionStudies;
  const studyIndex = context?.selectionStudyIndex;

  if (setSelectionStudies && articles)
    setSelectionStudies(articles as StudyInterface[]);

  if (!articles || articles.length === 0) return null;

  const selectedIndex = typeof studyIndex === "number" ? studyIndex : 0;

  return (
    <Flex
      direction="column"
      borderRadius="1rem"
      bg="white"
      w="100%"
      h="100%"
      p="2"
      alignItems="center"
      gap="1rem"
    >
      <Flex alignItems="center" justifyContent="center" w="100%" maxW="100%">
        <ButtonsForSelection page={page} />
      </Flex>
      <Box w="100%" h="80%">
        <StudyDataFiel
          studyData={articles?.[selectedIndex] as StudyInterface}
          page={page}
        />
      </Box>
    </Flex>
  );
}
