import { FormControl, Input, InputGroup } from "@chakra-ui/react";
import { formControl, inputGroup } from "./styles";

interface iPasswordProps {
  text: string;
  handlechange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
}

export default function PasswordInput({
  text,
  handlechange,
  isValid,
}: iPasswordProps) {
  return (
    <FormControl sx={formControl}>
      <InputGroup sx={inputGroup}>
        <Input
          pr="4.5rem"
          type={"password"}
          placeholder={text}
          bgColor={"#C9D9E5"}
          _placeholder={{ opacity: 1, color: "gray.500" }}
          focusBorderColor="#526D82"
          onChange={handlechange}
          errorBorderColor={isValid === false ? "red" : ""}
        />
      </InputGroup>
    </FormControl>
  );
}
