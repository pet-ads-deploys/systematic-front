import { Button, Flex, Heading, Input } from "@chakra-ui/react";

interface EmailAreaInterface{
    title: string,
    buttonText: string
}

export default function EmailArea({title, buttonText}: EmailAreaInterface) {
    return (
        <Flex h="400px" w="400px" bg="gray" 
        alignItems={"center"}
        direction="column" gap="50px">
            <Heading fontSize="30">{title}</Heading>
            <Flex direction="column" gap="10px">
                <Heading fontSize={"20"}>Infos:</Heading>
                <Input/>
                <Input/>
                <Input/>
            </Flex>
            <Button w="100px">{buttonText}</Button>
        </Flex>
    );
}