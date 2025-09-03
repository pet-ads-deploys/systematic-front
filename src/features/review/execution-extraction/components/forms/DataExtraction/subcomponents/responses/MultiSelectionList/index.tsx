// External library
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

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
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!answer) return;
    setSelected(answer);
  }, [answer]);

  const handleChange = (values: (string | number)[]) => {
    const next = values.map(String);
    setSelected(next);
    onResponse(next);
  };

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <CheckboxGroup value={selected} onChange={handleChange}>
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          overflowY="auto"
          maxH="8rem"
        >
          {options.map((value) => (
            <Checkbox
              value={value}
              key={value}
              isChecked={selected.includes(value)}
            >
              {value}
            </Checkbox>
          ))}
        </Box>
      </CheckboxGroup>
    </FormControl>
  );
}
