import { Box, Flex } from "@chakra-ui/react";
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

export default function Selection<U extends StudyInterface | KeywordInterface>() {
  const studiesData: U[] | undefined = useFetchTableData("/data/NewStudyData.json");
//   const headerData: TableHeadersInterface = {
//     title: "Title",
//     authors: "Author",
//     year: "Year",
//     selectionStatus: "Selection",
//     extractionStatus: "Extraction",
//     readingPriority: "Reading Priority"
// }
  const { value: selectedStatus, handleChange: handleSelectChange } = useInputState<string | null>(null);
  const [ searchString, setSearchString ] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const selectionContext = useContext(StudySelectionContext);
  
  if(!selectionContext) throw new Error("Failed to get the selection context");
  let articles: ArticleInterface[]  = [];
  articles = selectionContext.articles;

  // articles = studiesData;

  if(!studiesData) return <NoStudiesData/>


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
  
  const handleSearchAndFilter = (
    searchString: string,
    selectedStatus: string | null,
    selectedColumns: string[]
  ) => {
    const lowerCaseSearch = searchString.toLowerCase();
  
    return articles.filter((article) => {
      const matchesSearch = selectedColumns.length
        ? selectedColumns.some((column) =>
            article[column as keyof ArticleInterface]
              ?.toString()
              .toLowerCase()
              .includes(lowerCaseSearch)
          )
        : Object.values(article).some((value) =>
            value?.toString().toLowerCase().includes(lowerCaseSearch)
          );
  
      const matchesStatus =
        !selectedStatus || article.selectionStatus === selectedStatus;
  
      return matchesSearch && matchesStatus;
    });
  };
  
  
  const filteredArticles = handleSearchAndFilter(
    searchString,
    selectedStatus,
    selectedColumns
  );   

  return (
    <AppProvider>
      <StudySelectionProvider>
        <FlexLayout defaultOpen={1} navigationType="Accordion">
          <Header text="Selection" />
          <Box overflowY="auto" h="90%">
          <Box w="100%">
          <Box sx={conteiner}>
                <Box sx={inputconteiner}>
                  <InputText type="search" placeholder="Insert article atribute" nome="search" onChange={(e) => setSearchString(e.target.value)} value={searchString} />
                 
                  <Box display="flex" gap="1rem" justifyContent="space-between" alignItems="center">
                  <SelectInput
                    names={["INCLUDED", "DUPLICATED", "REJECTED", "UNCLASSIFIED"]}
                    values={["INCLUDED", "DUPLICATED", "REJECTED", "UNCLASSIFIED"]}
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
              </Box>
              <Flex justifyContent='center' alignItems={'center'} flexDirection={'column'}>
                <ArticlesTable articles={filteredArticles.length > 0 ?  filteredArticles : articles} />
                <StudySelectionArea />
              </Flex>
          </Box>
          </Box>
        </FlexLayout>
      </StudySelectionProvider>
    </AppProvider>
  );
}
