// External library
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

// Types
interface ITextFieldProps {
  label?: string;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;
  placeholder: string;
  type: string;
  nome: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  labelAbove?: boolean;
  value?: string;
  isDisabled?: boolean;
}

export default function InputText({
  label,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  placeholder,
  type,
  nome,
  onChange,
  labelAbove,
  value,
  isDisabled,
}: ITextFieldProps) {
  const isSearchField = type === "search";

  return (
    <FormControl
      width={width ? `clamp(${minWidth}, ${width}, ${maxWidth})` : "60vw"}
      height={`clamp(${minHeight}, ${height}, ${maxHeight})`}
      mt={isSearchField ? "" : 5}
    >
      <FormControl>
        {label && (
          <FormLabel
            mb={labelAbove ? "0.3rem" : "0"}
            fontWeight={500}
            fontSize={"large"}
          >
            {label}
          </FormLabel>
        )}
        <Input
          type={type}
          name={nome}
          placeholder={placeholder}
          w={isSearchField ? "250px" : "100%"}
          bgColor={"#ffffffff"}
          borderRadius={"3px"}
          border="2px solid"
          borderColor="gray.300"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          focusBorderColor="#2E4B6C"
          onChange={onChange}
          value={value}
          isDisabled={isDisabled}
        />
      </FormControl>
    </FormControl>
  );
}
