import { Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TbArticleOff } from "react-icons/tb";
import { useParams } from "react-router-dom";


export default function DataBaseRequired() {
  const container = {
    w: "100vw",
    h: "90vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    bg: "gray.50",
    borderRadius: "1rem",
    boxShadow: "sm",
    gap: ".5rem",
  };

  const { id = "" } = useParams();

  return (
    <Flex sx={container}>
      <TbArticleOff size={"4rem"} color="#263C56" />
      <Text fontSize="xl" fontWeight="bold" color="gray.600">
        No databases registered
      </Text>
      <Text fontSize="md" color="gray.500">
        Please register at least one database to proceed with this stage of the
        protocol.
      </Text>
      <Button
        as={Link}
        to={`/newReview/protocolpartTwo/${id}`}
        colorScheme="blue"
        mt={4}
      >
        Go to database registration
      </Button>
    </Flex>
  );
}
