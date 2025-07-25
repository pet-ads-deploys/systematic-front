import { useContext, useMemo, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import useInputState from "@features/review/shared/hooks/useInputState";

import Header from "../../../components/structure/Header/Header";
import FlexLayout from "../../../components/structure/Flex/Flex";
import InputText from "../../../components/Inputs/InputText";
import SelectInput from "../../../components/Inputs/SelectInput";
import LayoutFactory from "../../../features/review/shared/components/structure/LayoutFactory";

import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

import { inputconteiner } from "../styles/executionStyles";

import ArticleInterface from "../../../features/review/shared/types/ArticleInterface";
import { PageLayout } from "../../../features/review/shared/components/structure/LayoutFactory";
import ButtonsForMultipleSelection from "../../../features/review/shared/components/common/buttons/ButtonsForMultipleSelection";
import useLayoutPage from "../../../features/review/shared/hooks/useLayoutPage";
import SelectLayout from "../../../features/review/shared/components/structure/LayoutButton";
import { useFilterReviewArticles } from "../../../features/review/shared/hooks/useFilterReviewArticles";

export default function Extraction() {
  const { value: selectedStatus, handleChange: handleSelectChange } =
    useInputState<string | null>(null);
  const [searchString, setSearchString] = useState<string>("");

  const [showSelected, setShowSelected] = useState<boolean>(false);

  const selectionContext = useContext(StudySelectionContext);

  if (!selectionContext) throw new Error("Failed to get the selection context");

  const allArticles: ArticleInterface[] = useMemo(() => {
    return selectionContext.articles
      .filter((art): art is ArticleInterface => "studyReviewId" in art)
      .filter((art) => art.selectionStatus === "INCLUDED");
  }, [selectionContext.articles]);

  const { layout, handleChangeLayout } = useLayoutPage();

  const page: PageLayout = "Extraction";

  const startFilteredArticles = useFilterReviewArticles(
    searchString,
    selectedStatus,
    allArticles,
    page
  );

  const finalFilteredArticles = useMemo(() => {
    if (
      showSelected &&
      Object.keys(selectionContext.selectedArticles).length > 0
    ) {
      const selectedIds = Object.keys(selectionContext.selectedArticles).map(
        Number
      );
      return startFilteredArticles.filter((article) =>
        selectedIds.includes(article.studyReviewId)
      );
    }
    return startFilteredArticles;
  }, [showSelected, startFilteredArticles, selectionContext.selectedArticles]);

  return (
    <FlexLayout defaultOpen={1} navigationType="Accordion">
      <Box w="98%" m="1rem" h="fit-content">
        <Box
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex
            w="100%"
            h="2.5rem"
            justifyContent="space-between"
            alignItems="center"
            mb="2rem"
          >
            <Header text="Extraction" />
            <SelectLayout handleChangeLayout={handleChangeLayout} />
          </Flex>
          <Box sx={inputconteiner}>
            <Flex gap="1rem" w="35%" justifyContent="space-between">
              <InputText
                type="search"
                placeholder="Insert article atribute"
                nome="search"
                onChange={(e) => setSearchString(e.target.value)}
                value={searchString}
              />
              {layout !== "article" ? (
                <ButtonsForMultipleSelection
                  onShowSelectedArticles={setShowSelected}
                  isShown={showSelected}
                />
              ) : null}
            </Flex>
            <Box
              display="flex"
              gap="1rem"
              justifyContent="space-between"
              alignItems="center"
            >
              <SelectInput
                names={["INCLUDED", "DUPLICATED", "EXCLUDED", "UNCLASSIFIED"]}
                values={["INCLUDED", "DUPLICATED", "EXCLUDED", "UNCLASSIFIED"]}
                onSelect={(value) => handleSelectChange(value)}
                selectedValue={selectedStatus}
                page={"selection"}
                placeholder="Selection status"
              />
            </Box>
          </Box>
          <Box w="100%" h="82.5vh">
            <LayoutFactory
              page="Extraction"
              layout={layout}
              articles={finalFilteredArticles}
              isLoading={selectionContext.isLoading}
            />
          </Box>
        </Box>
      </Box>
    </FlexLayout>
  );
}
