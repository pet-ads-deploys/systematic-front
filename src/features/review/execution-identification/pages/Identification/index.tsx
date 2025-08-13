// External library
import { Box } from "@chakra-ui/react";

// Components
import DataBaseRequired from "../../../shared/components/structure/DataBaseRequired";
import DataBaseCard from "./subcomponents/cards/DatabaseCard";
import Header from "../../../../../components/structure/Header/Header";
import FlexLayout from "../../../../../components/structure/Flex/Flex";

// Service
import useFetchDataBases from "../../../shared/services/useFetchDataBases";

// Styles
import { conteiner, dataBaseconteiner } from "./styles";

export default function Identification() {
  const { databases } = useFetchDataBases();

  const databaseListIsEmpty = databases.length == 0;

  return (
    <FlexLayout defaultOpen={1} navigationType="Accordion">
      <Header text="Studies Identification" />
      <Box
        sx={conteiner}
        justifyItems={"center"}
        boxSizing={"border-box"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        {databaseListIsEmpty && <DataBaseRequired />}
        <Box sx={dataBaseconteiner}>
          {databases.map((data, index) => (
            <DataBaseCard text={data} key={index} />
          ))}
        </Box>
      </Box>
    </FlexLayout>
  );
}
