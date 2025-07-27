// import DynamicTable from "../../../components/Tables/DynamicTable";

import { Flex } from "@chakra-ui/react";
import useFetchStudyData from "../../../hooks/execution/useFetchStudyData";

import FlexLayout from "../../../../components/structure/Flex/Flex";
import Header from "../../../../components/structure/Header/Header";
import KeywordsTable from "../../../components/commons/toolkit/tables/execution/Keywords/KeywordsTable";
import type { KeyWordHeaderInterface, KeywordInterface } from "./types";

export default function KeyWordScreen() {
  const keyWords = useFetchStudyData(
    "/data/keywordData.json"
  ) as KeywordInterface[];
  const headerData: KeyWordHeaderInterface = {
    keyword: "Keywords",
    frequency: "Frequency",
  };
  if (!headerData) return <>Header Data not found</>;
  if (!keyWords) return <>Keywords data not found</>;

  return (
    <FlexLayout defaultOpen={1} navigationType="Accordion">
      <Header text="Keywords" />
      <Flex marginLeft={"4em"} marginRight={"4em"} w={"78vw"}>
        <KeywordsTable keywords={keyWords} />
      </Flex>
    </FlexLayout>
  );
}
