import { Flex, Text } from "@chakra-ui/react";

import { TbArticleOff } from "react-icons/tb";

export default function NoDataMessage() {
  const container = {
    w: "100%",
    h: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    bg: "gray.50",
    borderRadius: "md",
    boxShadow: "sm",
    gap: ".5rem",
  };

  return (
    <Flex sx={container}>
      <TbArticleOff size={"4rem"} color="#263C56" />
      <Text fontSize="xl" fontWeight="bold" color="gray.600">
        No Articles Found
      </Text>
      <Text fontSize="md" color="gray.500">
        Try adjusting your filters or check back later.
      </Text>
    </Flex>
  );
}
