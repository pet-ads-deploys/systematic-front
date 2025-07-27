import { Container, Box, Heading } from "@chakra-ui/react";
import DynamicTable from "../../../../tables/execution/DynamicTable/DynamicTable";
import useFetchTableData from "../../../../../../../hooks/execution/useFetchStudyData";

import { NoStudiesData } from "../../../../../../../../features/application/components/NotFound";
import { tableTypeEnum } from "../../../../../../../../features/review/shared/types/enums/tableTypeEnum";
import { TableHeadersInterface } from "../../../../../../../types/ITableHeaders";
import useInputState from "@features/review/shared/hooks/useInputState";

export default function SimilarStudies() {
  const studies = useFetchTableData("/data/NewStudyData.json");
  const headerData: TableHeadersInterface = {
    title: "Title",
    authors: "Author",
    year: "Year",
    selectionStatus: "Status/Selection",
    extractionStatus: "Status/Extraction",
    readingPriority: "Reading Priority",
  };
  const { value: checkedValues } = useInputState<string[]>([]);

  if (!studies) return <NoStudiesData />;

  return (
    <Container>
      <Heading textAlign="right" mx="2em">
        Similar Studies
      </Heading>

      <Box style={{ maxHeight: "350px", overflowY: "auto" }} w="39rem">
        <DynamicTable
          headerData={headerData}
          tableType={tableTypeEnum.MODAL}
          bodyData={studies}
          filteredColumns={checkedValues}
          searchString={""}
          selectedStatus={null}
        />
      </Box>
    </Container>
  );
}
