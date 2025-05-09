import { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

import SelectInput from "../../../../../../../components/Inputs/SelectInput";

import { capitalize } from "../../../../../../../utils/CapitalizeText";

import { container, label } from "../styles";

interface DropdownListProps {
  question: string;
  options: string[];
  onResponse: (response: string) => void;
}

export default function DropdownList({
  question,
  options,
  onResponse,
}: DropdownListProps) {
  const [selected, setSelected] = useState("");

  const handleSelectChange = (value: string) => {
    setSelected(value);
    onResponse(value);
  };

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <SelectInput
        names={[...options]}
        values={[...options]}
        onSelect={(value) => handleSelectChange(value)}
        selectedValue={selected}
        page="extraction"
        placeholder="Options"
      />
    </FormControl>
  );
}
