import Header from "../../components/structure/Header/Header";
import NavButton from "@components/common/buttons/NavigationButton";
import { Progress, FormControl, Box } from "@chakra-ui/react";
import { btnBox, conteiner, flex } from "./styles/partTwooStyles";
import TextAreaInput from "../../components/Inputs/InputTextArea";
import AddTextTable from "../../components/AddDataFields/AddTextTable";
import AddSelectionTable from "../../components/AddDataFields/AddSelectionTable";
import FlexLayout from "../../components/structure/Flex/Flex";

//importimg hook
import useCreateProtocol from "../../hooks/reviews/useCreateProtocol";
import { useEffect } from "react";

export default function ProtocolPartTwo2() {
  const {
    searchString,
    studyTypeDefinition,
    dataCollectionProcess,
    sourcesSelectionCriteria,
    searchMethod,
    selectionProcess,
    setSearchString,
    setDataCollectionProcess,
    setStudyTypeDefinition,
    setSourcesSelectionCriteria,
    setSearchMethod,
    setSelectionProcess,
    handleDataAndGoNext,
    handleDataAndReturn,
    setFlag,
  } = useCreateProtocol();

  useEffect(() => {
    setFlag("protocolTwo");
  }, []);

  return (
    <FlexLayout defaultOpen={0} navigationType="Accordion">
      <Box
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Header text="Protocol" />
        <Progress value={66} w={"100%"} color={"black"} />

        <FormControl sx={conteiner}>
          <AddTextTable
            text="Inclusion criteria"
            placeholder="Enter the criteria"
          />

          <AddTextTable
            text="Exclusion criteria"
            placeholder="Enter the criteria"
          />

          <FormControl sx={flex}>
            <AddTextTable
              text="Keywords"
              placeholder="Enter the keywords related to your review"
            />
          </FormControl>

          <AddSelectionTable
            label="Languages"
            options={["ENGLISH", "PORTUGUESE", "FRENCH", "SPANISH", "GERMAN"]}
            placeholder={"Select language"}
            typeField="select"
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
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            label="Search String"
            placeholder="Enter the search string"
          />

          <TextAreaInput
            value={studyTypeDefinition}
            onChange={(e) => {
              setStudyTypeDefinition(e.target.value);
            }}
            label="Study Type Definition"
            placeholder="Enter the study type definition"
          />

          <TextAreaInput
            value={sourcesSelectionCriteria}
            onChange={(e) => {
              setSourcesSelectionCriteria(e.target.value);
            }}
            label="Sources Selection Criteria"
            placeholder="Enter the sources selection criteria"
          />

          <TextAreaInput
            value={searchMethod}
            onChange={(e) => {
              setSearchMethod(e.target.value);
            }}
            label="Research Strategy"
            placeholder="Enter research strategy"
          />

          <TextAreaInput
            value={selectionProcess}
            onChange={(e) => {
              setSelectionProcess(e.target.value);
            }}
            label="Article Selection Process"
            placeholder="Enter selection process"
          />

          <TextAreaInput
            value={dataCollectionProcess}
            onChange={(e) => {
              setDataCollectionProcess(e.target.value);
            }}
            label="Data Collection Process"
            placeholder="Enter the data colletion process"
          />
        </FormControl>

        <Box sx={btnBox}>
          <NavButton event={handleDataAndReturn} text="Back" />
          <NavButton event={handleDataAndGoNext} text="Next" />
        </Box>
      </Box>
    </FlexLayout>
  );
}
