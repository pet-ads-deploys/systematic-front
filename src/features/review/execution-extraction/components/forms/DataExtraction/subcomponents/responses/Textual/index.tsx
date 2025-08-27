// External library
import React, { useState } from "react";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

// Utils
import { capitalize } from "@features/shared/utils/helpers/formatters/CapitalizeText";

// Styles
import { responseArea } from "./styles";
import { container, label } from "../styles";

// Types
interface TextualResponseProps {
  question: string;
  answer: string;
  onResponse: (response: string) => void;
}

export default function TextualResponse({
  question,
  answer,
  onResponse,
}: TextualResponseProps) {
  const [response, setResponse] = useState<string>(answer);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setResponse(value);
    onResponse(value);
  };

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <Textarea
        value={response}
        onChange={handleChange}
        sx={responseArea}
        _placeholder={{ opacity: 1, color: "gray.500" }}
        placeholder="Your response"
        focusBorderColor="#2E4B6C"
      />
    </FormControl>
  );
}
