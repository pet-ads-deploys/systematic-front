import { Button, Flex } from "@chakra-ui/react";
import { buttonconteiner } from "../ButtonsForSelection/styles";

interface SelectedArticlesButtonProos {
  handleSendDuplicates: () => void;
  handleClearSelectedArticles: () => void;
}

export default function SelectedArticlesButton({
  handleSendDuplicates,
  handleClearSelectedArticles,
}: SelectedArticlesButtonProos) {
  return (
    <Flex
      w="100%"
      h="3rem"
      justifyContent="start"
      alignItems="center"
      gap="1rem"
    >
      <Flex sx={buttonconteiner}>
        <Button
          _hover={{
            bg: "white",
            color: "#8B0000",
            border: "2px solid #8B0000",
          }}
          color="white"
          bg="#8B0000"
          w="10rem"
          onClick={handleSendDuplicates}
        >
          mark as duplicate
        </Button>
      </Flex>
      <Flex sx={buttonconteiner}>
        <Button
          borderRadius="6px"
          bg="#eab308"
          color="white"
          border="2px solid #f6bb42"
          _hover={{ bg: "white", color: "#eab308" }}
          transition="0.2s ease-in-out"
          boxShadow="md"
          p="1rem"
          onClick={handleClearSelectedArticles}
        >
          reset
        </Button>
      </Flex>
    </Flex>
  );
}
