import { Box, Flex } from "@chakra-ui/react";
import { LayoutModel } from "../Selection";
import ArticleInterface from "../../../../../public/interfaces/ArticleInterface";
import StudySelectionArea from "./StudySelectionArea";
import ArticlesTable from "../../../../components/Tables/ArticlesTable/ArticlesTable";
import ExtractionForm from "../../Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";

export interface PageLayout {
  type: "Selection" | "Extraction";
}

interface LayoutFactoryProps {
  layout: LayoutModel;
  articles: ArticleInterface[];
  filteredArticles: ArticleInterface[];
  page: PageLayout;
}

export default function LayoutFactory({
  layout,
  articles,
  filteredArticles,
  page,
}: LayoutFactoryProps) {
  switch (layout.orientation) {
    case "horizontal":
      return (
        <Flex w="100%" h="100%" gap="1.5rem">
          <Box w="50%" h="100%">
            <ArticlesTable
              articles={
                filteredArticles.length > 0 ? filteredArticles : articles
              }
            />
          </Box>
          <Box
            overflowY={page.type === "Extraction" ? "auto" : "unset"}
            w="100%"
            h="100%"
          >
            <StudySelectionArea type={page.type} />
            {page.type === "Extraction" && <ExtractionForm />}
          </Box>
        </Flex>
      );

    case "vertical":
      return (
        <Flex flexDirection="column" w="100%" h="100%" gap="2rem">
          <Box w="100%" h="50%">
            <ArticlesTable
              articles={
                filteredArticles.length > 0 ? filteredArticles : articles
              }
            />
          </Box>
          <Box
            overflowY={page.type === "Extraction" ? "auto" : "unset"}
            w="100%"
            h="50%"
          >
            <StudySelectionArea type={page.type} />
            {page.type === "Extraction" && <ExtractionForm />}
          </Box>
        </Flex>
      );
    default:
      return (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            overflowY={page.type === "Extraction" ? "auto" : "unset"}
            w="100%"
          >
            <StudySelectionArea type={page.type} />
            {page.type === "Extraction" && <ExtractionForm />}
          </Box>
          <Box>
            <ArticlesTable
              articles={
                filteredArticles.length > 0 ? filteredArticles : articles
              }
            />
          </Box>
        </Flex>
      );
  }
}
