import { Box } from "@chakra-ui/react";
import ArticleInterface from "../../../../types/ArticleInterface";

import { PageLayout } from "../../../structure/LayoutFactory";
import ArticlesTable from "../../tables/ArticlesTable";

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
