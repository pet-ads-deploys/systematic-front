import { Box, Button, Flex, FormControl, FormLabel, Radio, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import { container, label, radiosGroup, radios, radioBox } from "./numberScale";

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
  const [checkedOption, setCheckedOption] =
    useState<string>("");

  const scaleValues = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => minValue + i
  );

  const handleClearSelection = () => {
    setCheckedOption("");
  }

  console.log("valor do radios:", checkedOption);

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{question}</FormLabel>
      <Box h="10rem">
      <RadioGroup sx={radiosGroup} gap=".5rem" value={checkedOption} onChange={setCheckedOption} w="100%">
        {scaleValues.map((value, index) => (
            <Flex key={index} sx={radioBox}>
            {value}
            <Radio key={index} sx={radios} variant={"outline"} value={value.toString()} /></Flex>
        ))}
      </RadioGroup>
      {checkedOption && <Button onClick={handleClearSelection}>
            Clear selection
        </Button>}
      </Box>
    </FormControl>
  );
}
