import { Flex, Text } from "@chakra-ui/react";

import { ArticlePreviewProps } from "../StudyData";

import ArticleHeader from "../../../table/header/ArticleHeader";

export default function ArticlePreview({ studyData }: ArticlePreviewProps) {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      padding="1rem"
      paddingTop="0rem"
      fontFamily="Times New Roman, serif"
      h="fit-content"
    >
      <Flex
        display="flex"
        lineHeight="1"
        gap="2rem"
        flexDirection="column"
        w="100%"
        p=".25rem"
        h="100%"
      >
        <ArticleHeader studyData={studyData} />
        <Flex>
          <Text marginBottom={"7px"} w="30%" align={"left"}>
            <Text fontSize={"14px"} fontWeight={"bold"}>
              Type: {studyData.studyType}
            </Text>
          </Text>
          <Text
            fontSize={"16px"}
            align={"right"}
            as="i"
            fontWeight={"Bold"}
            w="70%"
          >
            {studyData.venue}, {studyData.year}
          </Text>
        </Flex>

        <Text
          fontSize={["xl", "2xl", "3xl", "4xl"]}
          fontWeight={"bold"}
          fontFamily={"Boboni"}
          lineHeight={"2.3rem"}
          align={"center"}
          whiteSpace={"normal"}
          wordBreak={"break-word"}
          maxWidth={"100%"}
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
