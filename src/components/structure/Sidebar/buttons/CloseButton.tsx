import { Button } from "@chakra-ui/react";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

interface Props {
  handleToggle: () => void;
  className?: string;
  isOpen: boolean;
}

const CloseButton = ({ handleToggle, className = "", isOpen }: Props) => {
  return (
    <Button
      className={className}
      onClick={handleToggle}
      w="1rem"
      borderRadius={"50%"}
      bgColor={isOpen ? "white" : "#263C56"}
      _hover={{ bgColor: isOpen ? "white" : "#263C56" }}
    >
      {isOpen ? (
        <CloseIcon color="black" boxSize={4} />
      ) : (
        <HamburgerIcon boxSize="22px" color="white" bgColor="#263c56" />
      )}
    </Button>
  );
};

export default CloseButton;
