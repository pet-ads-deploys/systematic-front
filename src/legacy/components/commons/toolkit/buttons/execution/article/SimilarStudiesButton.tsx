import { Button, Text } from "@chakra-ui/react";
import { SimilarStudiesIcon } from "../../../icons/SimilarStudiesIcon";
import ModalContext from "../../../../../../context/ModalContext";
import { useContext } from "react";

export default function SimilarStudiesButton() {
  const context = useContext(ModalContext);
  function handleClick() {
    context?.setPanelState("Similar Studies");
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
      <SimilarStudiesIcon />{" "}
      <Text color="black" fontSize={"sm"}>
        Similar Studies
      </Text>
    </Button>
  );
}
