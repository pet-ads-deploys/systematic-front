import { Button, Text } from "@chakra-ui/react";
import { StudyDataIcon } from "../../../../../../../../public/icons/StudyModal/StudyDataIcon";
import { useContext, useState } from "react";
import ModalContext from "../../../../../../context/ModalContext";

export default function StudyDataButton() {
  const [isOpen, setIsOpen] = useState(true);
  const context = useContext(ModalContext);

  function handleClick() {
    setIsOpen(!isOpen);
    context?.setStudyDataButtonState(!context.StudyDataButtonState);
  }
  return (
    <Button
      onClick={handleClick}
      alignItems={"center"}
      gap="5"
      bg="gray"
      pl="3"
      pr="3"
      w={isOpen ? "3000px" : "20%"}
    >
      <StudyDataIcon />
      {isOpen && (
        <Text color="black" fontSize={"sm"}>
          Study Data
        </Text>
      )}
    </Button>
  );
}
