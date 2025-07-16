import {
  Box,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import useFetchTextualData from "./../../../hooks/fetch/useFetchTextualData";

export default function SelectionData() {
  // Corrigido para "SelectionData"
  const { selectionInclusionData, selectionExclusionData } =
    useFetchTextualData(
      "./../../../public/mocks/protocolData/extractionCriterionDto.json"
    ); // Corrigido para "useFetchTextualData"
  console.log(selectionInclusionData, selectionExclusionData);
  return (
    <Container style={{ maxHeight: "350px", overflowY: "auto" }}>
      <Heading as="h1" textAlign="center" my="1rem">
        Selection Data
      </Heading>
      <Flex>
        <Box>
          <Heading as="h3" size="md" textAlign="center" mb="1rem">
            Inclusion Criterias
          </Heading>
          <CheckboxGroup colorScheme="green">
            <Stack direction="column" spacing=".5rem">
              {selectionInclusionData.map((criteria) => (
                <Checkbox>{criteria}</Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </Box>

        <Spacer />

        <Box>
          <Heading as="h3" size="md" textAlign="center" mb="1rem">
            Exclusion Criterias
          </Heading>
          <CheckboxGroup colorScheme="green">
            <Stack direction="column" spacing=".5rem">
              {selectionExclusionData.map((criteria) => (
                <Checkbox>{criteria}</Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </Box>
      </Flex>
    </Container>
  );
}
