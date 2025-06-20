import { Box } from "@chakra-ui/react";
import { Upload } from "../../components/upload/Upload";
import useInputState from "../../hooks/useInputState";
import Header from "../../components/ui/Header/Header";
import NavButton from "../../components/Buttons/NavButton";
import DynamicTable from "../../components/Tables/DynamicTable";
import useFetchTableData from "../../hooks/seachAppropriateStudy/useFetchStudyData";
import SearchInformations from "./subcomponents/searchInformations";
import { conteiner, navbtnStyles } from "./styles/searchSessionStyles";
// import ComboBox from "../../components/Inputs/ComboBox";
import { flex } from "../NovaRevisao/styles/finalizationStyles";
import EventButton from "../../components/Buttons/EventButton";
import FlexLayout from "../../components/ui/Flex/Flex";
import { TableHeadersInterface } from "../../../public/interfaces/ITableHeaders";
import { NoStudiesData } from "../../components/NotFound/NoStudiesData";
import { tableTypeEnum } from "../../../public/enums/tableTypeEnum";

export default function SearchSession() {
  const bodyData = useFetchTableData("/data/tableData.json");

  const headerData: TableHeadersInterface = {
    title: "Title",
    authors: "Author",
    year: "Year",
    selectionStatus: "Status/Selection",
    extractionStatus: "Status/Extraction",
    readingPriority: "Reading Priority",
  };

  const { value: checkedValues } = useInputState<string[]>([]);

  // const handleFilterOptionChange = (option: string, isChecked: boolean) => {
  //   if (isChecked) {
  //     if (!checkedValues.includes(option)) {
  //       setCheckedValues([...checkedValues, option]);
  //     }
  //   } else {
  //     setCheckedValues(checkedValues.filter((item) => item !== option));
  //   }
  // };

  if (!bodyData) return <NoStudiesData />;

  return (
    <FlexLayout navigationType="Accordion" defaultOpen={1}>
      <Header text={"Database Name-Studies Identification"} />
      <Box
        w={"80vw"}
        display={"flex"}
        flexDir={"column"}
        alignSelf={"center"}
        justifySelf={"center"}
      >
        <Box sx={conteiner} justifyContent={"center"}>
          <SearchInformations />
          <Box sx={flex} flexDir={"column"}>
            <Upload />
            <Box
              mt={5}
              sx={flex}
              flexDir={"row"}
              justifyContent={"space-evenly"}
            >
              {/* <ComboBox
                options={Object.values(headerData)}
                onOptionchange={handleFilterOptionChange}
                selectedItems={checkedValues}
                text={"filter options"}
                isDisabled={false}
                page={"Identification"}
              /> */}
              <EventButton
                ml={4}
                event={function (): void {
                  window.alert("Duplicated Pappers removed");
                }}
                text={"Remove Duplicated Pappers"}
              />
            </Box>
          </Box>
        </Box>
        <Box w={"78vw"} alignSelf={"center"} justifySelf={"center"}>
          <DynamicTable
            headerData={headerData}
            bodyData={bodyData}
            filteredColumns={checkedValues}
            tableType={tableTypeEnum.SELECTION}
          />
          <NavButton
            text={"Back"}
            path={"/newReview/identification"}
            sx={navbtnStyles}
          />
        </Box>
      </Box>
    </FlexLayout>
  );
}
