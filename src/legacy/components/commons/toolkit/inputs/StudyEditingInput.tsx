import { Input } from "@chakra-ui/react";

interface StudyEditingInputProps {
    type: string;
    value: string;
    setValue: (text: string) => void;
}

export default function StudyEditingInput({ type, value, setValue }: StudyEditingInputProps) {

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
      }

    return (
        <>
            <Input type={type} value={value} onChange={handleInputChange}/>
        </>
    )
}