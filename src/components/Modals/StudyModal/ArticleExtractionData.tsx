import { Flex, Text } from "@chakra-ui/react";
import { ArticlePreviewProps } from "./StudyData";

export default function ArticlesExtrationData({ studyData }: ArticlePreviewProps) {
  return (
    <Flex
    flexDirection="column"
    padding="2rem"
    fontFamily="Times New Roman, serif"
  >
    <Flex
      display="flex"
      flexDirection="column"
      w="100%"
      gap="1rem"
      maxWidth="40rem"
      mx="auto"
    >
      <Flex justify="left" borderBottom="1px solid #808080" pb="5px">
        <Text>{studyData.studyType}</Text>
      </Flex>
      <Flex justify="left" borderBottom="1px solid #808080" pb="5px">
        <Text>{studyData.venue}, {studyData.year}</Text>
      </Flex>
      <Flex flexDirection="column" align="center" textAlign="center">
        <Text fontSize="1.6rem" fontWeight="bold" fontFamily="Bodoni">
          {studyData.title}
        </Text>
      </Flex>
      <Flex flexDirection="column" align="center" textAlign="center">
        <Text fontSize="1.2rem" fontWeight="bold">{studyData.authors}</Text>
      </Flex>
    </Flex>
  </Flex>
  );
}
