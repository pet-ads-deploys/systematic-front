import { Text } from "@chakra-ui/react";
import { option } from "./styles";

interface iFormOptionsProps {
  text: string;
  active?: boolean;
  onClick: () => void;
}

export default function FormOptions({
  text,
  active,
  onClick,
}: iFormOptionsProps) {
  return (
    <Text sx={option} fontWeight={active ? "bold" : ""} onClick={onClick}>
      {text}
    </Text>
  );
}
