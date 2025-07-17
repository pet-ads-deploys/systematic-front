import { Button, Text } from "@chakra-ui/react";
import { ReferencesIcon } from "../../../../../../../../public/icons/StudyModal/ReferencesIcon";
import ModalContext from "../../../../../../context/ModalContext";
import { useContext } from "react";

export default function ReferencesButton() {
  const context = useContext(ModalContext);
  function handleClick() {
    context?.setPanelState("References");
  }

  return (
    <Button
      onClick={handleClick}
      alignItems={"center"}
      gap="5"
      bg="gray"
      pl="3"
      pr="3"
      w="100%"
    >
      <ReferencesIcon />{" "}
      <Text color="black" fontSize={"sm"}>
        References
      </Text>
    </Button>
  );
}
