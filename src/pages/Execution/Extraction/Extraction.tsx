// External libraries
import { useContext, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

// Hooks
import useInputState from "../../../hooks/useInputState";

// Components
import FlexLayout from "../../../components/ui/Flex/Flex";
import Header from "../../../components/ui/Header/Header";
import InputText from "../../../components/Inputs/InputText";
import SelectInput from "../../../components/Inputs/SelectInput";
import ButtonsLayout from "../Selection/subcomponents/LayoutButtons";
import LayoutFactory from "../Selection/subcomponents/LayoutFactory";

// Contexts
import { AppProvider } from "../../../components/Context/AppContext";
import StudySelectionContext, {
  StudySelectionProvider,
} from "../../../components/Context/StudiesSelectionContext";

// Utilities
import { handleSearchAndFilter } from "../../../utils/handleSearchAndFilter";

// Styles
import { inputconteiner } from "../styles/executionStyles";

// Types
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { LayoutModel } from "../Selection/Selection";
import { PageLayout } from "../Selection/subcomponents/LayoutFactory";

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
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const selectionContext = useContext(StudySelectionContext);
  const [layout, setLayout] = useState<LayoutModel>({
    orientation: "vertical",
  });

  if (!selectionContext) throw new Error("Failed to get the selection context");
  const articles: ArticleInterface[] = selectionContext.articles
    .filter(
      (art): art is ArticleInterface =>
        "studyReviewId" in art && "selection" in art
    )
    .filter((art) => art.selectionStatus === "INCLUDED");

  const page: PageLayout = { type: "Extraction" };

  const filteredArticles = handleSearchAndFilter(
    searchString,
    selectedStatus,
    selectedColumns,
    articles,
    page
  );

  const handleDefaultLayout = () => setLayout({ orientation: "default" });
  const handleHorizontalLayout = () => setLayout({ orientation: "horizontal" });
  const handleVerticalLayout = () => setLayout({ orientation: "vertical" });

  return (
    <AppProvider>
      <StudySelectionProvider>
        <FlexLayout defaultOpen={1} navigationType="Accordion">
          <Flex
            w="96%"
            h="2.5rem"
            justifyContent="space-between"
            alignItems="center"
            m="1rem 0 2rem 1.5rem"
          >
            <Header text="Extraction" />
            <ButtonsLayout
              layout={layout}
              handleDefaultLayout={handleDefaultLayout}
              handleHorizontalLayout={handleHorizontalLayout}
              handleVerticalLayout={handleVerticalLayout}
            />
          </Flex>
          <Box
            h="fit-content"
            maxH="85vh"
            w="98%"
            // bg="red"
            ml="1.5rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            overflowY="auto"
          >
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
                  names={["INCLUDED", "DUPLICATED", "EXCLUDED", "UNCLASSIFIED"]}
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
                {/* <ComboBox
                    isDisabled={false}
                    text="filter options"
                    options={Object.values(headerData)}
                    onOptionchange={handleComboBoxChange} 
                  /> */}
              </Box>
            </Box>
            <Box w="100%">
              <LayoutFactory
                page={{ type: "Extraction" }}
                layout={layout}
                articles={filteredArticles}
              />
            </Box>
          </Box>
        </FlexLayout>
      </StudySelectionProvider>
    </AppProvider>
  );
}
