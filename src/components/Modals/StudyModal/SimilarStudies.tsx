import { Container, Box, Heading } from "@chakra-ui/react";
import DynamicTable from "../../Tables/DynamicTable";
import useFetchTableData from "../../../hooks/seachAppropriateStudy/useFetchStudyData";
import useInputState from "../../../hooks/useInputState";
import { TableHeadersInterface } from "../../../../public/interfaces/ITableHeaders";
import {NoStudiesData} from "../../NotFound/NoStudiesData";
import { tableTypeEnum } from "../../../../public/enums/tableTypeEnum";

export default function SimilarStudies() {
  const studies = useFetchTableData("/data/NewStudyData.json");
  const headerData: TableHeadersInterface = {
    title: "Title",
    authors: "Author",
    year: "Year",
    selectionStatus: "Status/Selection",
    extractionStatus: "Status/Extraction",
    readingPriority: "Reading Priority"
}
  const { value: checkedValues } = useInputState<string[]>([]);

  if(!studies) return <NoStudiesData/>

  return (
    <Container>
      <Heading textAlign="right" mx="2em">
        Similar Studies
      </Heading>

      <Box style={{ maxHeight: "350px", overflowY: "auto" }} w="39rem">
        <DynamicTable headerData={headerData} tableType={tableTypeEnum.MODAL} bodyData={studies} filteredColumns={checkedValues} searchString={""} selectedStatus={null} />
      </Box>
    </Container>
  );
}
