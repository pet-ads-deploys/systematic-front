import { Button, Flex, Heading } from "@chakra-ui/react";
import collaborators from "../../../../mocks/collaborators";
import Carousel from "../../../../components/carousel/Carousel";
import CollaboratorCard from "../../../CollaboratorsPage/subcomponents/collaboratorCards";
import shuffleElements from "../../../CollaboratorsPage/subcomponents/shuffleElements";
import { Link } from "react-router-dom";

export default function CollaboratorsCarousel() {
  const collabInfosShuffled = shuffleElements(collaborators);
  [];

  return (
    <Flex
      id="colaboradores"
      minHeight={"100vh"}
      direction={"column"}
      justify={"center"}
      alignItems={"center"}
    >
      <Flex h="100%" alignItems={"center"} direction={"column"}>
        <Heading mb={"1.5em"}>Colaboradores</Heading>

        <Flex wrap={"wrap"} h="100%" align="center" justify="center">
          <Carousel>
            {collabInfosShuffled.map((person) => {
              return <CollaboratorCard collaborator={person} />;
            })}
          </Carousel>
        </Flex>

        <Button borderRadius={"3px"} bgColor={"gray"} color={"white"}>
          <Link to={"/collaborators"} target="_blank">
            Veja todos os colaboradores
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
