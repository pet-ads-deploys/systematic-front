import { Box } from "@chakra-ui/react";

import DataBaseCard from "./subcomponents/cards/DatabaseCard";
import Header from "../../../../../components/structure/Header/Header";
import FlexLayout from "../../../../../components/structure/Flex/Flex";

import { StudySelectionProvider } from "@features/review/shared/context/StudiesSelectionContext";

import useFetchDataBases from "../../../shared/services/useFetchDataBases";

import { conteiner, dataBaseconteiner } from "./styles";

export default function Identification() {
  const { databases } = useFetchDataBases();

  return (
    <StudySelectionProvider>
      <FlexLayout defaultOpen={1} navigationType="Accordion">
        <Header text="Studies Identification" />
        <Box
          sx={conteiner}
          justifyItems={"center"}
          boxSizing={"border-box"}
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
          w={"100%"}
        >
          <Box sx={dataBaseconteiner}>
            {databases.map((data, index) => {
              return <DataBaseCard text={data} key={index} />;
            })}
          </Box>
        </Box>
      </FlexLayout>
    </StudySelectionProvider>
  );
}
