import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Icon } from "@chakra-ui/react";

interface deleteButtonProps {
  handleDelete: (index: number) => void;
  index: number;
}

export default function DeleteButton({
  handleDelete,
  index,
}: deleteButtonProps) {
  return (
    <Button variant="ghost" onClick={() => handleDelete(index)}>
      <Icon as={DeleteIcon} w={"15px"} h={"15px"} />
    </Button>
  );
}
