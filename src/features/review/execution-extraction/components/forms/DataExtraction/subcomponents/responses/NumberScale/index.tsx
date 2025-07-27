import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  radiosGroup,
  radios,
  radioBox,
  clearButton,
  radiosLabel,
} from "./styles";
import { capitalize } from "../../../../../../../../shared/utils/helpers/formatters/CapitalizeText";
import { container, label } from "../styles";

interface NumberScaleProps {
  answer: string;
  question: string;
  minValue: number;
  maxValue: number;
  onResponse: (response: string) => void;
}

export default function NumberScale({
  question,
  answer,
  minValue,
  maxValue,
  onResponse,
}: NumberScaleProps) {
  const [checkedOption, setCheckedOption] = useState<string>(answer);

  const scaleValues = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => minValue + i
  );

  const handleClearSelection = () => {
    setCheckedOption("");
  };

  const handleChange = (value: string) => {
    setCheckedOption(value);
    onResponse(value);
  };

  console.log("number", checkedOption);

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <Box display="flex" flexDirection="column" gap="1rem">
        <RadioGroup
          sx={radiosGroup}
          value={checkedOption}
          onChange={handleChange}
        >
          <Flex wrap="wrap" justifyContent="center" gap="1rem">
            {scaleValues.map((value, index) => (
              <Flex key={index} sx={radioBox}>
                <Text sx={radiosLabel}>{value}</Text>
                <Radio sx={radios} value={value.toString()} />
              </Flex>
            ))}
          </Flex>
        </RadioGroup>
        {checkedOption && (
          <Button sx={clearButton} onClick={handleClearSelection}>
            Clear selection
          </Button>
        )}
      </Box>
    </FormControl>
  );
}
