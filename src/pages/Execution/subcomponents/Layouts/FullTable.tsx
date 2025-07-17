import { Box } from "@chakra-ui/react";
import ArticleInterface from "../../../../types/ArticleInterface";
import ArticlesTable from "../../../../components/Tables/ArticlesTable/ArticlesTable";
import { PageLayout } from "../LayoutFactory";

interface TableProps {
  articles: ArticleInterface[];
  page: PageLayout;
}

export const FullTable: React.FC<TableProps> = ({ articles, page }) => {
  return (
    <Box w="100%" h="100%">
      <ArticlesTable articles={articles} page={page} />
    </Box>
  );
};
