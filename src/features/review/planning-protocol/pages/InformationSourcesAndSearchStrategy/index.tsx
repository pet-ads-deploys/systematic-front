// External library
import { Box, FormControl } from "@chakra-ui/react";

// Components
import Header from "@components/structure/Header/Header";
import NavButton from "@components/common/buttons/NavigationButton";
import AddTextTable from "../../components/common/inputs/text/AddTextTable";
import TextAreaInput from "../../../../../components/common/inputs/InputTextArea";
import AddSelectionTable from "../../components/common/inputs/selection/AddSelectionTable";
import FlexLayout from "@components/structure/Flex/Flex";

// Service
import useCreateProtocol from "../../services/useCreateProtocol";

export default function InformationSourcesAndSearchStrategy() {
  const {
    informationSourcesAndSearchStrategy,
    handleChangeInformationSourcesAndSearchStrategy,
    handleDataAndGoNext,
    handleDataAndReturn,
  } = useCreateProtocol();

  const { searchMethod, searchString, sourcesSelectionCriteria } =
    informationSourcesAndSearchStrategy;
  const id = localStorage.getItem("systematicReviewId");

  return (
    <FlexLayout navigationType="Accordion">
      <Header text="Protocol: Information Sources And Search Strategy" />
      <FormControl
        m={"20px auto 0"}
        display={"flex"}
        gap={10}
        flexDir={"column"}
        w={"60vw"}
        alignItems={"center"}
      >
        <TextAreaInput
          value={sourcesSelectionCriteria}
          onChange={(event) => {
            handleChangeInformationSourcesAndSearchStrategy(
              "sourcesSelectionCriteria",
              event.target.value
            );
          }}
          label="Sources Selection Criteria"
          placeholder="Enter the sources selection criteria"
        />
        <AddSelectionTable
          label="Databases and Information Source"
          options={[
            "Google Scholar",
            "Scopus",
            "Scielo",
            "BDTD",
            "PubMed",
            "Expert Suggestion",
            "Backward Snowballing",
            "Forward Snowballing",
            "Grey Literature Sources",
          ]}
          placeholder={"Select Data Base"}
          typeField="select"
        />
        <TextAreaInput
          value={searchMethod}
          onChange={(event) => {
            handleChangeInformationSourcesAndSearchStrategy(
              "searchMethod",
              event.target.value
            );
          }}
          label="Search Strategy"
          placeholder="Enter Search Strategy"
        />
        <AddTextTable
          text="Keywords"
          placeholder="Enter the keywords related to your review"
        />
        <TextAreaInput
          value={searchString}
          onChange={(event) => {
            handleChangeInformationSourcesAndSearchStrategy(
              "searchString",
              event.target.value
            );
          }}
          label="Search String"
          placeholder="Enter the search string"
        />
        <Box
          w={"60vw"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <NavButton event={handleDataAndReturn} text="Back" />
          <NavButton
            event={() =>
              handleDataAndGoNext(
                `/review/planning/protocol-part-II/${id}`,
                true
              )
            }
            text="Next"
          />
        </Box>
      </FormControl>
    </FlexLayout>
  );
}
