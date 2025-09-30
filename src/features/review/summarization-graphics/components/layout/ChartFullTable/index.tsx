// External library
import { Box } from "@chakra-ui/react";


// Types

import ChartTable from "../../tables/ChartTable";
import ArticleInterface from "@features/review/shared/types/ArticleInterface";

interface TableProps {
  articles:  ArticleInterface [];
}

export const ChartFullTable: React.FC<TableProps> = ({
  articles,
}) => {
  return (
    <Box w="100%" h="100%">
      <ChartTable articles={articles}  />
    </Box>
  );
};
