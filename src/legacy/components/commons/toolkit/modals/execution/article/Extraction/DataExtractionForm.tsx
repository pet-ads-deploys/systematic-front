import {
  Box,
  Container,
  Text,
  Input,
  Heading,
  Select,
  CheckboxGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import useFetchExtractionForm from "../../../../../../../../hooks/fetch/useFetchExtractionForm";
import useFetchSelectBox from "../../../../../../../../hooks/fetch/useFetchSelectBox";

const boxTheme = {
  my: "1rem",
};
const textTheme = {
  fontWeight: "bold",
  mb: "4px",
};

export default function DataExtractionForm() {
  const extractionForm = useFetchExtractionForm(
    "../../../mocks/dataExtractionForm.json"
  );
  const selectBox = useFetchSelectBox(
    "../../../mocks/protocolData/extractionPickList.json"
  );
  const checkBox = useFetchSelectBox(
    "../../../mocks/protocolData/extractionCheckBoxData.json"
  );

  console.log(extractionForm);
  console.log(selectBox);
  console.log(checkBox);

  let selectItems: string[];
  let selectLabel: string;
  let checkItems: string[];
  let checkLabel: string;

  if (selectBox == null) {
    selectItems = [];
    selectLabel = "";
  } else {
    selectItems = selectBox[0].options;
    selectLabel = selectBox[0].description;
    // console.log(selectLabel);
    // console.log(selectItems);
  }

  if (checkBox == null) {
    checkItems = [];
    checkLabel = "";
  } else {
    checkItems = checkBox[2].options;
    checkLabel = checkBox[2].description;
    console.log(checkItems);
    console.log(checkLabel);
  }

  return (
    <Container flex="row" style={{ maxHeight: "350px", overflowY: "auto" }}>
      <Heading textAlign="center" my="1rem">
        Data Extraction Form
      </Heading>
      <Box sx={boxTheme}>
        <Text sx={textTheme}>Label:</Text>
        <Input placeholder={extractionForm?.label} size="md" />
      </Box>
      <Box sx={boxTheme}>
        <Text sx={textTheme}>{selectLabel}:</Text>
        <Select placeholder="Select option">
          {selectItems && selectItems.length != 0 ? (
            selectItems.map((item) => <option value={item}>{item}</option>)
          ) : (
            <option value="none">Não há opções</option>
          )}
        </Select>
      </Box>
      <Box sx={boxTheme}>
        <Text sx={textTheme}>{checkLabel}:</Text>
        <CheckboxGroup colorScheme="green">
          <Stack direction={["column"]}>
            {checkItems && checkItems.length > 0 ? (
              checkItems.map((option) => <Checkbox>{option}</Checkbox>)
            ) : (
              <p>Não Há Opções</p>
            )}
          </Stack>
        </CheckboxGroup>
      </Box>
    </Container>
  );
}
