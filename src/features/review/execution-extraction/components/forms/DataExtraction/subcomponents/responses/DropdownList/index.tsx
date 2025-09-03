// External library
import { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

// Components
import SelectInput from "@components/common/inputs/SelectInput";

// Utils
import { capitalize } from "@features/shared/utils/helpers/formatters/CapitalizeText";

// Styles
import { container, label } from "../styles";

// Types
interface DropdownListProps {
  question: string;
  options: string[];
  answer: string;
  onResponse: (response: string) => void;
}

export default function DropdownList({
  question,
  options,
  answer,
  onResponse,
}: DropdownListProps) {
  const [selected, setSelected] = useState(answer);

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
