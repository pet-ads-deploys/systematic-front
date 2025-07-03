import { useContext, useMemo, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import useInputState from "../../../hooks/useInputState";

import Header from "../../../components/ui/Header/Header";
import FlexLayout from "../../../components/ui/Flex/Flex";
import InputText from "../../../components/Inputs/InputText";
import SelectInput from "../../../components/Inputs/SelectInput";
import LayoutFactory from "../subcomponents/LayoutFactory";

import StudySelectionContext from "../../../components/Context/StudiesSelectionContext";

import { useHandleAndFilter } from "../../../utils/handleSearchAndFilter";

import { inputconteiner } from "../styles/executionStyles";

import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { PageLayout } from "../subcomponents/LayoutFactory";
import ButtonsForMultipleSelection from "../subcomponents/ButtonsForMultipleSelection";
import useLayoutPage from "../../../hooks/useLayoutPage";
import SelectLayout from "../subcomponents/LayoutButtons";

export default function Selection() {
  const { value: selectedStatus, handleChange: handleSelectChange } =
    useInputState<string | null>(null);

  const [searchString, setSearchString] = useState<string>("");
  const { layout, handleChangeLayout } = useLayoutPage();
  const page: PageLayout = "Selection";

  const selectionContext = useContext(StudySelectionContext);

  if (!selectionContext) throw new Error("Failed to get the selection context");
  const articles: ArticleInterface[] = useMemo(() => {
    return selectionContext.articles.filter(
      (art): art is ArticleInterface => "studyReviewId" in art
    );
  }, [selectionContext.articles]);

  const filteredArticles = useHandleAndFilter(
    searchString,
    selectedStatus,
    articles,
    page
  );

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
            <Header text="Selection" />
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
              {layout !== "article" ? <ButtonsForMultipleSelection /> : null}
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
              page="Selection"
              layout={layout}
              articles={filteredArticles}
              isLoading={selectionContext.isLoading}
            />
          </Box>
        </Box>
      </Box>
    </FlexLayout>
  );
}
