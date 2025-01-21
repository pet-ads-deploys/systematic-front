import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { container, label, responseArea } from "./textual";
import { useState } from "react";
import { capitalize } from "../../../../../../../utils/CapitalizeText";

interface TextualResponseProps {
  question: string;
}

export default function TextualResponse({ question }: TextualResponseProps) {
  const [response, setResponse] = useState<string>("");

  console.log("resposta do textual", response);

  return (
    <FormControl sx={container}>
      <FormLabel sx={label}>{capitalize(question)}</FormLabel>
      <Textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        sx={responseArea}
        _placeholder={{ opacity: 1, color: "gray.500" }}
        placeholder="Your response"
        focusBorderColor="#2E4B6C"
      />
    </FormControl>
  );
}
