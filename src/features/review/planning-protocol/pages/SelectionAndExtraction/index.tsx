// External library
import { Box, FormControl } from "@chakra-ui/react";

// Components
import Header from "@components/structure/Header/Header";
import NavButton from "@components/common/buttons/NavigationButton";
import TextAreaInput from "../../../../../components/common/inputs/InputTextArea";
import FlexLayout from "@components/structure/Flex/Flex";
import InteractiveTable from "@features/review/planning-protocol/pages/StepThree/subcomponents/tables/InteractiveTable";

// Service
import useCreateProtocol from "../../services/useCreateProtocol";

export default function SelectionAndExtraction() {
  const {
    selectionAndExtraction,
    handleChangeSelectionAndExtraction,
    handleDataAndGoNext,
    handleDataAndReturn,
  } = useCreateProtocol();

  const { dataCollectionProcess, selectionProcess } = selectionAndExtraction;

  const id = localStorage.getItem("systematicReviewId") || "";
  const url = `http://localhost:8080/systematic-study/${id}/protocol`;

  return (
    <FlexLayout navigationType="Accordion">
      <Header text="Protocol: Selection And Extraction" />
      <FormControl
        m={"20px auto 0"}
        display={"flex"}
        gap={10}
        flexDir={"column"}
        w={"60vw"}
        alignItems={"center"}
      >
        <InteractiveTable id={id} url={url} label={"Extraction Questions"} />

        <TextAreaInput
          value={selectionProcess}
          onChange={(event) => {
            handleChangeSelectionAndExtraction(
              "selectionProcess",
              event.target.value
            );
          }}
          label="Study Selection Process"
          placeholder="Enter selection process"
        />

        <TextAreaInput
          value={dataCollectionProcess}
          onChange={(event) => {
            handleChangeSelectionAndExtraction(
              "dataCollectionProcess",
              event.target.value
            );
          }}
          label="Data Collection Process"
          placeholder="Enter the data colletion process"
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
