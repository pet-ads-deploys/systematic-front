import { Box, Button, Flex } from "@chakra-ui/react";
import useInputState from "../../../hooks/useInputState";
import Header from "../../../components/ui/Header/Header";
import FlexLayout from "../../../components/ui/Flex/Flex";
import ComboBox from "../../../components/Inputs/ComboBox";
import InputText from "../../../components/Inputs/InputText";
import SelectInput from "../../../components/Inputs/SelectInput";
import StudySelectionArea from "./subcomponents/StudySelectionArea";
// import DynamicTable from "../../../components/Tables/DynamicTable";
import useFetchTableData from "../../../hooks/seachAppropriateStudy/useFetchStudyData";
import { conteiner, inputconteiner } from "../styles/executionStyles";
import { AppProvider } from "../../../components/Context/AppContext";
import { StudyInterface } from "../../../../public/interfaces/IStudy";
// import { TableHeadersInterface } from "../../../../public/interfaces/ITableHeaders";
import { KeywordInterface } from "../../../../public/interfaces/KeywordInterface";
import { useContext, useState } from "react";
// import { tableTypeEnum } from "../../../../public/enums/tableTypeEnum";
// import useGetAllReviewArticles from "../../../hooks/useGetAllReviewArticles";
import { StudySelectionProvider } from "../../../components/Context/StudiesSelectionContext";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import ArticlesTable from "../../../components/Tables/ArticlesTable/ArticlesTable";
import StudySelectionContext from "../../../components/Context/StudiesSelectionContext";
import { NoStudiesData } from "../../../components/NotFound/NoStudiesData";
import { handleSearchAndFilter } from "../../../utils/handleSearchAndFilter";
import LayoutFactory from "./subcomponents/LayoutFactory";
import ButtonsLayout from "./subcomponents/LayoutButtons";

export interface LayoutModel {
  orientation: "default" | "horizontal" | "vertical";
}

export default function Selection<
  U extends StudyInterface | KeywordInterface
>() {
  const studiesData: U[] | undefined = useFetchTableData(
    "/data/NewStudyData.json"
  );
  //   const headerData: TableHeadersInterface = {
  //     title: "Title",
  //     authors: "Author",
  //     year: "Year",
  //     selectionStatus: "Selection",
  //     extractionStatus: "Extraction",
  //     readingPriority: "Reading Priority"
  // }
  const { value: selectedStatus, handleChange: handleSelectChange } =
    useInputState<string | null>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const selectionContext = useContext(StudySelectionContext);
  const [layout, setLayout] = useState<LayoutModel>({ orientation: "default" });

  if (!selectionContext) throw new Error("Failed to get the selection context");
  let articles: ArticleInterface[] = [];
  articles = selectionContext.articles;

  // articles = studiesData;

  if (!studiesData) return <NoStudiesData />;

  // const handleComboBoxChange = (column: string, isChecked: boolean) => {
  //   setSelectedColumns((prev) => {
  //     if (isChecked && !prev.includes(column)) {
  //       return [...prev, column];
  //     }
  //     if (!isChecked) {
  //       return prev.filter((col) => col !== column);
  //     }
  //     return prev;
  //   });
  // };

  const filteredArticles = handleSearchAndFilter(
    searchString,
    selectedStatus,
    selectedColumns,
    articles
  );

  const handleDefaultLayout = () => setLayout({ orientation: "default" });
  const handleHorizontalLayout = () => setLayout({ orientation: "horizontal" });
  const handleVerticalLayout = () => setLayout({ orientation: "vertical" });

  return (
    <AppProvider>
      <StudySelectionProvider>
        <FlexLayout defaultOpen={1} navigationType="Accordion">
          <Header text="Selection" />
          <ButtonsLayout
            handleDefaultLayout={handleDefaultLayout}
            handleHorizontalLayout={handleHorizontalLayout}
            handleVerticalLayout={handleVerticalLayout}
          />
          {/* <Box overflowY="auto" h="86.5%"> */}
          <Box overflowY="auto" h="86.5%" w="98%" bg="red">
            <Box w="100%" bg="purple">
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
                  {/* <ComboBox
                    isDisabled={false}
                    text="filter options"
                    options={Object.values(headerData)}
                    onOptionchange={handleComboBoxChange} 
                  /> */}
                </Box>
              </Box>
              <Box sx={conteiner}></Box>
              {/* <Flex
                justifyContent="center"
                alignItems={"center"}
                flexDirection={"column"}
              >
                <ArticlesTable
                  articles={
                    filteredArticles.length > 0 ? filteredArticles : articles
                  }
                />
              </Flex>
              <StudySelectionArea /> */}
              <LayoutFactory
                page={{ type: "Selection" }}
                layout={layout}
                articles={articles}
                filteredArticles={filteredArticles}
              />
            </Box>
          </Box>
        </FlexLayout>
      </StudySelectionProvider>
    </AppProvider>
  );
}
