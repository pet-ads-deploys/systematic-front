import { Box, Container, Heading, Text, Select } from "@chakra-ui/react";
import useFetchQualityFormData from "../../../hooks/fetch/useFetchQualityFormData";

const boxTheme = {
  my: "1rem",
};

const textTheme = {
  fontWeight: "bold",
  mb: "4px",
};

export default function QualityForm() {
  const qualityForm = useFetchQualityFormData(
    "../../../mocks/qualityFormData.json"
  );
  return (
    <Container flex="row" style={{ maxHeight: "350px", overflowY: "auto" }}>
      <Heading textAlign="center" my="1rem">
        Quality Form
      </Heading>
      {qualityForm.map((form) => (
        <Box sx={boxTheme}>
          <Text sx={textTheme}>{form.text}</Text>
          <Select placeholder="Select option">
            {form.select.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </Select>
        </Box>
      ))}
    </Container>
  );
}
