import { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

import SelectInput from "../../../../../../../components/Inputs/SelectInput";

import { capitalize } from "../../../../../../../utils/CapitalizeText";

import { container, label } from "../styles";

interface LabeledListProps {
  question: string;
  scales: Record<string, number>;
  onResponse: (response: string) => void;
}

export default function LabeledList({
  question,
  scales,
  onResponse,
}: LabeledListProps) {
  const [selected, setSelected] = useState("");

  const handleSelectChange = (value: string) => {
    setSelected(value);
    onResponse(value);
  };

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
        selectedValue={selected}
        page={"extraction"}
        placeholder="Labels"
      />
    </FormControl>
  );
}
