import { Flex, Image } from "@chakra-ui/react";
import useFecthCollaboratorsInfo from "../../../hooks/fetch/useFetchCollaboratorsInfo";

export default function CollaboratorsCarrocel() {
  const { collabInfos } = useFecthCollaboratorsInfo(
    "./../../../../public/mocks/collaboratorsInfo.json"
  );

  return (
    <Flex>
      {collabInfos.map((person) => (
        <Flex h="100px" w="100px" gap="20px">
          <Image src={person.photo} alt={"foto de " + person.name} />
        </Flex>
      ))}
    </Flex>
  );
}
