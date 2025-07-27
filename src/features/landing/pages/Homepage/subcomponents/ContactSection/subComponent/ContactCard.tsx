import { Flex, Heading, Icon, Text } from "@chakra-ui/react";

interface ContactInterface {
  icon: string;
  title: string;
  text: string;
}

export default function ContactCard({ title, text }: ContactInterface) {
  return (
    <Flex w="200px" h="200px" bg="gray" alignItems="center" direction={"column"} p="20px">
      <Icon h="40px" w="40px" />
      <Heading fontSize={"20"}>{title}</Heading>
      <Text>{text}</Text>
    </Flex>
  );
}
