import { Button, Icon } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchButton() {
  return (
    <Button>
      <Icon as={SearchIcon} alignContent={"center"} borderRadius={"3px"} />
    </Button>
  );
}
