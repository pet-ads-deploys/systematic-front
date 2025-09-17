import { Flex, Text } from "@chakra-ui/react";

const tagContainer = {
  alignItems: "center",
  justifyContent: "center",
  w: "15rem",
  h: { base: "1.75rem", md: "2rem" },
  p: "1rem .5rem",
  gap: 2,
  whiteSpace: "nowrap",
  fontWeight: "semibold",
  fontSize: { base: "0.65rem", md: "0.8rem" },
  borderRadius: ".35rem",
  color: "black",
  boxShadow: "sm",
  transition: "all 0.3s ease",
};

interface IEditionInfosProps {
  status: string;
}

export default function EditionInfos({ status }: IEditionInfosProps) {
  return (
    <Flex sx={tagContainer} bg="gray.100" color="gray.700">
      <Text>{status}</Text>
    </Flex>
  );
}
