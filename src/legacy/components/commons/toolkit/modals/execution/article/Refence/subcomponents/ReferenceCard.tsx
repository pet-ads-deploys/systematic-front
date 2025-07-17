import React from "react";

import { HStack, Container, Text, Input, Flex, Button } from "@chakra-ui/react";
import TextAreaInput from "../../../../../../../../../components/Inputs/InputTextArea";

interface Props {
  authors: string;
  year: string;
  fullReference: string;
}
const ReferenceCard: React.FC<Props> = (props) => {
  return (
    <Container
      background="gray.300"
      border="1px solid black"
      my=".5rem"
      w="520px"
    >
      <Flex>
        <HStack spacing=".2em" mt=".5em">
          <Text fontWeight="bold" my=".5rem" mr=".3em">
            Author:
          </Text>
          <Input w="19.5em" variant="filled" value={props.authors}></Input>
        </HStack>
        <Flex mt=".5em">
          <Text fontWeight="bold" my=".5rem" ml="1.1em" mr=".3em">
            Year:
          </Text>
          <Input
            w="3.5em"
            p=".5em"
            variant="filled"
            type="text"
            value={props.year}
          ></Input>
        </Flex>
      </Flex>
      <Text mt=".7rem" fontWeight="bold">
        Full Refference:
      </Text>
      <Flex justifyContent="space-between" w="31em">
        <TextAreaInput
          w="24em"
          variant="filled"
          // style={{ maxHeight: "200px", overflowY: "auto" }}
          value={props.fullReference}
          label={""}
          placeholder={""}
        ></TextAreaInput>
        <Button my="2em" colorScheme="blackAlpha" fontSize="14px">
          New Revision
        </Button>
      </Flex>
    </Container>
  );
};

export default ReferenceCard;
