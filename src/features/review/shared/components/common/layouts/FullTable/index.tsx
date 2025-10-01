// External library
import { Box } from "@chakra-ui/react";

// Components
import ArticlesTable from "../../tables/ArticlesTable";

// Hooks
import { ColumnVisibility } from "@features/review/shared/hooks/useVisibilityColumns";

// Types
import type ArticleInterface from "../../../../types/ArticleInterface";
interface TableProps {
  articles: ArticleInterface[];
  columnsVisible: ColumnVisibility;
  onRowClick?: (article: ArticleInterface) => void;
}

export const FullTable: React.FC<TableProps> = ({
  articles,
  columnsVisible,
  onRowClick,
}) => {
  return (
    <Box w="100%" h="100%">
      <ArticlesTable
        articles={articles}
        columnsVisible={columnsVisible}
        onRowClick={onRowClick}
      />
    </Box>
  );
};
