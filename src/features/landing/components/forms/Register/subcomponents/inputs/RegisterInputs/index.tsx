import { Input } from "@chakra-ui/react";

interface iInputProps {
  id: string;
  placeholder: string;
  handlechange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterInputs({ id, placeholder, handlechange }: iInputProps) {
  return <Input 
  bgColor={"#C9D9E5"} 
  _placeholder={{ opacity: 1, color: 'gray.500' }}
  focusBorderColor="#526D82"
  id={id} placeholder={placeholder} type={"text"} onChange={handlechange} />;
}
