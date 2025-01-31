import { FormControl, FormLabel } from "@chakra-ui/react";
import { capitalize } from "../../../../../../../utils/CapitalizeText";
import { container, label } from "../styles";
import SelectInput from "../../../../../../../components/Inputs/SelectInput";
import useInputState from "../../../../../../../hooks/useInputState";

interface LabeledListProps {
  question: string;
  scales: Record<string, number>;
}

export default function LabeledList({ question, scales }: LabeledListProps) {
  const { value: selectedStatus, handleChange: handleSelectChange } =
    useInputState<string | null>(null);
  const transformToStringScales = Object.entries(scales).map(
    ([key, value]) => `${key}: ${value}`
  );

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <SelectInput
        names={[...transformToStringScales]}
        values={[...transformToStringScales]}
        onSelect={(value) => handleSelectChange(value)}
        selectedValue={selectedStatus}
        page={"extraction"}
        placeholder="Labels"
      />
    </FormControl>
    
  );
}
