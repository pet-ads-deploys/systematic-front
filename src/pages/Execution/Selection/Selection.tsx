// External libraries
import { useContext, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

// Hooks
import useInputState from "../../../hooks/useInputState";

// Components
import Header from "../../../components/ui/Header/Header";
import FlexLayout from "../../../components/ui/Flex/Flex";
import InputText from "../../../components/Inputs/InputText";
import SelectInput from "../../../components/Inputs/SelectInput";
import LayoutFactory from "./subcomponents/LayoutFactory";
import ButtonsLayout from "./subcomponents/LayoutButtons";

// Contexts
import { AppProvider } from "../../../components/Context/AppContext";
import StudySelectionContext, {
  StudySelectionProvider,
} from "../../../components/Context/StudiesSelectionContext";

// Utilities
import { handleSearchAndFilter } from "../../../utils/handleSearchAndFilter";

// Styles
import { conteiner, inputconteiner } from "../styles/executionStyles";

// Types
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { PageLayout } from "./subcomponents/LayoutFactory";

// Unused imports
// import ComboBox from "../../../components/Inputs/ComboBox";
// import StudySelectionArea from "./subcomponents/StudySelectionArea";
// import DynamicTable from "../../../components/Tables/DynamicTable";
// import useFetchTableData from "../../../hooks/seachAppropriateStudy/useFetchStudyData";
// import { StudyInterface } from "../../../../public/interfaces/IStudy";
// import { TableHeadersInterface } from "../../../../public/interfaces/ITableHeaders";
// import { KeywordInterface } from "../../../../public/interfaces/KeywordInterface";
// import { tableTypeEnum } from "../../../../public/enums/tableTypeEnum";
// import useGetAllReviewArticles from "../../../hooks/useGetAllReviewArticles";
// import ArticlesTable from "../../../components/Tables/ArticlesTable/ArticlesTable";
// import { NoStudiesData } from "../../../components/NotFound/NoStudiesData";

export interface LayoutModel {
  orientation: "default" | "horizontal" | "vertical";
}

export default function Selection() {
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
        "studyReviewId" in art
    );

  const page: PageLayout = { type: "Selection" };

  // Functions
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
            <Header text="Selection" />
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
              </Box>
            </Box>
            <Box w="100%">
              <Box sx={conteiner}>
                <LayoutFactory
                  page={{ type: "Selection" }}
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
