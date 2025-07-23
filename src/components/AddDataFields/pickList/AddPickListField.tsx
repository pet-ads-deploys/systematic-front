import { FormControl, useToast } from "@chakra-ui/react";
import TextAreaInput from "../../Inputs/InputTextArea";
import EventButton from "@components/common/buttons/EventButton";
import { useState } from "react";
import { formcontrol } from "../styles/AddTextFieldStyle";

interface IAddTextFieldProps {
  onAddText: (newKeyword: string) => void;
  text: string;
}

export default function AddPickListField({
  onAddText,
  text,
}: IAddTextFieldProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddText = () => {
    if (inputValue.trim() !== "") {
      onAddText(inputValue.trim());
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
      ></TextAreaInput>
      <EventButton event={handleAddText} text="ADD" mt={2} w={"10%"} />
    </FormControl>
  );
}
