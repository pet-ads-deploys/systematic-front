import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

interface ITextInputProps {
  label: string;
  placeholder: string;
  value: string | null;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  mt?: number;
}

export default function TextAreaInput({ label, placeholder, onChange, value, ...textareaProps }: ITextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const normalizedValue = value ?? "";

  return (
    <FormControl maxW={"60vw"}>
      <FormLabel color={"#2E4B6C"}>{label}</FormLabel>
      <Textarea bgColor={"#C9D9E5"} _placeholder={{ opacity: 1, color: 'gray.500' }}
          focusBorderColor="#2E4B6C" placeholder={placeholder} onChange={handleChange}
          {...textareaProps} value={normalizedValue}/>
    </FormControl>
  );
}
