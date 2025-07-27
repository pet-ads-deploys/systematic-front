import { Icon } from "@chakra-ui/icons";
import { FaRegCircle } from "react-icons/fa6";
import { editionicon } from "../styles";

interface IEditedProps {
  isEdited: boolean;
}

export default function EditionIcon({ isEdited }: IEditedProps) {
  return (
    <Icon
      as={FaRegCircle}
      sx={editionicon}
      color={!isEdited ? "#235789" : "#FB8B24"}
      bgColor={!isEdited ? "#235789" : "#FB8B24"}
    />
  );
}
