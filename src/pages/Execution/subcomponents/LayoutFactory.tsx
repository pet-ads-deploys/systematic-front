import { Box, Flex } from "@chakra-ui/react";

import StudySelectionArea from "./StudySelectionArea";
import ArticlesTable from "../../../components/Tables/ArticlesTable/ArticlesTable";
import ExtractionForm from "../Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";

// import { TbArticleOff } from "react-icons/tb";

import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import NoDataMessage from "./NoDataMessage";
import { ViewModel } from "../Selection/Selection";

export interface PageLayout {
  type: "Selection" | "Extraction";
}

interface LayoutFactoryProps {
  layout: ViewModel;
  articles: ArticleInterface[] | [];
  page: PageLayout;
}

export default function LayoutFactory({
  layout,
  articles,
  page,
}: LayoutFactoryProps) {
  console.log("layout atual:", layout);

  switch (layout) {
    case "vertical":
      return (
        <Flex flexDirection="column" w="100%" h="98%" gap="2rem">
          {articles && articles.length > 0 ? (
            <Box w="100%" maxH="100%">
              <ArticlesTable articles={articles || []} />
            </Box>
          ) : (
            /* <Box w="100%" maxH="48%">
                {articles && articles.length > 0 && (
                  <StudySelectionArea
                    articles={articles || []}
                    page={{ type: page.type }}
                  />
                )}
                {page.type === "Extraction" && <ExtractionForm />}
              </Box> */
            <NoDataMessage />
          )}
        </Flex>
      );
    case "table":
      return (
        <Flex w="100%" h="100%" gap="2rem">
          {articles && articles.length > 0 ? (
            <>
              <Box maxW="60%" h="100%">
                <ArticlesTable articles={articles || []} />
              </Box>
              <Box minW="38%" h="100%">
                <StudySelectionArea
                  articles={articles || []}
                  page={{ type: page.type }}
                />
                {page.type === "Extraction" && <ExtractionForm />}
              </Box>
            </>
          ) : (
            <NoDataMessage />
          )}
        </Flex>
      );
    case "article":
      return (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
          // gap="2rem"
        >
          {articles && articles.length > 0 ? (
            <Box w="100%" minH="100%">
              <StudySelectionArea
                articles={articles || []}
                page={{ type: page.type }}
              />
              {page.type === "Extraction" && <ExtractionForm />}
            </Box>
          ) : (
            /* <Box maxH="40%" w="100%">
                <ArticlesTable articles={articles || []} />
              </Box> */
            <NoDataMessage />
          )}
        </Flex>
      );
  }
}
