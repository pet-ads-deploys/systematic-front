import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { container, label, radiosGroup, radios, radioBox, clearButton, radiosLabel } from "./numberScale";
import { capitalize } from "../../../../../../../utils/CapitalizeText";
import { RiRestartLine } from "react-icons/ri";

interface NumberScaleProps {
  question: string;
  minValue: number;
  maxValue: number;
}

export default function NumberScale({
  question,
  minValue,
  maxValue,
}: NumberScaleProps) {
  const [checkedOption, setCheckedOption] = useState<string>("");

  const scaleValues = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => minValue + i
  );

  const handleClearSelection = () => {
    setCheckedOption("");
  };

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <Box display="flex" flexDirection="column" gap="1rem">
        <RadioGroup
          sx={radiosGroup}
          value={checkedOption}
          onChange={setCheckedOption}
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
