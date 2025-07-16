import { Flex, Image, Heading, Text, Button } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Flex
      bg="black"
      alignItems="center"
      gap="50px"
      pl="200px"
      pr="200px"
      pb={"200px"}
      minHeight="100vh"
      justifyContent={"center"}
    >
      <Flex
        gap="5px"
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex direction="column" justifyContent={"flex-start"}>
          <Heading color="white" alignSelf={"center"} fontSize={"60"} pb="50px">
            Pesquise mais, de qualquer lugar!
          </Heading>

          <Text color="white" fontSize={"16"}>
            {`Potencialize suas pesquisas! Experimente nossa 
                  ferramenta gratuita para revisões sistemáticas - fácil de usar e ideal 
                  para pesquisadores e estudantes.`}
          </Text>

          <Button
            mt="4em"
            borderRadius={"3px"}
            w="30%"
            colorScheme="whiteAlpha"
          >
            Cadastre-se já
          </Button>
        </Flex>

        <Image
          src="src/assets/images/landing/homepagePhotos/HeroSectionPic.png"
          alt={`Foto de diferentes dispositivos eletronicos conectados a ferramenta StArt 
              - computador deskot, smart phone e tablet.`}
          marginTop={"4em"}
        />
      </Flex>
    </Flex>
  );
}
