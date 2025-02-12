import Header from "../../../components/ui/Header/Header";
// import DynamicTable from "../../../components/Tables/DynamicTable";
import useFetchStudyData from "../../../hooks/seachAppropriateStudy/useFetchStudyData";
import { Flex } from "@chakra-ui/react";
import FlexLayout from "../../../components/ui/Flex/Flex";
import { KeyWordHeaderInterface } from "../../../../public/interfaces/IKeyWordHeard";
// import { tableTypeEnum } from "../../../../public/enums/tableTypeEnum";
import KeywordsTable from "../../../components/Tables/KeywordsTable/KeywordsTable";

export default function KeyWordScreen() {
  const keyWords = useFetchStudyData("/data/keywordData.json");
  const headerData: KeyWordHeaderInterface = {
    keyword: "Keywords",
    frequency: "Frequency"
  }
  if (!headerData) return <>Header Data not found</>
  if (!keyWords) return <>Keywords data not found</>

  return (
    <FlexLayout defaultOpen={1} navigationType="Accordion">
      <Header text="Keywords" />

      <Flex marginLeft={"4em"} marginRight={"4em"} w={"78vw"}>
        {/* <DynamicTable headerData={headerData} bodyData={keyWords} tableType={tableTypeEnum.KEYWORD} filteredColumns={[]} searchString="" selectedStatus={null}/> */}
        <KeywordsTable keywords={keyWords}/>
      </Flex>
    </FlexLayout>
  );
}
