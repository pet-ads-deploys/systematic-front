import { useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

import SelectInput from "../../../../../../../components/Inputs/SelectInput";
import { capitalize } from "../../../../../../../utils/CapitalizeText";

import { container, label } from "../styles";

interface LabeledListProps {
  question: string;
  scales: Record<string, number>;
  answer: string;
  onResponse: (response: { name: string; value: number }) => void;
}

export default function LabeledList({
  question,
  scales,
  answer,
  onResponse,
}: LabeledListProps) {
  const [selected, setSelected] = useState("");

  const options = Object.entries(scales).map(
    ([key, value]) => `${key}: ${value}`
  );

  const handleSelectChange = (value: string) => {
    setSelected(value);
    const [label, num] = value.split(":");
    onResponse({ name: label.trim(), value: parseInt(num.trim()) });
  };

  useEffect(() => {
    if (typeof answer !== "string" || !answer.includes(":")) return;
    handleSelectChange(answer);
  }, [answer]);

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <SelectInput
        names={options}
        values={options}
        onSelect={handleSelectChange}
        selectedValue={selected}
        page="extraction"
        placeholder="Labels"
      />
    </FormControl>
  );
}
