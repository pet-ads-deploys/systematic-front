import { Box } from "@chakra-ui/react";
import ArticleInterface from "../../../../types/ArticleInterface";
import { PageLayout } from "../../../structure/LayoutFactory";
import StudySelectionArea from "../../../structure/StudySelectionArea";

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
