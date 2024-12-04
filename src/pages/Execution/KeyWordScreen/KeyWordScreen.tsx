import Header from "../../../components/ui/Header/Header";
import DynamicTable from "../../../components/Tables/DynamicTable";
import useFetchTableData from "../../../hooks/seachAppropriateStudy/useFetchStudyData";
import { Flex } from "@chakra-ui/react";
import FlexLayout from "../../../components/ui/Flex/Flex";
import { KeyWordHeaderInterface } from "../../../../public/interfaces/IKeyWordHeard";

export default function KeyWordScreen() {
  const keyWords = useFetchTableData("/data/keywordData.json");
  const headerData: KeyWordHeaderInterface = {
    keyword: "Keywords",
    frequency: "Frequency"
  }
  if (!headerData) return <>Header Data not found</>
  if (!keyWords) return <>Keywords data not found</>

  return (
    <FlexLayout defaultOpen={1} navigationType="Accordion">
      <Header text="Keyword Screen" />

      <Flex marginLeft={"4em"} marginRight={"4em"} w={"78vw"}>
        <DynamicTable headerData={headerData} bodyData={keyWords} tableType="keyword" filteredColumns={[]} />
      </Flex>
    </FlexLayout>
  );
}
