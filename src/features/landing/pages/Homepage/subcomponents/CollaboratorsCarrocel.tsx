import { Flex, Image } from "@chakra-ui/react";
import { collaboratorsContent } from "../../../../../mocks/collaborators";

export default function CollaboratorsCarrocel() {
  return (
    <Flex>
      {collaboratorsContent.map((person) => (
        <Flex h="100px" w="100px" gap="20px">
          <Image src={person.photo} alt={"foto de " + person.name} />
        </Flex>
      ))}
    </Flex>
  );
}
