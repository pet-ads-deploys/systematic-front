// External library
import { useState } from "react";
import { Box, FormControl, FormLabel, Checkbox } from "@chakra-ui/react";


// Utils
import { capitalize } from "@features/shared/utils/helpers/formatters/CapitalizeText";

// Styles
import { container, label } from "../styles";

// Types
interface MultiSelectionListProps {
  question: string;
  options: string[];
  answer: string[];
  onResponse: (response: string[]) => void;
}

export default function MultiSelectionList({
  question,
  options,
  answer,
  onResponse,
}: MultiSelectionListProps) {
  const [selected, setSelected] = useState<string[]>(answer);

  const hasIncludesValue = (value: string): string[] => {
    if (!selected.includes(value)) return [...selected, value];
    return selected.filter((item) => item !== value);
  };

  const handleSelectChange = (value: string) => {
    const content = hasIncludesValue(value);
    setSelected(content);
    onResponse(content);
  };

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <Box display="flex" flexDirection="column" gap="1rem">
        {options.map((value, index) => (
          <Checkbox
            checked={selected.includes(value)}
            onChange={() => handleSelectChange(value)}
            key={index}
          >
            {value}
          </Checkbox>
        ))}
      </Box>
    </FormControl>
  );
}
