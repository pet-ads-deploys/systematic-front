// External library
import { Box, FormControl } from "@chakra-ui/react";

// Components
import Header from "@components/structure/Header/Header";
import NavButton from "@components/common/buttons/NavigationButton";
import FlexLayout from "@components/structure/Flex/Flex";
import InteractiveTable from "@features/review/planning-protocol/pages/StepThree/subcomponents/tables/InteractiveTable";
import CardDefault from "@components/common/cards";

// Hooks
import { useNavigation } from "@features/shared/hooks/useNavigation";

export default function RiskOfBiasAssessment() {
  const { toGo } = useNavigation();

  const id = localStorage.getItem("systematicReviewId") || "";
  const url = `systematic-study/${id}/protocol`;

  return (
    <FlexLayout navigationType="Accordion">
      <Header text="Protocol: Risk Of Bias Assessment" />
      <CardDefault
        backgroundColor="#fff"
        borderRadius="1rem"
        withShadow={false}
      >
        <Box
          display="flex" 
          flexDirection="column" 
          alignItems={"center"}
          h="calc(100vh - 10rem)"
          overflowY={"auto"}
        >
        <FormControl
          m={"20px auto 0"}
          display={"flex"}
          gap={10}
          flexDir={"column"}
          w={"60vw"}
          alignItems={"center"}
          flexGrow={1} 
        >
          <InteractiveTable
            id={id}
            url={url}
            label={"Risk of Bias Questions"}
          />
          </FormControl>
          </Box>
          <Box
            w={"70vw"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"end"}
            pt={"0.5rem"}
          >
            <NavButton
              event={() =>
                toGo(`/review/planning/protocol/selection-and-extraction/${id}`)
              }
              text="Back"
            />
            <NavButton
              event={() =>
                toGo(
                  `/review/planning/protocol/analysis-and-synthesis-of-results/${id}`
                )
              }
              text="Next"
            />
          </Box>
      </CardDefault>
    </FlexLayout>
  );
}
