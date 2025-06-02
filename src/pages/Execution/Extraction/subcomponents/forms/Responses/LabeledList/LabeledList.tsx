import { useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

import SelectInput from "../../../../../../../components/Inputs/SelectInput";
import { capitalize } from "../../../../../../../utils/CapitalizeText";

import { container, label } from "../styles";

interface LabeledListProps {
  question: string;
  scales: Record<string, number>;
  answer: {
    name: string;
    value: number;
  };
  onResponse: (response: { name: string; value: number }) => void;
}

export default function LabeledList({
  question,
  scales,
  answer,
  onResponse,
}: LabeledListProps) {
  const transformToStringScales = Object.entries(scales).map(
    ([key, value]) => `${key}: ${value}`
  );

  const initialAnswer =
    answer && answer.name && typeof answer.value === "number"
      ? `${answer.name}: ${answer.value}`
      : "";

  const [selected, setSelected] = useState(initialAnswer);

  useEffect(() => {
    if (answer?.name && typeof answer.value === "number") {
      const newSelected = `${answer.name}: ${answer.value}`;
      setSelected(newSelected);

      if (scales[answer.name] === answer.value) {
        onResponse({ name: answer.name, value: answer.value });
      }
    }
  }, [answer, scales]);

  const handleSelectChange = (value: string) => {
    setSelected(value);
    const [label, num] = value.split(":");
    onResponse({ name: label.trim(), value: parseInt(num.trim()) });
  };

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <SelectInput
        names={transformToStringScales}
        values={transformToStringScales}
        onSelect={handleSelectChange}
        selectedValue={selected}
        page="extraction"
        placeholder="Labels"
      />
    </FormControl>
  );
}
