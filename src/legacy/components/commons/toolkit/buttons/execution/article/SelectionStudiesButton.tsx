import { Button, Text } from "@chakra-ui/react";
import { SelectionDataIcon } from "../../../icons/SelectionDataIcon";
import { useContext } from "react";
import ModalContext from "../../../../../../context/ModalContext";

export default function SelectionDataButton() {
  const context = useContext(ModalContext);
  function handleClick() {
    context?.setPanelState("Selection Data");
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
      <SelectionDataIcon />{" "}
      <Text color="black" fontSize={"sm"}>
        Selection Data
      </Text>
    </Button>
  );
}
