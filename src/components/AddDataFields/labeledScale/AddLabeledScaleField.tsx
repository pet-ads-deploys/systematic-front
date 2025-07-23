import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import TextAreaInput from "../../Inputs/InputTextArea";
import EventButton from "@components/common/buttons/EventButton";
import { useState } from "react";
import { formcontrol } from "../styles/AddTextFieldStyle";
import { useToast } from "@chakra-ui/react";

interface IAddTextFieldProps {
  onAddText: (newKeyword: { label: string; value: number }) => void;
  text: string;
}

export default function AddLabeledListField({
  onAddText,
  text,
}: IAddTextFieldProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [value, setValue] = useState(0);
  const toast = useToast;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddText = () => {
    if (inputValue.trim() !== "") {
      onAddText({ label: inputValue.trim(), value });
      setInputValue("");
    } else {
      toast({
        title: "Empty Field",
        description: "The field must be filled!",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <FormControl sx={formcontrol}>
      <TextAreaInput
        value={inputValue}
        label=""
        placeholder={text}
        onChange={handleInputChange}
      />

      <FormLabel>Value</FormLabel>
      <NumberInput
        mb={"2rem"}
        defaultValue={0}
        onChange={(_, valueAsNumber: number) => {
          //valueAsString
          if (!isNaN(valueAsNumber)) setValue(valueAsNumber);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <EventButton event={handleAddText} text="ADD" mt={2} w={"10%"} />
    </FormControl>
  );
}
