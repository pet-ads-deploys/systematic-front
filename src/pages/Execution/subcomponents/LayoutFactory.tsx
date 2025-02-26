// External libraires
import { Box, Flex, Text } from "@chakra-ui/react";

// Components
import StudySelectionArea from "./StudySelectionArea";
import ArticlesTable from "../../../components/Tables/ArticlesTable/ArticlesTable";
import ExtractionForm from "../Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";

// Icons
import { TbArticleOff } from "react-icons/tb";

// Types
import { LayoutModel } from "../Selection/Selection";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import NoDataMessage from "./NoDataMessage";
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
        <Flex w="100%" h="100%" gap="2rem">
          {articles && articles.length > 0 ? (
            <>
              <Box w="58%" h="100%">
                <ArticlesTable articles={articles || []} />
              </Box>
              <Box w="40%" h="100%">
                {articles && articles.length > 0 && (
                  <StudySelectionArea
                    articles={articles || []}
                    page={{ type: page.type }}
                  />
                )}
                {page.type === "Extraction" && <ExtractionForm />}
              </Box>
            </>
          ) : (
            <NoDataMessage />
          )}
        </Flex>
      );
    case "vertical":
      return (
        <Flex flexDirection="column" w="100%" h="98%" gap="2rem">
          {articles && articles.length > 0 ? (
            <>
              <Box w="100%" h="50%">
                <ArticlesTable articles={articles || []} />
              </Box>
              <Box w="100%" h="48%">
                {articles && articles.length > 0 && (
                  <StudySelectionArea
                    articles={articles || []}
                    page={{ type: page.type }}
                  />
                )}
                {page.type === "Extraction" && <ExtractionForm />}
              </Box>
            </>
          ) : (
            <NoDataMessage />
          )}
        </Flex>
      );
    default:
      return (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
          gap="2rem"
        >
          {articles && articles.length > 0 ? (
            <>
              <Box w="100%" h="56%">
                {articles && articles.length > 0 && (
                  <StudySelectionArea
                    articles={articles || []}
                    page={{ type: page.type }}
                  />
                )}
                {page.type === "Extraction" && <ExtractionForm />}
              </Box>
              <Box h="40%" w="100%">
                <ArticlesTable articles={articles || []} />
              </Box>
            </>
          ) : (
            <NoDataMessage />
          )}
        </Flex>
      );
  }
}
