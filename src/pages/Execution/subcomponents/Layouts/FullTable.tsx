import { Box } from "@chakra-ui/react";
import ArticleInterface from "../../../../../public/interfaces/ArticleInterface";
import ArticlesTable from "../../../../components/Tables/ArticlesTable/ArticlesTable";

interface TableProps {
  articles: ArticleInterface[];
}

export const FullTable: React.FC<TableProps> = ({ articles }) => {
  return (
    <Box w="100%" maxH="100%">
      <ArticlesTable articles={articles} />
    </Box>
  );
};
