import { Flex, Text } from "@chakra-ui/react";
import { ArticlePreviewProps } from "./StudyData";

export default function ArticlePreview({ studyData }: ArticlePreviewProps) {
  return (
    <Flex
      flexDirection="column"
      padding="2rem"
      fontFamily="Times New Roman, serif"
      h="fit-content"
    >
      <Flex
        display="flex"
        lineHeight="1"
        gap="5"
        flexDirection="column"
        w="100%"
        p="1rem"
        h="100%"
      >
        <Flex>
          <Text marginBottom={"7px"} w="30%" align={"left"}>
            <Text fontSize={"14px"} fontWeight={"bold"}>
              Type: {studyData.studyType}
            </Text>
          </Text>
          <Text
            fontSize={"20px"}
            align={"right"}
            as="i"
            fontWeight={"Bold"}
            w="70%"
          >
            {studyData.venue}, {studyData.year}
          </Text>
        </Flex>

        <Text
          fontSize={"35"}
          fontWeight={"bold"}
          fontFamily={"Boboni"}
          lineHeight="2.3rem"
          align={"center"}
        >
          {studyData.title}
        </Text>

        <Text p="1" lineHeight={"1.5rem"} fontWeight={"Bold"} align={"center"}>
          {studyData.authors}
        </Text>

        <Flex
          fontFamily={"Literata"}
          flexDirection={"column"}
          align={"right"}
          gap="15px"
          pb="60px"
        >
          <Text fontSize={"xxl"} lineHeight={"1.5rem"} textAlign="justify">
            <b>Abstract:</b> {studyData.abstract}
          </Text>
          <Text fontSize={"xxl"} lineHeight={"1.5rem"} textAlign="justify">
            <b>Keywords:</b> {studyData.keywords}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
