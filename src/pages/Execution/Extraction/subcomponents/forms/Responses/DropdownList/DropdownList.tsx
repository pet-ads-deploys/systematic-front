import { FormControl, FormLabel } from "@chakra-ui/react";
import SelectInput from "../../../../../../../components/Inputs/SelectInput";
import useInputState from "../../../../../../../hooks/useInputState";
import { capitalize } from "../../../../../../../utils/CapitalizeText";
import { container, label } from "../styles";

interface DropdownListProps {
  question: string;
  options: string[];
}

export default function DropdownList({ question, options }: DropdownListProps) {
  const { value: selectedStatus, handleChange: handleSelectChange } = useInputState<string | null>(null);
  console.log("select value of dropdown list", selectedStatus)

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <SelectInput
        names={[...options]}
        values={[...options]}
        onSelect={(value) => handleSelectChange(value)}
        selectedValue={selectedStatus}
        page={"extraction"}
        placeholder="Options"
      />
    </FormControl>
  );
}
