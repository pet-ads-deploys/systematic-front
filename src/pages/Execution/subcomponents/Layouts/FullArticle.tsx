import { Box } from "@chakra-ui/react";
import ArticleInterface from "../../../../types/ArticleInterface";
import { PageLayout } from "../LayoutFactory";
import StudySelectionArea from "../StudySelectionArea";

interface TableProps {
  articles: ArticleInterface[];
  page: PageLayout;
}

export const FullArticle: React.FC<TableProps> = ({ articles, page }) => {
  return (
    <Box w="100%" h="100%">
      <StudySelectionArea articles={articles} page={page} />
    </Box>
  );
};
