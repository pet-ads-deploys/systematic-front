import { FormControl, FormLabel, CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react";

interface ICheckBoxprops {
  label: string;
  name: string[];
  checkedByDefault?: (string | number)[];
  handleCheckboxChange?: (selectedItems: string[]) => void;
}

export default function CheckboxInput({ label, name, checkedByDefault, handleCheckboxChange }: ICheckBoxprops) {
  return (
    <FormControl w={"80vw"}>
      <FormLabel>{label}</FormLabel>
      <CheckboxGroup colorScheme="green" onChange={handleCheckboxChange} defaultValue={checkedByDefault}>
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          {name.map((checkboxName, index) => (
            <Checkbox key={index} value={checkboxName.toLowerCase()}>
              {checkboxName}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
}
