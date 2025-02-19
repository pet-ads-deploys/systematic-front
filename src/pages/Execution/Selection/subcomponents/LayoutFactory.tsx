// External libraires
import { Box, Flex } from "@chakra-ui/react";

// Components
import StudySelectionArea from "./StudySelectionArea";
import ArticlesTable from "../../../../components/Tables/ArticlesTable/ArticlesTable";
import ExtractionForm from "../../Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";

// Types
import { LayoutModel } from "../Selection";
import ArticleInterface from "../../../../../public/interfaces/ArticleInterface";

export interface PageLayout {
  type: "Selection" | "Extraction";
}

interface LayoutFactoryProps {
  layout: LayoutModel;
  articles: ArticleInterface[] | [];
  page: PageLayout;
}

export default function LayoutFactory({
  layout,
  articles,
  page,
}: LayoutFactoryProps) {
  switch (layout.orientation) {
    case "horizontal":
      return (
        <Flex w="100%" h="100%" gap="1.5rem">
          <Box w="50%" h="100%">
            <ArticlesTable articles={articles.length > 0 ? articles : []} />
          </Box>
          <Box
            overflowY={page.type === "Extraction" ? "auto" : "unset"}
            w="100%"
            h="100%"
          >
            {articles && articles.length > 0 && (
              <StudySelectionArea
                articles={articles}
                page={{ type: page.type }}
              />
            )}
            {page.type === "Extraction" && <ExtractionForm />}
          </Box>
        </Flex>
      );

    case "vertical":
      return (
        <Flex flexDirection="column" w="100%" h="100%" gap="2rem">
          <Box w="100%" h="50%">
            <ArticlesTable articles={articles.length > 0 ? articles : []} />
          </Box>
          <Box
            overflowY={page.type === "Extraction" ? "auto" : "unset"}
            w="100%"
            h="50%"
          >
            {articles && articles.length > 0 && (
              <StudySelectionArea
                articles={articles}
                page={{ type: page.type }}
              />
            )}
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
          w="100%"
        >
          <Box
            overflowY={page.type === "Extraction" ? "auto" : "unset"}
            w="100%"
          >
            {articles && articles.length > 0 && (
              <StudySelectionArea
                articles={articles}
                page={{ type: page.type }}
              />
            )}
            {page.type === "Extraction" && <ExtractionForm />}
          </Box>
          <Box>
            <ArticlesTable articles={articles.length > 0 ? articles : []} />
          </Box>
        </Flex>
      );
  }
}
