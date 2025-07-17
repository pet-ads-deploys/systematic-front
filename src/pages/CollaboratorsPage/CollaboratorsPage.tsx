import { Flex, Heading } from "@chakra-ui/react";
import Header from "../Homepage/subcomponents/Header/Header";
import CollaboratorCard from "./subcomponents/collaboratorCards";
import { collaboratorsContent } from "../../mocks/collaborators";
import Footer from "../Homepage/subcomponents/Footer/Footer";

export default function CollaboratorsPage() {
  return (
    <Flex
      direction={"column"}
      h="100vh"
      justify={"space-between"}
      bgColor={"#C9D9E5"}
      overflow={"auto"}
    >
      <Header show={false} />
      <Flex mt="150px" mb="50px" alignItems={"center"} direction={"column"}>
        <Heading>Colaboradores</Heading>
        <Flex wrap={"wrap"} h="100%" align="center" justify="center" gap={10}>
          {collaboratorsContent.map((person) => {
            return <CollaboratorCard collaborator={person} />;
          })}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}
