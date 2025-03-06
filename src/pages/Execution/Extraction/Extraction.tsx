import { useContext, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import useInputState from "../../../hooks/useInputState";

import FlexLayout from "../../../components/ui/Flex/Flex";
import Header from "../../../components/ui/Header/Header";
import InputText from "../../../components/Inputs/InputText";
import SelectInput from "../../../components/Inputs/SelectInput";
import ButtonsLayout from "../subcomponents/LayoutButtons";
import LayoutFactory from "../subcomponents/LayoutFactory";

import { AppProvider } from "../../../components/Context/AppContext";
import StudySelectionContext, {
  StudySelectionProvider,
} from "../../../components/Context/StudiesSelectionContext";

import { handleSearchAndFilter } from "../../../utils/handleSearchAndFilter";

import { inputconteiner } from "../styles/executionStyles";

import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { PageLayout } from "../subcomponents/LayoutFactory";
import { ViewModel } from "../Selection/Selection";

// Unused imports
// import ComboBox from "../../../components/Inputs/ComboBox";
// import DynamicTable from "../../../components/Tables/DynamicTable";
// import useFetchTableData from "../../../hooks/seachAppropriateStudy/useFetchStudyData";
// import { StudyInterface } from "../../../../public/interfaces/IStudy";
// import { TableHeadersInterface } from "../../../../public/interfaces/ITableHeaders";
// import { tableTypeEnum } from "../../../../public/enums/tableTypeEnum";
// import { NoStudiesData } from "../../../components/NotFound/NoStudiesData";
// import ArticlesTable from "../../../components/Tables/ArticlesTable/ArticlesTable";
// import ExtractionForm from "./subcomponents/forms/ExtractionForm/ExtractionForm";
// import StudySelectionArea from "../Selection/subcomponents/StudySelectionArea";
// import StudySelectionArea from "../Selection/subcomponents/StudySelectionArea";

export default function Extraction() {
  const { value: selectedStatus, handleChange: handleSelectChange } =
    useInputState<string | null>(null);
  const [searchString, setSearchString] = useState<string>("");
  const selectionContext = useContext(StudySelectionContext);
  const [layout, setLayout] = useState<ViewModel>("vertical");

  if (!selectionContext) throw new Error("Failed to get the selection context");
  const articles: ArticleInterface[] = selectionContext.articles
    .filter((art): art is ArticleInterface => "studyReviewId" in art)
    .filter((art) => art.selectionStatus === "INCLUDED");

  const page: PageLayout = { type: "Extraction" };

  const filteredArticles = handleSearchAndFilter(
    searchString,
    selectedStatus,
    articles,
    page
  );

  const handleArticleLayoutChange = () => setLayout("article");
  const handleTableLayoutChange = () => setLayout("table");
  const handleVerticalLayoutChange = () => setLayout("vertical");

  return (
    <AppProvider>
      <StudySelectionProvider>
        <FlexLayout defaultOpen={1} navigationType="Accordion">
          <Box w="98%" m="1rem" h="fit-content">
            <Box
              w="100%"
              h="100%"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              // overflowY="auto"
            >
              <Flex
                w="100%"
                h="2.5rem"
                justifyContent="space-between"
                alignItems="center"
                mb="2rem"
              >
                <Header text="Extraction" />
                <ButtonsLayout
                  layout={layout}
                  handleArticleLayoutChange={handleArticleLayoutChange}
                  handleTableLayoutChange={handleTableLayoutChange}
                  handleVerticalLayoutChange={handleVerticalLayoutChange}
                />
              </Flex>
              <Box sx={inputconteiner}>
                <InputText
                  type="search"
                  placeholder="Insert article atribute"
                  nome="search"
                  onChange={(e) => setSearchString(e.target.value)}
                  value={searchString}
                />
                <Box
                  display="flex"
                  gap="1rem"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <SelectInput
                    names={[
                      "INCLUDED",
                      "DUPLICATED",
                      "EXCLUDED",
                      "UNCLASSIFIED",
                    ]}
                    values={[
                      "INCLUDED",
                      "DUPLICATED",
                      "EXCLUDED",
                      "UNCLASSIFIED",
                    ]}
                    onSelect={(value) => handleSelectChange(value)}
                    selectedValue={selectedStatus}
                    page={"selection"}
                    placeholder="Selection status"
                  />
                </Box>
              </Box>
              <Box w="100%" h="85vh">
                <LayoutFactory
                  page={{ type: "Extraction" }}
                  layout={layout}
                  articles={filteredArticles}
                />
              </Box>
            </Box>
          </Box>
        </FlexLayout>
      </StudySelectionProvider>
    </AppProvider>
  );
}
