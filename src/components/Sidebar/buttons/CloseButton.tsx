// External libraries
import { Button } from "@chakra-ui/react";

// Icons
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

// Types
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
      bgColor="#263C56"
      _hover={{ bgColor: "#263C56" }}
    >
      {isOpen ? (
        <CloseIcon color="#c9d9e5" boxSize={4} />
      ) : (
        <HamburgerIcon boxSize="22px" color="#c9d9e5" />
      )}
    </Button>
  );
};

export default CloseButton;
