import { Box, Card, Text } from "@chakra-ui/react";
import { conteiner, obscard, obsconteiner, obslabel, searchcard, searchlabel } from "../styles/searchInfosstyle";

export default function SearchInformations() {
  return (
    <Box sx={conteiner}>
      <Text sx={searchlabel}>Search String: </Text>
      <Card sx={searchcard}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Card>
      <Text>
        <b>Number of Papers:</b> 22 <b>Date of search:</b> dd/mm/aa{" "}
      </Text>
      <Box sx={obsconteiner}>
        <Text sx={obslabel}>Observation: </Text>
        <Card sx={obscard}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Card>
      </Box>
    </Box>
  );
}
