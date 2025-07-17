// External library
import { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";

// Components
import ButtonsForSelection from "./ButtonsForSelection";
import StudyDataFiel from "../../../components/Modals/StudyModal/StudyData";

// Context
import StudySelectionContext from "../../../context/StudiesSelectionContext";

// Types
import type { PageLayout } from "./LayoutFactory";
import type ArticleInterface from "../../../types/ArticleInterface";
import type { StudyInterface } from "../../../types/IStudy";

interface StudySelectionAreaProps {
  articles: ArticleInterface[] | StudyInterface[];
  page: PageLayout;
}

export default function StudySelectionArea({
  articles,
  page,
}: StudySelectionAreaProps) {
  const selectionContext = useContext(StudySelectionContext);

  if (!selectionContext)
    throw new Error("Failed to get selection context on study Selection area");

  const { selectedArticleReview, setSelectedArticleReview } = selectionContext;

  if (!articles || articles.length === 0) return null;

  const typedArticles = articles.filter(
    (art): art is ArticleInterface => "studyReviewId" in art
  );

  const findSelectedArticle = typedArticles.findIndex(
    (art) => art.studyReviewId === selectedArticleReview
  );

  const studyIndex = findSelectedArticle >= 0 ? findSelectedArticle : 0;

  if (studyIndex == 0) {
    setSelectedArticleReview(typedArticles[studyIndex].studyReviewId);
  }

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
        <ButtonsForSelection
          page={page}
          articles={articles as StudyInterface[]}
          articleIndex={studyIndex}
          setSelectedArticleReview={setSelectedArticleReview}
        />
      </Flex>
      <Box w="100%" h="80%">
        <StudyDataFiel
          studyData={articles?.[studyIndex] as StudyInterface}
          page={page}
        />
      </Box>
    </Flex>
  );
}
