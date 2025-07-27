import { formControl } from "./styles";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface iEmailInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailInput({ handleChange }: iEmailInputProps) {
  return (
    <FormControl sx={formControl}>
      <FormLabel>Email:</FormLabel>
      <Input type="text" placeholder="Enter your best email here..." w={"100%"} onChange={handleChange} />
    </FormControl>
  );
}
