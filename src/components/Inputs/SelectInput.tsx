import { FormControl, Select } from "@chakra-ui/react";
import React from "react";
import { formcontrol } from "./styles/SelectInputStyles";

interface ISelectInputProps {
  values: string[];
  names: string[];
  onSelect: (selectValue: string) => void;
  selectedValue: string | null;
  placeholder?: string;
  page: string;
}

export default function SelectInput({ values, names, onSelect, selectedValue, placeholder, page }: ISelectInputProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  const isProtocol = page === "protocol";
  return (
    <FormControl sx={formcontrol} w={isProtocol ? "55%" : "15rem"}>
      <Select bgColor={"#EBF0F3"} color="#2E4B6C" placeholder={placeholder} value={selectedValue || ""} onChange={handleSelectChange}>
        {names.map((optionName, index) => (
          <option key={index} value={values[index]}>
            {optionName}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}