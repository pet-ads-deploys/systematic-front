import { Box } from "@chakra-ui/react";
import ArticleInterface from "../../../../types/ArticleInterface";
import { PageLayout } from "../../../structure/LayoutFactory";
import StudySelectionArea from "../../../structure/StudySelectionArea";
import { SelectionArticles } from "@features/review/execution-selection/services/useFetchSelectionArticles";
import { KeyedMutator } from "swr";

interface TableProps {
  articles: ArticleInterface[];
  page: PageLayout;
  reloadArticles: KeyedMutator<SelectionArticles>;
}

export const FullArticle: React.FC<TableProps> = ({
  articles,
  page,
  reloadArticles,
}) => {
  return (
    <Box w="100%" h="calc(100% - 1rem)">
      <StudySelectionArea
        articles={articles}
        page={page}
        reloadArticles={reloadArticles}
      />
    </Box>
  );
};
